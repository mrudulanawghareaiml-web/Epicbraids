'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import BraceletCustomizer from '@/components/bracelet-customizer';
import Image from 'next/image';

export default function CustomizeKeychainPage() {
  const [styles, setStyles] = useState<any[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStyles() {
      const { data, error } = await supabase
        .from('customize_keychain')
        .select('*');

      if (!error && data) {
        setStyles(data);
      }

      setLoading(false);
    }

    fetchStyles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 py-20 md:py-32">

        {!selectedStyle ? (
          <>
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight">
                Customize Keychain
              </h1>
              <div className="h-1 w-12 bg-black mx-auto mt-6"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {styles.map((style) => {
                const firstImage = Array.isArray(style.images)
                  ? style.images[0]
                  : style.images;

                return (
                  <div
                    key={style.id}
                    onClick={() => setSelectedStyle(style)}
                    className="cursor-pointer group"
                  >
                    <div className="relative aspect-square bg-gray-50 overflow-hidden rounded-xl">
                      <Image
                        src={firstImage}
                        alt={style.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-all duration-300"
                        unoptimized
                      />
                    </div>

                    <div className="mt-4">
                      <h3 className="font-bold uppercase text-sm">
                        {style.name}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        ₹{style.price}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => setSelectedStyle(null)}
              className="mb-10 text-xs uppercase tracking-widest text-gray-400 hover:text-black"
            >
              ← Back to styles
            </button>

            <BraceletCustomizer selectedStyle={selectedStyle} />
          </>
        )}

      </div>
    </div>
  );
}