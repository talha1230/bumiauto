import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    const { fullName, phone, email, loanType, loanAmount, monthlyIncome, message } = body;

    // Validation
    if (!fullName || !phone || !email || !loanType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save to Supabase
    try {
      const supabase = await createServerSupabaseClient();
      const { error: dbError } = await supabase
        .from("loan_inquiries")
        .insert({
          full_name: fullName,
          phone,
          email,
          loan_type: loanType,
          loan_amount: loanAmount ? parseFloat(loanAmount) : null,
          monthly_income: monthlyIncome ? parseFloat(monthlyIncome) : null,
          message: message || null,
          status: "pending",
        });

      if (dbError) {
        console.error("Error saving loan inquiry to Supabase:", dbError);
        // Continue with email even if DB save fails
      }
    } catch (dbError) {
      console.error("Error connecting to Supabase:", dbError);
      // Continue with email even if DB save fails
    }

    // Format loan type for display
    const loanTypeMap: Record<string, string> = {
      motorcycle: "Motorcycle Loan",
      "consumer-durable": "Consumer Durable Financing",
      other: "Other",
    };
    const loanTypeDisplay = loanTypeMap[loanType] || loanType;

    // Email content
    const emailHtml = `
      <h2>New Loan Inquiry from BumiAuto Website</h2>
      
      <h3>Contact Information:</h3>
      <ul>
        <li><strong>Name:</strong> ${fullName}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Email:</strong> ${email}</li>
      </ul>

      <h3>Loan Details:</h3>
      <ul>
        <li><strong>Loan Type:</strong> ${loanTypeDisplay}</li>
        ${loanAmount ? `<li><strong>Requested Amount:</strong> RM ${loanAmount}</li>` : ""}
        ${monthlyIncome ? `<li><strong>Monthly Income:</strong> RM ${monthlyIncome}</li>` : ""}
      </ul>

      ${message ? `
        <h3>Additional Information:</h3>
        <p>${message}</p>
      ` : ""}

      <hr>
      <p><small>Submitted on: ${new Date().toLocaleString("en-MY", { timeZone: "Asia/Kuala_Lumpur" })}</small></p>
    `;

    // Send email using Resend
    const data = await resend.emails.send({
      from: "BumiAuto Loans <noreply@bumiauto.com.my>",
      to: [process.env.LOAN_INQUIRY_RECIPIENT || "loans@bumiauto.com.my"],
      replyTo: email,
      subject: `New Loan Inquiry: ${loanTypeDisplay} - ${fullName}`,
      html: emailHtml,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Loan inquiry submitted successfully"
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error processing loan inquiry:", error);
    return NextResponse.json(
      { error: "Failed to process loan inquiry. Please try again later." },
      { status: 500 }
    );
  }
}
