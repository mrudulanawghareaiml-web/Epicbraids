import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  const { amount } = await req.json(); // Amount from frontend
  
  try {
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Razorpay expects amount in paise (Rupees * 100)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });
    return NextResponse.json({ orderId: order.id });
  } catch (error) {
    return NextResponse.json({ error: "Error creating order" }, { status: 500 });
  }
}
