"use client";

import { useCart, CartItem } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  const [isClient, setIsClient] = useState(false);

  // Fix hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div className="container mx-auto p-8 text-[10px] uppercase tracking-widest text-center">Loading Bag...</div>;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl min-h-screen bg-white">
      <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="py-20 text-center border border-dashed rounded-2xl">
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-6">Your cart is currently empty.</p>
          <Link href="/products" className="bg-black text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest">
            Back to Products
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
          
          <div className="md:col-span-2 space-y-8">
            {cartItems.map((item: CartItem) => {
             const getImageSrc = () => {
  if (!item.image_url) return "/placeholder.jpg";

  const imageValue = Array.isArray(item.image_url)
    ? item.image_url[0]
    : item.image_url;

  if (typeof imageValue === "string" && imageValue.startsWith("http")) {
    return imageValue;
  }

  const projectId = process.env.NEXT_PUBLIC_SUPABASE_URL
    ?.replace("https://", "")
    .replace(".supabase.co", "");

  return `https://${projectId}.supabase.co/storage/v1/object/public/products/${imageValue}`;
};

const finalImage = getImageSrc();
const hasValidImage = typeof finalImage === "string" && finalImage.trim() !== "";

              return (
                <div
  key={item.id}
  className="flex items-start gap-6 p-6 border border-gray-200 rounded-2xl shadow-sm bg-white"
>
                  <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                    {hasValidImage ? (
                      <Image 
                        src={finalImage} 
                        alt={item.name || "Bracelet"} 
                        fill
                        className="object-cover"
                        unoptimized // Bypasses potential server-side optimization issues with external URLs
                      />
                    ) : (
                      <div className="text-[8px] font-bold text-gray-300 uppercase text-center px-2">
                        No Image <br/> Available
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-black uppercase tracking-tight text-lg leading-tight mb-1">
                          {item.name}
                        </h3>
                        <p className="text-gray-500 text-sm font-medium">
                          ₹{item.price.toLocaleString('en-IN')} x {item.quantity}
                        </p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ORDER SUMMARY */}
          <div className="md:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-xl font-black uppercase tracking-tighter mb-8">Order Summary</h2>
              <div className="space-y-4 mb-10">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="font-bold">₹{subtotal.toLocaleString('en-IN')}.00</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">Shipping</span>
                  <span className="text-green-600 text-[10px] font-bold uppercase tracking-widest text-right">
                    Calculated at <br/> checkout
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-6 mt-6 flex justify-between items-center">
                  <span className="text-xl font-black uppercase tracking-tighter">Total</span>
                  <span className="text-xl font-black tracking-tighter">₹{subtotal.toLocaleString('en-IN')}.00</span>
                </div>
              </div>
              <Link href="/checkout">
                <button className="w-full bg-black text-white py-5 text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-gray-800 transition-all shadow-xl rounded-sm">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
