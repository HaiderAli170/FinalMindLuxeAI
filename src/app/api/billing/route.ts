import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const packageType = formData.get("packageType") as string;
    const receiptFile = formData.get("receipt") as File;

    if (!packageType || !receiptFile) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Upload receipt to your storage service (e.g., AWS S3, Cloudinary)
    // For now, we'll just store the file name
    const receiptUrl = receiptFile.name;

    // Create billing record
    const billing = await db.billing.create({
      data: {
        userId,
        packageType,
        amount: getPackageAmount(packageType),
        receiptUrl,
        status: "pending",
      },
    });

    return NextResponse.json(billing);
  } catch (error) {
    console.error("[BILLING]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const billings = await db.billing.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(billings);
  } catch (error) {
    console.error("[BILLING]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

function getPackageAmount(packageType: string): number {
  switch (packageType) {
    case "basic":
      return 2999;
    case "premium":
      return 5999;
    case "enterprise":
      return 14999;
    default:
      return 0;
  }
} 