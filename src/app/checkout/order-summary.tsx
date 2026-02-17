// src/app/checkout/order-summary.tsx
'use client';

import { useCart, CartItem } from '@/context/CartContext';
import Image from 'next/image';

export function OrderSummary() {
  // Fix 1: Ensure this matches the Case (cartItems vs cartitems) in your Context
  const { cartItems, totalPrice } = useCart();

  return (
    <div className="space-y-4">
      {cartItems.map((item: CartItem) => (
        <div key={item.id} className="flex items-start gap-4">
          <div className="relative">
            <Image
              // Fix 2: 'images' is an array. Use item.images[0] to fix ts(2322)
              src={item.images[0] || "https://placehold.co"} 
              alt={item.name}
              width={64}
              height={64}
              className="rounded-md object-cover"
              unoptimized // Recommended to prevent those 500/timeout errors
            />
          </div>
          <div className="flex-grow">
            <p className="font-semibold">{item.name}</p>
            {/* Fix 3: Now 'size' is valid because we added it to the interface */}
            {item.size && (
              <p className="text-sm text-muted-foreground">Size: {item.size}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
