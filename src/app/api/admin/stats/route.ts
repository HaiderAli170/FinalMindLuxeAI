import { auth } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId
      },
      select: {
        isAdmin: true
      }
    });

    if (!user?.isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get total users
    const totalUsers = await prisma.user.count();

    // Get active users (users who have logged in within the last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const activeUsers = await prisma.user.count({
      where: {
        lastLogin: {
          gte: thirtyDaysAgo
        }
      }
    });

    // Get premium users
    const premiumUsers = await prisma.user.count({
      where: {
        isPremium: true
      }
    });

    // Get user growth data (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const userGrowth = await prisma.user.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      },
      _count: true
    });
    const totalBlogs = await prisma.blog.count();
    // const totalmindhelath= await prisma.mentalillness.count();
    // const total=totalBlogs+totalmindhelath;
    console.log(totalBlogs,"totalblogsssssssssssssssssss")

    // Format user growth data
    const formattedUserGrowth = userGrowth.map(day => ({
      date: day.createdAt.toISOString().split('T')[0],
      count: day._count
    }));

    return NextResponse.json({
      totalUsers,
      activeUsers,
      totalBlogs,
      // total,
      premiumUsers,
      userGrowth: formattedUserGrowth
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 