"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {
  CreditCard,
  Smartphone,
  ShieldCheck,
  Lock,
  Truck,
  ArrowLeft,
} from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("card");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    phone: "",
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = subtotal >= 1000 ? 0 : 50;
  const total = subtotal + shipping;

  const handlePayment = async () => {
    if (!form.firstName || !form.address || !form.phone) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      const order = await res.json();

      if (!order.id) {
        alert("Order creation failed");
        setLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Uncappd",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (response: any) {
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              orderData: {
                name: `${form.firstName} ${form.lastName}`,
                phone: form.phone,
                address: `${form.address}, ${form.city}`,
                total,
                items: cartItems,
              },
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            clearCart();
            window.location.href = "/success";
          } else {
            alert("Payment verification failed");
          }
        },

        theme: { color: "#000000" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <div className="bg-[#f8f8f8] min-h-screen pb-20 pt-12 font-sans">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8 items-start">

            {/* LEFT COLUMN */}
            <div className="lg:col-span-2 space-y-6">

              {/* SHIPPING FORM */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-black uppercase mb-8">
                  Shipping Information
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full p-4 bg-gray-50 rounded-xl"
                    value={form.firstName}
                    onChange={(e) =>
                      setForm({ ...form, firstName: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full p-4 bg-gray-50 rounded-xl"
                    value={form.lastName}
                    onChange={(e) =>
                      setForm({ ...form, lastName: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Full Address"
                    className="md:col-span-2 w-full p-4 bg-gray-50 rounded-xl"
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    placeholder="City"
                    className="w-full p-4 bg-gray-50 rounded-xl"
                    value={form.city}
                    onChange={(e) =>
                      setForm({ ...form, city: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full p-4 bg-gray-50 rounded-xl"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:sticky lg:top-8 space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-black uppercase mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-8">
                  {cartItems.map((item) => {
                    const getImageSrc = () => {
                      if (!item.image_url) return "/placeholder.jpg";
                      if (item.image_url.startsWith("http"))
                        return item.image_url;

                      const projectId = process.env.NEXT_PUBLIC_SUPABASE_URL
                        ?.replace("https://", "")
                        .replace(".supabase.co", "");

                      return `https://${projectId}.supabase.co/storage/v1/object/public/products/${item.image_url}`;
                    };

                    return (
                      <div key={item.id} className="flex gap-4 items-center">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-50">
                          <Image
                            src={getImageSrc()}
                            alt={item.name}
                            fill
                            unoptimized
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-grow">
                          <p className="text-sm font-bold">{item.name}</p>
                          <p className="text-xs text-gray-400">
                            Qty: {item.quantity}
                          </p>
                        </div>

                        <p className="font-bold">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-2 border-t pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{shipping}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-black text-white py-5 mt-8 rounded-xl font-bold"
                >
                  {loading ? "Processing..." : "Place Order"}
                </button>

                <div className="mt-8 space-y-3 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <Lock size={12} /> SSL Encrypted Secure Checkout
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={12} /> Razorpay Verified Merchant
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck size={12} /> Free Shipping Over ₹1000
                  </div>
                </div>
              </div>

              <Link
                href="/products"
                className="flex items-center justify-center gap-2 text-xs text-gray-400 hover:text-black"
              >
                <ArrowLeft size={14} /> Continue Shopping
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
