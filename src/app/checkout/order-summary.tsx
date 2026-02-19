// src/app/checkout/order-summary.tsx
'use client';

import { useCart, CartItem } from '@/context/CartContext';
import Image from 'next/image';

export function OrderSummary() {
  // Fix 1: Ensure this matches the Case (cartItems vs cartitems) in your Context
  const { cartItems, totalPrice } = useCart();

  return (
    <div className="space-y-4">
      {cartItems.map((item: CartItem) => {
  // 1. Extract the raw image (handle array or string)
  const rawImage = Array.isArray(item.images) ? item.images[0] : item.images;

  // 2. Build the full Supabase URL (Bucket is 'Products' as per your dashboard)
  const finalSrc = rawImage 
    ? (rawImage.startsWith('http') 
        ? rawImage 
        : `https://cmhypugbgxhzoeqgwrwn.supabase.co{rawImage}`)
    : "https://placehold.co"; // Fallback URL

  return (
    <div key={item.id} className="flex items-start gap-4">
      <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-50 border">
        <Image
          src={finalSrc} 
          alt={item.name || "Product"}
          width={64}
          height={64}
          className="rounded-md object-cover"
          unoptimized // Keeps it simple and fast
        />
        {/* Quantity Badge */}
        <div className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
          {item.quantity}
        </div>
      </div>
      
      <div className="flex-grow">
        <p className="text-xs font-black uppercase tracking-tight leading-tight">{item.name}</p>
        <p className="text-[10px] text-gray-400 font-bold">₹{item.price} × {item.quantity}</p>
      </div>
    </div>
  );
})}
    </div>
  );
}
