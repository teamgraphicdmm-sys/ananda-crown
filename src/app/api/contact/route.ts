import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    let body: any;
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      body = await req.json();
    } else if (contentType.includes("form-data") || contentType.includes("x-www-form-urlencoded")) {
      const formData = await req.formData();
      body = Object.fromEntries(formData.entries());
    } else {
      body = await req.json();
    }

    const {
      firstName,
      lastName,
      name,
      email,
      phone,
      interest,
      message,
      request
    } = body;

    const fullName = name || `${firstName || ""} ${lastName || ""}`.trim() || "Visitor";
    const userEmail = email || "No email provided";
    const userPhone = phone || "Not provided";
    const interestType = interest || "REGISTER INTEREST";
    const inquiryMessage = message || request || "No message content";

    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "465", 10);
    const secure = process.env.SMTP_SECURE === "true" || port === 465;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const toEmail = process.env.CONTACT_TO_EMAIL || user;

    if (!user || !pass) {
      console.warn("SMTP credentials not configured. Please set SMTP_USER and SMTP_PASS in .env.local");
      return NextResponse.json(
        {
          success: false,
          message: "SMTP is not configured on the server. Please set SMTP_USER and SMTP_PASS in your environment."
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass }
    });

    const mailOptions = {
      from: `"Ananda Crown Website" <${user}>`,
      replyTo: userEmail !== "No email provided" ? userEmail : undefined,
      to: toEmail,
      subject: `New Inquiry: ${interestType} from ${fullName}`,
      text: `
New Inquiry Received from Ananda Crown Website:

Interest: ${interestType}
Name: ${fullName}
Email: ${userEmail}
Phone: ${userPhone}

Request / Message:
${inquiryMessage}
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #a27b58; border-bottom: 2px solid #a27b58; padding-bottom: 10px;">New Inquiry - Ananda Crown</h2>
          <p><strong>Interest:</strong> ${interestType}</p>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> <a href="mailto:${userEmail}">${userEmail}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${userPhone}">${userPhone}</a></p>
          <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-left: 4px solid #a27b58;">
            <p style="margin: 0; font-weight: bold;">Request / Message:</p>
            <p style="margin: 8px 0 0 0; white-space: pre-wrap;">${inquiryMessage}</p>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #888;">Delivered directly from Ananda Crown server.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Your message has been sent directly to our team."
    });
  } catch (error: any) {
    console.error("Nodemailer send error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to send email."
      },
      { status: 500 }
    );
  }
}
