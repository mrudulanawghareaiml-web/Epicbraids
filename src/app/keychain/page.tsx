"use client";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function KeychainPage() {
  const [keychains, setKeychains] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchKeychains() {
      const { data } = await supabase
        .from("keychains")
        .select("*, keychain_images(image_url)");

      if (data) {
        setKeychains(
          data.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            image:
              item.keychain_images?.[0]?.image_url ||
              "https://placehold.co/600x600",
          }))
        );
      }

      setLoading(false);
    }

    fetchKeychains();
  }, []);

  if (loading)
    return (
      <div className="p-20 text-center uppercase tracking-widest text-xs">
        Loading Keychains...
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-black uppercase mb-12">Keychains</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {keychains.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group"
          >
            <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
              <Image
                src={product.image}
                alt={product.name}
                fill
                unoptimized
                className="object-cover group-hover:scale-105 transition"
              />
            </div>

            <h3 className="text-sm font-bold uppercase">
              {product.name}
            </h3>

            <p className="text-xs text-gray-500">
              ₹{product.price.toLocaleString("en-IN")}.00
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
