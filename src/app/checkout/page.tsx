"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CreditCard, Smartphone, ShieldCheck, Lock, Truck, ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("card");

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 50; // Flat rate for India
  const total = subtotal + shipping;

  return (
    <div className="bg-[#f8f8f8] min-h-screen pb-20 font-sans">
      {/* HEADER BAR */}
      <div className="bg-white border-b border-gray-100 py-6 mb-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-black uppercase tracking-tighter">EpicBraids</h1>
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <span className="text-black">1. Cart</span>
            <span className="w-4 h-px bg-gray-200"></span>
            <span className="text-black border-b border-black">2. Checkout</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT COLUMN: FORMS */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* SHIPPING FORM */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg font-black uppercase tracking-tight">Shipping Information</h2>
                <button className="text-[10px] font-bold uppercase underline">Sign In</button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">First Name</label>
                  <input type="text" placeholder="John" className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-1 focus:ring-black transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Last Name</label>
                  <input type="text" placeholder="Doe" className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-1 focus:ring-black" />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Full Address</label>
                  <input type="text" placeholder="123 Main Street, Area" className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-1 focus:ring-black" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">City</label>
                  <input type="text" placeholder="New Delhi" className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-1 focus:ring-black" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Phone Number</label>
                  <input type="text" placeholder="+91 00000 00000" className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-1 focus:ring-black" />
                </div>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-black uppercase tracking-tight mb-8">Payment Method</h2>
              
              <div className="space-y-4">
                {/* UPI OPTION */}
                <label className={`flex items-center justify-between p-5 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-black bg-gray-50' : 'border-gray-100'}`}>
                  <div className="flex items-center gap-4">
                    <input type="radio" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="accent-black w-4 h-4" />
                    <div className="flex items-center gap-2">
                       <Smartphone size={18} />
                       <span className="text-[11px] font-bold uppercase tracking-widest">UPI (GPay / PhonePe / Paytm)</span>
                    </div>
                  </div>
                </label>

                {/* CARD OPTION */}
                <label className={`flex items-center justify-between p-5 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-black bg-gray-50' : 'border-gray-100'}`}>
                  <div className="flex items-center gap-4">
                    <input type="radio" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="accent-black w-4 h-4" />
                    <div className="flex items-center gap-2">
                       <CreditCard size={18} />
                       <span className="text-[11px] font-bold uppercase tracking-widest">Credit / Debit Card</span>
                    </div>
                  </div>
                </label>
              </div>

              {/* DYNAMIC FORM RENDERING */}
              <div className="mt-8 pt-8 border-t border-gray-50 animate-in fade-in duration-500">
                {paymentMethod === 'card' ? (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Card Number</label>
                      <input type="text" placeholder="1234 5678 9012 3456" className="w-full p-4 bg-gray-50 rounded-xl border-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="MM/YY" className="p-4 bg-gray-50 rounded-xl border-none" />
                      <input type="text" placeholder="CVC" className="p-4 bg-gray-50 rounded-xl border-none" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-gray-400 ml-1">Enter UPI ID</label>
                    <input type="text" placeholder="username@okaxis" className="w-full p-4 bg-gray-50 rounded-xl border-none focus:ring-1 focus:ring-black" />
                    <p className="text-[9px] text-gray-400 mt-2 uppercase tracking-widest font-medium">A payment request will be sent to your UPI App</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY (STICKY) */}
          <div className="lg:sticky lg:top-8 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-black uppercase tracking-tight mb-6">Order Summary</h2>
              
              {/* ITEM LIST */}
              <div className="space-y-4 mb-8">
                {cartItems.map((item: any) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 rounded-lg bg-gray-50 overflow-hidden flex-shrink-0">
                      <Image src={Array.isArray(item.images) ? item.images[0] : item.images} alt={item.name} fill unoptimized className="object-cover" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-[11px] font-bold uppercase tracking-tight">{item.name}</p>
                      <p className="text-[10px] text-gray-400 uppercase">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-[11px] font-bold">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-50 pt-6">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-black">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Shipping</span>
                  <span className="font-bold text-black">₹{shipping}</span>
                </div>
                <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-100">
                  <span className="text-xl font-black uppercase tracking-tighter">Total</span>
                  <span className="text-xl font-black tracking-tighter">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button className="w-full bg-black text-white py-5 mt-8 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                Place Order <ArrowLeft className="rotate-180" size={14} />
              </button>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-gray-400">
                  <Lock size={12}/> SSL Encrypted Secure Checkout
                </div>
                <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-gray-400">
                  <ShieldCheck size={12}/> Razorpay Verified Merchant
                </div>
                <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-gray-400">
                  <Truck size={12}/> Free Shipping Over ₹2000
                </div>
              </div>
            </div>

            <Link href="/products" className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors">
              <ArrowLeft size={12} /> Continue Shopping
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
