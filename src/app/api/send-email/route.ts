import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  await resend.emails.send({
    from: "orders@yourdomain.com",
    to: body.email,
    subject: "Order Confirmation - Epicbraids",
    html: `<h1>Thank you for your order!</h1><p>Order ID: ${body.orderId}</p>`,
  });

  return Response.json({ success: true });
}
