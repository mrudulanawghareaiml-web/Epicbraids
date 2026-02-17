'use client';

import { useState } from 'react';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/context/CartContext'; // Import from context
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';

export function AddToCartForm({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizing?.[0]);
  
  // 1. FIX: Changed addItem to addToCart
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
    
    // 2. FIX: Align property names with our CartItem interface
    const cartItem = {
        id: selectedSize ? `${product.id}-${selectedSize}` : product.id,
        name: product.name,
        price: product.price,
        images: product.images[0], // Matches interface 'images: string'
        size: selectedSize,
        category: product.category, // Added category
        quantity: 1, // Base quantity for a single add
    };

    // 3. FIX: Call addToCart inside the loop
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
      {/* ... rest of your JSX remains exactly the same ... */}
      {isSizeSelectionRequired && (
        <div className="space-y-2">
          <Label className="font-black uppercase tracking-tighter text-lg">Size</Label>
          <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
            {product.sizing?.map((size) => (
              <div key={size} className="flex items-center">
                <RadioGroupItem value={size} id={size} className="sr-only" />
                <Label
                  htmlFor={size}
                  className="flex items-center justify-center rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground cursor-pointer px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all data-[state=checked]:border-black"
                >
                  {size}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      <div className="flex items-center gap-6">
        <Label className="font-black uppercase tracking-tighter text-lg">Quantity</Label>
        <div className="flex items-center gap-3">
          <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</Button>
          <span className="w-8 text-center font-black text-xl tracking-tighter">{quantity}</span>
          <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => setQuantity(q => q + 1)}>+</Button>
        </div>
      </div>
      
      <Button 
        size="lg" 
        className="w-full bg-black text-white hover:bg-gray-800 rounded-none h-14 font-bold uppercase tracking-[0.3em] text-[11px]" 
        onClick={handleAddToCart}
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        Add to Cart
      </Button>
    </div>
  );
}
