"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";

const PARACORD_COLORS = [
  { name: "Stealth Black", hex: "#000000" },
  { name: "Olive Drab", hex: "#3B3F30" },
  { name: "Coyote Brown", hex: "#836539" },
  { name: "Navy Blue", hex: "#000080" },
  { name: "Imperial Red", hex: "#ED2939" },
  { name: "Neon Orange", hex: "#FF5F00" },
  { name: "Safety Yellow", hex: "#EED202" },
  { name: "Charcoal Grey", hex: "#36454F" },
];

export default function BraceletCustomizer({ selectedStyle }: { selectedStyle: any }) {
  const router = useRouter();
  const { addItem } = useCart();
  
  // Initialize with the first two colors from our list
  const [primaryColor, setPrimaryColor] = useState(PARACORD_COLORS[0]);
  const [accentColor, setAccentColor] = useState(PARACORD_COLORS[1]);

  const handleAddToCart = () => {
    if (addItem) {
      addItem({
        ...selectedStyle,
        id: `${selectedStyle.id}-${Date.now()}`,
        customization: {
          primary: primaryColor.name,
          accent: accentColor.name,
        }
      });
      router.push("/cart");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      
      {/* LEFT SIDE: PREVIEW */}
      <div className="space-y-6">
        <div className="aspect-square relative bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
          <Image
            // FIX: Access the first image in the array [0]
            src={selectedStyle.images[0]} 
            alt={selectedStyle.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="p-6 bg-gray-50 rounded-lg">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Base Description</h3>
          <p className="text-gray-600 italic text-sm">{selectedStyle.description}</p>
        </div>
      </div>

      {/* RIGHT SIDE: SELECTION */}
      <div className="space-y-12">
        
        {/* PRIMARY COLOR */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">Primary Color</h3>
            {/* FIX: Render the name string, not the whole object */}
            <span className="text-[10px] font-bold uppercase text-gray-400">{primaryColor.name}</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {PARACORD_COLORS.map((color) => (
              <button
                key={`primary-${color.name}`}
                onClick={() => setPrimaryColor(color)}
                className={cn(
                  "h-12 w-full rounded-sm border-2 transition-all",
                  primaryColor.name === color.name ? "border-black scale-105" : "border-transparent opacity-60 hover:opacity-100"
                )}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>

        {/* ACCENT COLOR */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">Accent Color</h3>
            <span className="text-[10px] font-bold uppercase text-gray-400">{accentColor.name}</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {PARACORD_COLORS.map((color) => (
              <button
                key={`accent-${color.name}`}
                onClick={() => setAccentColor(color)}
                className={cn(
                  "h-12 w-full rounded-sm border-2 transition-all",
                  accentColor.name === color.name ? "border-black scale-105" : "border-transparent opacity-60 hover:opacity-100"
                )}
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        </div>

        {/* CART ACTION */}
        <div className="pt-8 border-t border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total</span>
            <span className="text-3xl font-black tracking-tighter">₹ {selectedStyle.price}.00</span>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-5 font-bold uppercase text-[11px] tracking-[0.3em] hover:bg-gray-800 transition-all active:scale-[0.98]"
          >
            Confirm & Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
