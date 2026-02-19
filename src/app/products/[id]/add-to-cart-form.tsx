'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';

export default function AddToCartForm({
  product,
  wristSize,
  quantity,
}: {
  product: any;
  wristSize?: string;
  quantity: number;
}) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizing?.[0]
  );

  const { addToCart } = useCart();
  const { toast } = useToast();

  const isBracelet = product.category === 'Bracelets';
  const isSizeSelectionRequired = product.sizing && product.sizing.length > 0 && !product.sizing.includes('Adjustable');

  const handleAddToCart = () => {
    // 1. Validation logic
    if (isSizeSelectionRequired && !selectedSize) {
      toast({ title: 'Please select a size', variant: 'destructive' });
      return;
    }

    if (isBracelet && !wristSize?.trim()) {
      toast({ title: 'Please enter your wrist size', variant: 'destructive' });
      return;
    }

    // 2. Create the item with the EXACT quantity and image_url
    const cartItem = {
      id: `${product.id}-${wristSize || selectedSize || 'default'}`,
      name: product.name,
      price: product.price,
      // ✅ FIX: Ensures the image shows up in the cart
      image_url: Array.isArray(product.images) ? product.images[0] : product.images,
      quantity: quantity, // ✅ FIX: Passes the 2, 3, or 5 you selected
      productId: product.id,
      size: selectedSize,
      style: wristSize,
    };

    addToCart(cartItem);

    toast({
      title: 'Added to cart!',
      description: `${quantity} x ${product.name} added.`,
    });
  };

  return (
    <div className="space-y-6">
      {isSizeSelectionRequired && (
        <div className="space-y-2">
          <Label className="font-black uppercase tracking-tighter text-lg">Size</Label>
          <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
            {product.sizing?.map((size: string) => (
              <div key={size} className="flex items-center">
                <RadioGroupItem value={size} id={size} className="sr-only" />
                <Label
                  htmlFor={size}
                  className={`flex items-center justify-center rounded-md border-2 px-6 py-2 text-[10px] font-bold uppercase tracking-widest cursor-pointer ${
                    selectedSize === size ? 'border-black bg-black text-white' : 'border-muted bg-popover'
                  }`}
                >
                  {size}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      <Button
        size="lg"
        className="w-full bg-black text-white hover:bg-gray-800 h-14 font-bold uppercase tracking-[0.3em] text-[11px]"
        onClick={handleAddToCart}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
    </div>
  );
}
