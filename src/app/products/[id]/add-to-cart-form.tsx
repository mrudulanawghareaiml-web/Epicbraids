'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';

export function AddToCartForm({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizing?.[0]);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (product.sizing && !product.sizing.includes('Adjustable') && !selectedSize) {
      toast({
        title: 'Please select a size',
        variant: 'destructive',
      });
      return;
    }
    
    const cartItem = {
        id: selectedSize ? `${product.id}-${selectedSize}` : product.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: selectedSize,
    };

    // We add quantity one by one in the cart context logic
    for (let i = 0; i < quantity; i++) {
        addToCart(cartItem);
    }
    
    toast({
      title: `${quantity} x ${product.name} added to cart!`,
      description: 'You can view your cart or continue shopping.',
    });
  };
  
  const isSizeSelectionRequired = product.sizing && product.sizing.length > 0 && !product.sizing.includes('Adjustable');

  return (
    <div className="space-y-6">
      {isSizeSelectionRequired && (
        <div className="space-y-2">
          <Label className="font-semibold text-lg">Size</Label>
          <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
            {product.sizing?.map((size) => (
              <div key={size}>
                <RadioGroupItem value={size} id={size} className="sr-only" />
                <Label
                  htmlFor={size}
                  className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer px-4 py-2"
                >
                  {size}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      <div className="flex items-center gap-4">
        <Label className="font-semibold text-lg">Quantity</Label>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</Button>
          <span className="w-10 text-center font-bold text-lg">{quantity}</span>
          <Button size="icon" variant="outline" onClick={() => setQuantity(q => q + 1)}>+</Button>
        </div>
      </div>
      
      <Button size="lg" className="w-full" onClick={handleAddToCart}>
        <ShoppingCart className="mr-2"/>
        Add to Cart
      </Button>
    </div>
  );
}
