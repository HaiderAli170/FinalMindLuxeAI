import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if user is admin
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { isAdmin: true },
    });

    if (!user?.isAdmin) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const billings = await db.billing.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(billings);
  } catch (error) {
    console.error("[ADMIN_BILLING]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if user is admin
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { isAdmin: true },
    });

    if (!user?.isAdmin) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const { billingId, status } = await req.json();

    if (!billingId || !status) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Update billing status
    const billing = await db.billing.update({
      where: { id: billingId },
      data: { status },
      include: {
        user: true,
      },
    });

    // If approved, update user's premium status
    if (status === "approved") {
      await db.user.update({
        where: { id: billing.userId },
        data: {
          isPremium: true,
        },
      });
    }

    // Send email notification
    // await fetch("/api/email/notification", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     userId: billing.userId,
    //     type: `billing_${status}`,
    //     data: {
    //       packageType: billing.packageType,
    //       amount: billing.amount,
    //     },
    //   }),
    // });

    return NextResponse.json(billing);
  } catch (error) {
    console.error("[ADMIN_BILLING]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 