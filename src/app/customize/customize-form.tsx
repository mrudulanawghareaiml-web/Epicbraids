'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { braceletStyles, availableColors } from '@/lib/products';
import { ShoppingCart, Check, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const MAX_COLORS = 5;

export function CustomizeForm() {
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const [style, setStyle] = useState(braceletStyles[0].id);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [size, setSize] = useState('Medium (6-7 inches)');

  const handleColorToggle = (colorName: string) => {
    setSelectedColors(prev => {
      if (prev.includes(colorName)) {
        return prev.filter(c => c !== colorName);
      }
      if (prev.length < MAX_COLORS) {
        return [...prev, colorName];
      }
      toast({
        title: `You can select up to ${MAX_COLORS} colors.`,
        variant: 'destructive'
      });
      return prev;
    });
  };

  const handleSubmit = () => {
    if (selectedColors.length === 0) {
      toast({
        title: 'Please select at least one color.',
        variant: 'destructive'
      });
      return;
    }

    const customId = `custom-${style}-${selectedColors.join('-')}-${size}-${Date.now()}`;
    const customProduct = {
      id: customId,
      name: 'Custom Bracelet',
      price: 20.00, // Base price for custom items
      image: PlaceHolderImages.find(p => p.id === 'bracelet-1')?.imageUrl || '',
      style: braceletStyles.find(s => s.id === style)?.name || 'Custom',
      colors: selectedColors,
      size: size,
    };
    
    addToCart(customProduct);

    toast({
      title: 'Custom bracelet added to cart!',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customization Options</CardTitle>
        <CardDescription>Follow the steps below to create your unique bracelet.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">1. Choose Your Style</h3>
          <RadioGroup value={style} onValueChange={setStyle} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {braceletStyles.map(s => (
              <div key={s.id}>
                <RadioGroupItem value={s.id} id={s.id} className="sr-only" />
                <Label htmlFor={s.id} className="flex flex-col items-center justify-start rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer h-full">
                  <Image src={s.image} alt={s.name} width={120} height={80} className="rounded-md object-cover mb-2" />
                  <span className="font-bold">{s.name}</span>
                  <span className="text-xs text-muted-foreground text-center mt-1">{s.description}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2"><Palette /> 2. Pick Your Colors (up to {MAX_COLORS})</h3>
          <div className="flex flex-wrap gap-3">
            {availableColors.map(color => (
              <Button
                key={color.id}
                variant="outline"
                size="icon"
                className={cn('w-10 h-10 rounded-full relative', selectedColors.includes(color.name) && 'border-primary border-2')}
                style={{ backgroundColor: color.hex }}
                onClick={() => handleColorToggle(color.name)}
                aria-label={`Select ${color.name}`}
              >
                {selectedColors.includes(color.name) && <Check className="h-5 w-5 text-white mix-blend-difference" />}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">3. Select Your Size</h3>
          <RadioGroup value={size} onValueChange={setSize} className="flex flex-wrap gap-2">
            {['Small (5-6 inches)', 'Medium (6-7 inches)', 'Large (7-8 inches)'].map(s => (
              <div key={s}>
                <RadioGroupItem value={s} id={s} className="sr-only" />
                <Label
                  htmlFor={s}
                  className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer px-4 py-2"
                >
                  {s}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="border-t pt-8">
            <h3 className="text-xl font-semibold">Your Creation</h3>
            <p className="text-muted-foreground">Style: {braceletStyles.find(s=>s.id === style)?.name}</p>
            <p className="text-muted-foreground">Colors: {selectedColors.join(', ') || 'None selected'}</p>
            <p className="text-muted-foreground">Size: {size}</p>
            <p className="text-2xl font-bold text-primary mt-2">$20.00</p>
        </div>
        
        <Button size="lg" className="w-full" onClick={handleSubmit}>
          <ShoppingCart className="mr-2" />
          Add Custom Bracelet to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
