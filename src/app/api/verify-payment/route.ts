import { NextResponse } from "next/server";
import crypto from "crypto";
import twilio from "twilio";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET!;

    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ success: false });
    }

    // Save Order in Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    await supabase.from("orders").insert([
      {
        customer_name: orderData.name,
        phone: orderData.phone,
        address: orderData.address,
        total: orderData.total,
        items: orderData.items,
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
      },
    ]);

    // Twilio WhatsApp Send
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!
    );

    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER!, // whatsapp:+14155238886
      to: "whatsapp:+91XXXXXXXXXX", // replace with your number
      body: `New Order Received

Customer: ${orderData.name}
Phone: ${orderData.phone}
Total: ₹${orderData.total}
Order ID: ${razorpay_order_id}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("VERIFY ERROR:", error);
    return NextResponse.json({ success: false });
  }
}