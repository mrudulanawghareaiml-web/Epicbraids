'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';

export function AddToCartForm({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAdd = () => {
    // ✅ FIX: Rename 'image' to 'image_url' to match your CartItem interface
    addToCart({ 
      id: product.id || product.Bracelet_id, 
      name: product.name || product.Bracelet_Name, 
      price: product.price || product.Price, 
      image_url: product.image_url || product.bracelet_images?.[0]?.image_url || product.images?.[0], 
      quantity 
    });
    
    toast({
      title: "Added to Cart",
      description: `${quantity}x ${product.name || product.Bracelet_Name} added to bag.`,
    });
  };

  return (
    <div className="flex gap-4 items-center w-full">
      <Input 
        type="number" 
        min="1" 
        value={quantity} 
        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} 
        className="w-20 h-12 text-center font-bold"
      />
      <Button 
        onClick={handleAdd} 
        className="flex-1 h-12 bg-black text-white font-bold uppercase tracking-widest hover:bg-gray-800 transition-all"
      >
        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
      </Button>
    </div>
  );
}
