import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

// Validate environment variables
if (!process.env.SENDGRID_API_KEY) {
  console.error("SENDGRID_API_KEY is not defined in environment variables");
  throw new Error("SENDGRID_API_KEY is not defined");
}
if (!process.env.ADMIN_EMAIL) {
  console.error("ADMIN_EMAIL is not defined in environment variables");
  throw new Error("ADMIN_EMAIL is not defined");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { userEmail, username, feedback } = await request.json();

    if (!feedback) {
      return NextResponse.json(
        { error: "Feedback is required" },
        { status: 400 }
      );
    }
    if (!userEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      return NextResponse.json(
        { error: "Valid email address is required" },
        { status: 400 }
      );
    }

    const msg = {
      to: process.env.ADMIN_EMAIL, // haider170.1@icloud.com
      from: "haider170.1@gmail.com", // Verified sender email
      reply_to: userEmail, // User's email for replies
      subject: "New Feedback Submission",
      text: `
        Feedback from: ${username || "Anonymous"} (${userEmail})
        Message: ${feedback}
      `,
      html: `
        <h2>New Feedback Submission</h2>
        <p><strong>From:</strong> ${username || "Anonymous"} (${userEmail})</p>
        <p><strong>Message:</strong> ${feedback}</p>
      `,
    };

    console.log("Sending email with config:", {
      to: msg.to,
      from: msg.from,
      reply_to: msg.reply_to,
      subject: msg.subject,
    });

    const [sendResult] = await sgMail.send(msg);
    console.log("SendGrid response:", {
      statusCode: sendResult.statusCode,
      headers: sendResult.headers,
    });
    return NextResponse.json({ message: "Feedback sent successfully" });
  } catch (error: any) {
    const errorDetails = {
      message: error.message || "Unknown error",
      code: error.code || "Unknown",
      response: error.response ? JSON.stringify(error.response.body, null, 2) : null,
      stack: error.stack,
    };
    console.error("Error sending feedback:", errorDetails);
    return NextResponse.json(
      { error: `Failed to send feedback: ${errorDetails.message}` },
      { status: 500 }
    );
  }
}