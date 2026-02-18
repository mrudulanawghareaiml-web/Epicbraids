'use client';

import { useState } from 'react'; // Only one import here
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';

export function AddToCartForm({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizing?.[0]);
  const [wristSize, setWristSize] = useState<string>(''); 

  const { addToCart } = useCart(); 
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (product.sizing && product.sizing.length > 0 && !product.sizing.includes('Adjustable') && !selectedSize) {
      toast({ title: 'Please select a size', variant: 'destructive' });
      return;
    }

    if (!wristSize) {
      toast({ title: 'Please enter your wrist size', variant: 'destructive' });
      return;
    }

    const cartItem = {
      id: selectedSize ? `${product.id}-${selectedSize}` : product.id,
      name: product.name,
      price: product.price,
      images: product.images ? product.images[0] : '',
      size: selectedSize,
      wristSize, 
      category: product.category,
      quantity: quantity,
    };

    addToCart(cartItem);

    toast({
      title: 'Added to cart!',
      description: `${quantity} x ${product.name} has been added.`,
    });
  };

  const isSizeSelectionRequired = product.sizing && product.sizing.length > 0 && !product.sizing.includes('Adjustable');

  return (
    <div className="space-y-6">
      {/* Size Selection */}
      {isSizeSelectionRequired && (
        <div className="space-y-2">
          <Label className="font-black uppercase tracking-tighter text-lg">Size</Label>
          <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
            {product.sizing?.map((size: string) => (
              <div key={size} className="flex items-center">
                <RadioGroupItem value={size} id={size} className="sr-only" />
                <Label
                  htmlFor={size}
                  className={`flex items-center justify-center rounded-md border-2 px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
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
