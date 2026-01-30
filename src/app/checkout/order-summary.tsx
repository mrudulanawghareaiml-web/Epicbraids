'use client';

import { useCart } from '@/context/cart-context';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export function OrderSummary() {
  const { cartItems, totalPrice } = useCart();

  return (
    <div className="space-y-4">
      <ScrollArea className="h-64 pr-4">
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-start gap-4">
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="rounded-md object-cover"
                />
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-grow">
                <p className="font-semibold">{item.name}</p>
                {item.size && <p className="text-sm text-muted-foreground">Size: {item.size}</p>}
              </div>
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
      <Separator />
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-semibold">Free</span>
        </div>
      </div>
      <Separator />
      <div className="flex justify-between font-bold text-xl">
        <span>Total</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
}
