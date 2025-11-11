import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";
// ----------------- CHANGE THIS IMPORT -----------------
// Use render from 'react-email' or '@react-email/components'
// not '@react-email/render'
import { render } from "@react-email/components"; 
import WeeklyUpdate from "../../../emails/WeeklyUpdate";

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize a Supabase admin client
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function POST(request) {
  try {
    const {
      subject,
      heading,
      bodyText,
      buttonText,
      buttonUrl,
      secretKey,
    } = await request.json();

    // --- 1. Security Check ---
    if (secretKey !== process.env.BROADCAST_SECRET) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    // --- 2. Get All Subscribers ---
    const { data: subscribers, error: dbError } = await supabaseAdmin
      .from("subscribers")
      .select("email");

    if (dbError) {
      console.error("Supabase error:", dbError.message);
      return NextResponse.json(
        { error: "Failed to fetch subscribers." },
        { status: 500 }
      );
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ error: "No subscribers found." }, { status: 404 });
    }

    // Format for Resend (just the email strings)
    const emailList = subscribers.map((sub) => sub.email);

    // --- 3. Render the Email Template ---
    // ----------------- ADD AWAIT HERE -----------------
    const htmlBody = await render(
      <WeeklyUpdate
        heading={heading}
        bodyText={bodyText}
        buttonText={buttonText}
        buttonUrl={buttonUrl}
      />
    );

    // ----------------- AND ADD AWAIT HERE -----------------
    const textBody = await render(
      <WeeklyUpdate
        heading={heading}
        bodyText={bodyText}
        buttonText={buttonText}
        buttonUrl={buttonUrl}
      />,
      { plainText: true }
    );

    // --- 4. Send the Batch Email ---
    const { data, error: resendError } = await resend.batch.send(
      emailList.map((email) => ({
        from: `SmoothLedger <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: subject,
        html: htmlBody, // This is now a string
        text: textBody, // This is now a string
        // Resend automatically adds unsubscribe headers
      }))
    );

    if (resendError) {
      console.error("Resend error:", resendError);
      // Log the full error for more detail
      console.error(JSON.stringify(resendError, null, 2)); 
      return NextResponse.json(
        { error: "Failed to send emails.", details: resendError },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: `Broadcast sent to ${emailList.length} subscribers.`,
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    // Add more detail to the catch block
    if (error.name === 'validation_error') {
       return NextResponse.json({ error: "Validation error.", details: error.message }, { status: 422 });
    }
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}