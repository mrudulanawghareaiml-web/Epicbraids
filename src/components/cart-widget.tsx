'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollArea } from './ui/scroll-area';

export function CartWidget() {
  const { cartItems, cartCount, totalPrice, removeFromCart, updateQuantity } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {cartCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({cartCount})</SheetTitle>
        </SheetHeader>
        {cartCount > 0 ? (
          <>
            <ScrollArea className="flex-grow pr-4 -mr-6">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-grow">
                      <p className="font-semibold">{item.name}</p>
                      {item.size && <p className="text-sm text-muted-foreground">Size: {item.size}</p>}
                      {item.style && <p className="text-sm text-muted-foreground">Style: {item.style}</p>}
                      {item.colors && item.colors.length > 0 && <p className="text-sm text-muted-foreground">Colors: {item.colors.join(', ')}</p>}
                      <p className="font-bold text-primary">${item.price.toFixed(2)}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                          <span>{item.quantity}</span>
                          <Button size="icon" variant="outline" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                        </div>
                        <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="mt-4 border-t pt-4">
              <div className="w-full space-y-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <Button asChild className="w-full" variant="secondary">
                        <Link href="/cart">View Cart</Link>
                    </Button>
                    <Button asChild className="w-full">
                        <Link href="/checkout">Checkout</Link>
                    </Button>
                </div>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="font-semibold text-lg">Your cart is empty</h3>
            <p className="text-muted-foreground">Add some items to get started!</p>
            <SheetTrigger asChild>
                <Button asChild variant="link" className="mt-4">
                    <Link href="/products">Continue Shopping</Link>
                </Button>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
