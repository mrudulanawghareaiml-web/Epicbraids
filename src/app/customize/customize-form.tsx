'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { braceletStyles, availableColors } from '@/lib/products';
import { ShoppingCart, Check, Palette, Ruler, Box } from 'lucide-react';
import { cn } from '@/lib/utils';

const MAX_COLORS = 2; // Adjusted to match your "Dominant & Accent" request

export function CustomizeForm() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const [style, setStyle] = useState(braceletStyles[0].id);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [size, setSize] = useState('Medium (6-7 inches)');

  const handleColorToggle = (colorName: string) => {
    setSelectedColors(prev => {
      if (prev.includes(colorName)) return prev.filter(c => c !== colorName);
      if (prev.length < MAX_COLORS) return [...prev, colorName];
      
      toast({
        title: `Selection Limit`,
        description: `Please select 1 Dominant and 1 Accent color only.`,
        variant: 'destructive'
      });
      return prev;
    });
  };

  const handleSubmit = () => {
    if (selectedColors.length < 2) {
      toast({ title: 'Design Incomplete', description: 'Please select both Dominant and Accent colors.', variant: 'destructive' });
      return;
    }

    const customProduct = {
      id: `custom-${Date.now()}`,
      name: 'Custom Tailored Bracelet',
      price: 499, 
      image: "https://cmhypugbgxhzoeqgwrwn.supabase.co",
      style: braceletStyles.find(s => s.id === style)?.name || 'Custom',
      colors: selectedColors,
      size: size,
    };
    
    addToCart(customProduct);
    toast({ title: 'Added to Collection', description: 'Your custom creation is in the cart.' });
  };

  return (
    <div className="space-y-16 font-poppins pb-20">
      {/* 1. STYLE SELECTION */}
      <section>
        <div className="flex items-center gap-3 mb-8">
           <Box className="w-5 h-5 text-gray-400" />
           <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-900">01. Select Weave Style</h3>
        </div>
        <RadioGroup value={style} onValueChange={setStyle} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {braceletStyles.map(s => (
            <div key={s.id} className="relative group">
              <RadioGroupItem value={s.id} id={s.id} className="sr-only" />
              <Label 
                htmlFor={s.id} 
                className={cn(
                  "flex flex-col rounded-xl border-2 p-4 transition-all cursor-pointer bg-white hover:border-black",
                  style === s.id ? "border-black shadow-lg" : "border-gray-100"
                )}
              >
                <div className="aspect-[4/3] relative overflow-hidden rounded-lg mb-4">
                  <Image src={s.image} alt={s.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <span className="font-bold text-gray-900">{s.name}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">{s.description}</span>
              </Label>
              {style === s.id && <Check className="absolute top-6 right-6 w-5 h-5 text-white bg-black rounded-full p-1" />}
            </div>
          ))}
        </RadioGroup>
      </section>
      
      {/* 2. COLOR SELECTION */}
      <section>
        <div className="flex items-center gap-3 mb-8">
           <Palette className="w-5 h-5 text-gray-400" />
           <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-900">02. Choose Your Palette</h3>
        </div>
        <p className="text-xs text-gray-400 mb-6 italic">Select 2 colors: The first is Dominant, the second is Accent.</p>
        <div className="flex flex-wrap gap-4">
          {availableColors.map(color => (
            <button
              key={color.id}
              onClick={() => handleColorToggle(color.name)}
              className={cn(
                'w-12 h-12 rounded-full border-2 transition-all flex items-center justify-center relative overflow-hidden',
                selectedColors.includes(color.name) ? 'border-black scale-110' : 'border-transparent hover:scale-105'
              )}
              style={{ backgroundColor: color.hex }}
            >
              {selectedColors.includes(color.name) && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white">
                   <span className="text-[10px] font-bold">{selectedColors.indexOf(color.name) + 1}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* 3. SIZE SELECTION */}
      <section>
        <div className="flex items-center gap-3 mb-8">
           <Ruler className="w-5 h-5 text-gray-400" />
           <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-gray-900">03. Define Your Fit</h3>
        </div>
        <RadioGroup value={size} onValueChange={setSize} className="flex flex-wrap gap-4">
          {['Small', 'Medium', 'Large'].map(s => (
            <div key={s}>
              <RadioGroupItem value={s} id={s} className="sr-only" />
              <Label
                htmlFor={s}
                className={cn(
                  "px-8 py-3 rounded-full border-2 text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-all",
                  size === s ? "bg-black text-white border-black" : "bg-white text-gray-400 border-gray-100 hover:border-gray-300"
                )}
              >
                {s}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </section>

      {/* SUMMARY & ACTION */}
      <div className="border-t border-gray-100 pt-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-1 text-center md:text-left">
              <h3 className="text-3xl font-bold text-gray-900">₹ 499.00</h3>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                {style} Style / {selectedColors.join(' & ') || 'Pending Selection'}
              </p>
          </div>
          
          <Button 
            size="lg" 
            className="bg-black text-white hover:bg-zinc-800 px-12 h-14 text-xs font-bold uppercase tracking-widest transition-all rounded-sm shadow-xl"
            onClick={handleSubmit}
          >
            <ShoppingCart className="mr-3 w-4 h-4" />
            Finalize Creation
          </Button>
      </div>
    </div>
  );
}
