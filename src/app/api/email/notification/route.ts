import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId, type, data } = await req.json();

    if (!userId || !type) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Get user details
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { 
        email: true, 
        firstName: true,
        lastName: true 
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const fullName = `${user.firstName} ${user.lastName}`;

    // Send email based on notification type
    switch (type) {
      case "billing_submitted":
        await sendBillingSubmittedEmail(user.email, fullName, data);
        break;
      case "billing_approved":
        await sendBillingApprovedEmail(user.email, fullName, data);
        break;
      case "billing_rejected":
        await sendBillingRejectedEmail(user.email, fullName, data);
        break;
      default:
        return new NextResponse("Invalid notification type", { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[EMAIL_NOTIFICATION]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

async function sendBillingSubmittedEmail(email: string, name: string, data: any) {
  // Implement email sending logic using your email service
  // This is a placeholder - replace with actual email sending code
  console.log("Sending billing submitted email to:", email);
}

async function sendBillingApprovedEmail(email: string, name: string, data: any) {
  // Implement email sending logic using your email service
  // This is a placeholder - replace with actual email sending code
  console.log("Sending billing approved email to:", email);
}

async function sendBillingRejectedEmail(email: string, name: string, data: any) {
  // Implement email sending logic using your email service
  // This is a placeholder - replace with actual email sending code
  console.log("Sending billing rejected email to:", email);
} 