import { currentUser } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await currentUser();
    
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id
      },
      select: {
        isAdmin: true
      }
    });

    if (!dbUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    return NextResponse.json({ isAdmin: dbUser.isAdmin });
  } catch (error) {
    console.error('Error checking admin status:', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 