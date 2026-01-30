'use client';

import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, cartCount, totalPrice, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <h1 className="text-4xl md:text-5xl font-headline mb-8">Your Cart</h1>
      
      {cartCount > 0 ? (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <Card key={item.id}>
                <CardContent className="p-4 flex items-start gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-grow">
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    {item.size && <p className="text-sm text-muted-foreground">Size: {item.size}</p>}
                    {item.style && <p className="text-sm text-muted-foreground">Style: {item.style}</p>}
                    {item.colors && item.colors.length > 0 && <p className="text-sm text-muted-foreground">Colors: {item.colors.join(', ')}</p>}
                    
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                            <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                            <span className="w-10 text-center font-semibold">{item.quantity}</span>
                            <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                        </div>
                        <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground self-start" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <Button asChild size="lg" className="w-full">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <ShoppingCart className="h-20 w-20 text-muted-foreground/50 mx-auto mb-4" />
          <h2 className="font-semibold text-2xl">Your cart is empty</h2>
          <p className="text-muted-foreground mt-2">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild className="mt-6">
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
