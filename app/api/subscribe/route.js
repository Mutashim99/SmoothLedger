import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";


// /api/broadcast
export async function POST(request) {
  try {
    const { email } = await request.json();

    // Basic email validation
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    }

    // Create a Supabase client that can write to the database
    // This uses the *secret* service key from our .env.local file
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    // Use 'upsert' instead of 'insert'
    // This will add the email if it's new,
    // or do nothing (without throwing an error) if the email already exists.
    const { error } = await supabaseAdmin
      .from("subscribers")
      .upsert({ email: email }, { onConflict: 'email' });

    if (error) {
      // Log the detailed error on the server, but send a generic one to the client
      console.error("Supabase error:", error.message);
      return NextResponse.json({ error: "Could not subscribe user." }, { status: 500 });
    }

    // Send a success response
    return NextResponse.json({ success: true, message: "User subscribed." }, { status: 200 });

  } catch (error) {
    // Catch any other server errors
    console.error("Server error:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}