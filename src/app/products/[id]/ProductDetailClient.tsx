"use client";

import { ShieldCheck, CreditCard, Leaf } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import AddToCartForm from "./add-to-cart-form";
import BraceletCustomizer from "@/components/bracelet-customizer";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProductDetailClient({ id }: { id: string }) {
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"description" | "shipping">("description");
  const [loading, setLoading] = useState(true);
  const [wristSize, setWristSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;

    async function loadData() {
      setLoading(true);

      const { data: bracelet } = await supabase
        .from("bracelets")
        .select("*, bracelet_images(image_url)")
        .eq("Bracelet_id", id)
        .maybeSingle();

      if (bracelet) {
        setProduct({
          id: bracelet.Bracelet_id,
          name: bracelet.Bracelet_Name,
          price: bracelet.Price,
          description: bracelet.Description,
          category: "Bracelets",
          images:
            bracelet.bracelet_images?.map((img: any) => img.image_url) || [
              "/placeholder.png",
            ],
        });

        const { data: related } = await supabase
          .from("bracelets")
          .select("*, bracelet_images(image_url)")
          .neq("Bracelet_id", id)
          .limit(2);

        setRelatedProducts(
          related?.map((item: any) => ({
            id: item.Bracelet_id,
            name: item.Bracelet_Name,
            price: item.Price,
            image:
              item.bracelet_images?.[0]?.image_url || "/placeholder.png",
          })) || []
        );

        setLoading(false);
        return;
      }

      const { data: keychain } = await supabase
        .from("Keychain")
        .select("*, keychain_images(image_url)")
        .eq("Keychain_id", id)
        .maybeSingle();

      if (keychain) {
        setProduct({
          id: keychain.Keychain_id,
          name: keychain.Keychain_Name,
          price: keychain.Price,
          description: keychain.Description,
          category: "Keychains",
          images:
            keychain.keychain_images?.map((img: any) => img.image_url) || [
              "/placeholder.png",
            ],
        });

        const { data: related } = await supabase
          .from("Keychain")
          .select("*, keychain_images(image_url)")
          .neq("Keychain_id", id)
          .limit(2);

        setRelatedProducts(
          related?.map((item: any) => ({
            id: item.Keychain_id,
            name: item.Keychain_Name,
            price: item.Price,
            image:
              item.keychain_images?.[0]?.image_url || "/placeholder.png",
          })) || []
        );

        setLoading(false);
        return;
      }

      setLoading(false);
    }

    loadData();
  }, [id]);

  if (loading)
    return (
      <div className="p-20 text-center uppercase tracking-widest text-[10px]">
        Loading EpicBraid...
      </div>
    );

  if (!product)
    return (
      <div className="p-20 text-center">
        <h2 className="text-xl font-bold">Product Not Found</h2>
      </div>
    );

  const isCustomizerTemplate = [
    "cobra-style",
    "fishtail-style",
    "serpent-style",
    "nautical-style",
  ].includes(product.id);

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 bg-white">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

        <div>
          <Carousel>
            <CarouselContent>
              {product.images.map((img: string, index: number) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-square rounded-xl overflow-hidden">
                    <Image
                      src={img}
                      alt={product.name}
                      fill
                      unoptimized
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {product.images.length > 1 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
        </div>

        <div>
          <h1 className="text-4xl font-black uppercase">
            {product.name}
          </h1>

          <p className="text-3xl font-black my-6">
            ₹ {product.price.toLocaleString("en-IN")}
          </p>

          {isCustomizerTemplate ? (
            <BraceletCustomizer selectedStyle={product} />
          ) : (
            <AddToCartForm
              product={product}
              wristSize={wristSize}
              quantity={quantity}
            />
          )}
        </div>
      </div>
    </div>
  );
}
