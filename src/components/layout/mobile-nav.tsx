'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      const { data } = await supabase
        .from('bracelets')
        .select('*, bracelet_images(image_url)')
        .limit(4); // Only get 4 for the featured section
      
      if (data) setProducts(data);
      setLoading(false);
    }
    fetchFeatured();
  }, []);

 return (
    <main className="bg-[#fcfcf7] pt-14">
      {/* HERO SECTION - Ensure relative and z-0 so it doesn't overlap products */}
      <section className="relative z-0 h-[500px] ...">
         {/* Hero content */}
      </section>

      {/* HERO SECTION */}
      <section 
        className="relative h-[600px] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="bg-black/50 absolute inset-0" />
        <div className="relative z-10 text-white px-4">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">
            BRACELETS
          </h1>
          <p className="mt-4 text-lg uppercase tracking-[0.1em] font-light">That tell your story.</p>
          <Link href="/products">
            <button className="mt-8 px-10 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-all">
              Shop Collection
            </button>
          </Link>
        </div>
      </section>

       <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-center text-2xl font-semibold mb-12">Our Featured Products</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link 
              key={product.Bracelet_id} 
              href={`/bracelets/${product.Bracelet_id}`}
              /* EXPLICIT FIXES BELOW */
              className="relative z-20 block group cursor-pointer" 
              style={{ pointerEvents: 'auto' }} 
            >
              <div className="text-center">
                {/* Image Wrapper */}
                <div className="relative bg-gray-200 h-64 mb-4 overflow-hidden rounded-xl">
                  {product.bracelet_images?.[0]?.image_url && (
                    <Image 
                      src={product.bracelet_images[0].image_url} 
                      alt={product.Bracelet_Name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      unoptimized
                    />
                  )}
                </div>
                
                {/* Text */}
                <h3 className="font-medium group-hover:underline">{product.Bracelet_Name}</h3>
                <p className="text-gray-500">₹{product.Price}</p>
                <span className="text-xs text-blue-600 font-bold mt-2 inline-block">View Details</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}