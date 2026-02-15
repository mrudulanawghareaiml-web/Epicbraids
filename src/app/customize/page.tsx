'use client'; // Required for the toggle state

import { useState } from 'react';
import { ProductCard } from '@/components/product-card';
import BraceletCustomizer from '@/components/bracelet-customizer';

const CUSTOMIZABLE_STYLES = [
  {
    id: 'cobra-style',
    name: 'Classic Cobra',
    price: 499,
    description: 'A robust, wide weave perfect for dominant/accent color pairings.',
    category: 'Custom Style',
    images: ['https://cmhypugbgxhzoeqgwrwn.supabase.co/storage/v1/object/public/Product/Bracelets/DSC03925.JPG']
  },
  {
    id: 'fishtail-style',
    name: 'Sleek Fishtail',
    price: 399,
    description: 'A slim, elegant weave that offers a more refined look.',
    category: 'Custom Style',
    images: ['https://cmhypugbgxhzoeqgwrwn.supabase.co/storage/v1/object/public/Product/Bracelets/Bracelets%20(15).jpeg']
  },
  {
    id: 'serpent-style',
    name: 'Tactical Serpent',
    price: 449,
    description: 'High-density weave designed for durability and outdoor use.',
    category: 'Custom Style',
    images: ['https://cmhypugbgxhzoeqgwrwn.supabase.co/storage/v1/object/public/Product/Bracelets/Bracelets%20(34).jpeg'] 
  },
  {
    id: 'nautical-style',
    name: 'Nautical Braid',
    price: 349,
    description: 'A minimalist style inspired by traditional maritime rope work.',
    category: 'Custom Style',
    images: ['https://cmhypugbgxhzoeqgwrwn.supabase.co/storage/v1/object/public/Product/Bracelets/DSC04228.JPG']
  }
];

export default function CustomizePage() {
  const [selectedStyle, setSelectedStyle] = useState<any>(null);

  return (
    <div className="bg-white min-h-screen font-poppins">
      <div className="container mx-auto px-6 py-20 md:py-32">
        {!selectedStyle ? (
          /* STEP 1: SELECT YOUR BRACELET STYLE */
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-gray-900">
                Choose Your Style
              </h1>
              <div className="h-1 w-12 bg-black mx-auto"></div>
              <p className="text-gray-500 italic text-lg pt-2">Select a weave base to begin your custom creation.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {CUSTOMIZABLE_STYLES.map((style) => (
                <div 
                  key={style.id} 
                  onClick={() => setSelectedStyle(style)}
                  className="cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
                >
                  <ProductCard product={style} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* STEP 2: CUSTOMIZE COLORS */
          <div className="animate-in fade-in duration-500">
            <button 
              onClick={() => setSelectedStyle(null)}
              className="mb-10 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black flex items-center gap-2 transition-colors"
            >
              ← Back to weave styles
            </button>
            
            <div className="max-w-6xl mx-auto">
              <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-gray-900">
                  {selectedStyle.name}
                </h2>
                <p className="text-gray-400 text-sm italic mt-2">
                  Now customizing your {selectedStyle.category}
                </p>
              </div>

              {/* CRITICAL: Passing selectedStyle as a prop to the customizer */}
              <BraceletCustomizer selectedStyle={selectedStyle} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
