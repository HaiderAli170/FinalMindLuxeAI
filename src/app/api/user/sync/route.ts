import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userData = await request.json();
    
    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { clerkId: userId }
    });

    if (existingUser) {
      // Update existing user
      const updatedUser = await db.user.update({
        where: { clerkId: userId },
        data: {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          image: userData.profileImage,
          lastLogin: new Date(),
        }
      });
      
      return NextResponse.json({ user: updatedUser, isNewUser: false });
    } else {
      // Create new user
      const newUser = await db.user.create({
        data: {
          clerkId: userId,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          image: userData.profileImage,
          createdAt: new Date(),
          lastLogin: new Date(),
        }
      });
      
      return NextResponse.json({ user: newUser, isNewUser: true });
    }
  } catch (error) {
    console.error('Error syncing user:', error);
    return NextResponse.json(
      { error: 'Failed to sync user data' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { clerkId: userId }
    });

    if (existingUser) {
      return NextResponse.json({ user: existingUser, isNewUser: false });
    } else {
      return NextResponse.json({ user: null, isNewUser: true });
    }
  } catch (error) {
    console.error('Error checking user:', error);
    return NextResponse.json(
      { error: 'Failed to check user data' },
      { status: 500 }
    );
  }
} 