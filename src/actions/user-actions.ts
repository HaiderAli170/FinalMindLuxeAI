'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { currentUser, auth } from "@clerk/nextjs/server";

// Add a basic console log to verify file is loaded
console.log('=== user-actions.ts file loaded ===');

// Types for user data
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  age?: number;
  gender?: string;
  bloodGroup?: string;
  medicalIssues?: string;
}

// Get all non-admin users
export async function getUsers() {
  'use server';
  
  try {
    console.log('=== getUsers function started ===');
    
    const user = await currentUser();
    if (!user) {
      throw new Error("User not found");
    }

    const users = await prisma.user.findMany({
      where: {
        isAdmin: false
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        stripeCustomerId: true,
        stripeInvoiceId: true,
        age: true,
        gender: true,
        bloodGroup: true,
        medicalIssues: true,
        height: true,
        weight: true,
        lastLogin:true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log('Users found:', users.length);
    
    return users.map(user => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      joinDate: user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : '',
      lastActive: user.updatedAt ? new Date(user.updatedAt).toISOString().split('T')[0] : '',
      isPremium: !!user.stripeCustomerId,
      // mentalHealthScore: 85,
      age: user.age || null,
      gender: user.gender || null,
      bloodGroup: user.bloodGroup || null,
      medicalIssues: user.medicalIssues || null,
      height: user.height || null,
      weight: user.weight || null,
      lastLogin: user.lastLogin || null,
    }));
  } catch (error) {
    console.error('Error in getUsers:', error);
    throw new Error('Failed to fetch users');
  }
}

console.log(getUsers)
// Create a new user
export async function createUser(userData: {
  name: string;
  email: string;
  mentalHealthScore?: number;
  isPremium?: boolean;
  notes?: string;
}) {
  try {
    console.log('Creating new user with data:', userData);
    
    const user = await currentUser();
    if (!user) {
      throw new Error("User not found");
    }

    // Split name into first and last name
    const [firstName, ...lastNameParts] = userData.name.split(' ');
    const lastName = lastNameParts.join(' ');

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: userData.email,
        isAdmin: false,
        clerkId: user.id,
        stripeCustomerId: userData.isPremium ? 'premium-user' : null,
      }
    });

    console.log('New user created:', newUser);
    revalidatePath('/dashboard/users');
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user');
  }
}

// Update a non-admin user
export async function updateUsers(id: string, userData: {
  name?: string;
  email?: string;
  isPremium?: boolean;
  age?: number | string | null;
  gender?: string | null;
  bloodGroup?: string | null;
  medicalIssues?: string | null;
  height?: number | string | null;
  weight?: number | string | null;
}) {
  try {
    const { userId } = auth();
    if (!userId) {
      throw new Error('Unauthorized');
    }

    const existingUser = await prisma.user.findUnique({
      where: { id },
      select: { email: true }
    });

    if (!existingUser) {
      throw new Error('User not found');
    }

    // If email is being changed, verify it through Clerk first
    if (userData.email && userData.email !== existingUser.email) {
      console.log('Email change requested. Verification needed.');
      throw new Error('Email changes require verification. Please use the profile settings to change your email.');
    }

    // Prepare update data
    const updateData: any = {};
    
    if (userData.name) {
      const [firstName, ...lastNameParts] = userData.name.split(' ');
      updateData.firstName = firstName;
      updateData.lastName = lastNameParts.join(' ');
    }
    
    if (userData.email) updateData.email = userData.email;
    if (userData.isPremium !== undefined) {
      updateData.isPremium = userData.isPremium;
      updateData.stripeCustomerId = userData.isPremium ? 'premium-user' : null;
    }
    if (userData.age !== undefined && userData.age !== null) {
      updateData.age = Number(userData.age);
    }
    if (userData.gender !== undefined) updateData.gender = userData.gender;
    if (userData.bloodGroup !== undefined) updateData.bloodGroup = userData.bloodGroup;
    if (userData.medicalIssues !== undefined) updateData.medicalIssues = userData.medicalIssues;
    if (userData.height !== undefined && userData.height !== null) {
      updateData.height = Number(userData.height);
    }
    if (userData.weight !== undefined && userData.weight !== null) {
      updateData.weight = Number(userData.weight);
    }

    console.log('Updating user with data:', updateData);

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData
    });

    console.log('User updated successfully:', updatedUser);
    revalidatePath('/dashboard/users');
    return updatedUser;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// Delete a user
export async function deleteUser(id: string) {
  try {
    console.log('=== Starting deleteUser function ===');
    console.log('User ID to delete:', id);
    
    const { userId } = auth();
    console.log('Authenticated admin userId:', userId);
    
    if (!userId) {
      console.log('No authenticated user found');
      throw new Error("Unauthorized");
    }

    // First check if the user exists and is not an admin
    console.log('Checking if user exists...');
    const existingUser = await prisma.user.findUnique({
      where: { id },
      select: { 
        isAdmin: true,
        email: true,
        firstName: true,
        lastName: true
      }
    });

    console.log('Existing user data:', existingUser);

    if (!existingUser) {
      console.log('User not found in database');
      throw new Error('User not found');
    }

    if (existingUser.isAdmin) {
      console.log('Attempted to delete admin user:', existingUser.email);
      throw new Error('Cannot delete admin user');
    }

    console.log('Deleting user medications first...');
    // Delete all medications associated with the user
    await prisma.medication.deleteMany({
      where: {
        userId: id
      }
    });

    console.log('Proceeding with user deletion...');
    // Delete the user
    const deletedUser = await prisma.user.delete({
      where: { id }
    });

    console.log('User successfully deleted:', {
      id: deletedUser.id,
      name: `${deletedUser.firstName} ${deletedUser.lastName}`,
      email: deletedUser.email
    });
    
    revalidatePath('/dashboard/users');
    return { success: true };
  } catch (error) {
    console.error('Detailed error in deleteUser:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      error: error
    });
    throw new Error('Failed to delete user');
  }
}
