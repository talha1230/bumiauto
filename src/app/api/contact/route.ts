import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email content
    const emailHtml = `
      <h2>New Contact Form Submission from BumiAuto Website</h2>
      
      <h3>Contact Information:</h3>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        ${phone ? `<li><strong>Phone:</strong> ${phone}</li>` : ""}
      </ul>

      ${subject ? `<h3>Subject:</h3><p>${subject}</p>` : ""}

      <h3>Message:</h3>
      <p>${message}</p>

      <hr>
      <p><small>Submitted on: ${new Date().toLocaleString("en-MY", { timeZone: "Asia/Kuala_Lumpur" })}</small></p>
    `;

    // Send email using Resend
    const data = await resend.emails.send({
      from: "BumiAuto Contact <noreply@bumiauto.com.my>",
      to: [process.env.CONTACT_FORM_RECIPIENT || "info@bumiauto.com.my"],
      replyTo: email,
      subject: subject ? `Contact Form: ${subject}` : `Contact Form Submission from ${name}`,
      html: emailHtml,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Message sent successfully"
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
