import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import twilio from "twilio";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: true });
    }

    console.log("Contact received:", name, email);

    // Save to Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    await supabase.from("contacts").insert([
      { name, email, message },
    ]);

    console.log("Saved to DB");

    // Twilio
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    );

    const msg = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER!, // whatsapp:+14155238886
      to: "whatsapp:+919175944598", // replace with your number
      body: `New Contact Message

Name: ${name}
Email: ${email}
Message: ${message}`,
    });

    console.log("WhatsApp sent:", msg.sid);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("CONTACT ERROR:", error.message);
    return NextResponse.json({ success: false });
  }
}