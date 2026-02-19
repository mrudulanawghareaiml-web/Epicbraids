"use client";

import { ShieldCheck, CreditCard, Leaf } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AddToCartForm from './add-to-cart-form';
import BraceletCustomizer from "@/components/bracelet-customizer";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type ProductPageProps = {
  params: Promise<{ id: string }>;
};


export default function ProductDetailPage() {
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'description' | 'shipping'>('description');
  const [loading, setLoading] = useState(true);
  const [wristSize, setWristSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  
  const params = useParams();
  const id = params.id as string;

useEffect(() => {
  async function loadData() {
    setLoading(true);

    // 🔹 Try Bracelet First
    const { data: bracelet } = await supabase
      .from("bracelets")
      .select("*, bracelet_images(image_url)")
      .eq("Bracelet_id", id)
      .maybeSingle(); // ✅ use maybeSingle

// Inside your useEffect -> loadData function
if (bracelet) {
  setProduct({
    id: bracelet.Bracelet_id,
    name: bracelet.Bracelet_Name,
    price: bracelet.Price,
    description: bracelet.Description,
    category: "Bracelets",
    // Ensure both 'images' (for gallery) and 'image_url' (for cart) are set
    images: bracelet.bracelet_images?.map((img: any) => img.image_url) || ["/placeholder.png"],
    image_url: bracelet.bracelet_images?.[0]?.image_url || "/placeholder.png", // ✅ ADD THIS LINE
  });

      // 🔹 Related Bracelets
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

    // 🔹 If not bracelet → Try Keychain
    const { data: keychain } = await supabase
      .from("Keychain") // ✅ EXACT table name
      .select("*, keychain_images(image_url)")
      .eq("Keychain_id", id)
      .maybeSingle(); // ✅ important

   if (keychain) {
  setProduct({
    id: keychain.Keychain_id,
    name: keychain.Keychain_Name,
    price: keychain.Price,
    description: keychain.Description,
    category: "Keychains",
    images: keychain.keychain_images?.map((img: any) => img.image_url) || ["/placeholder.png"],
    image_url: keychain.keychain_images?.[0]?.image_url || "/placeholder.png", // ✅ ADD THIS LINE
  });

      // 🔹 Related Keychains
      const { data: related } = await supabase
        .from("Keychain") // ✅ exact table
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

  if (loading) return <div className="p-20 text-center uppercase tracking-widest text-[10px]">Loading EpicBraid...</div>;
  if (!product) notFound();

  const isCustomizerTemplate = ['cobra-style', 'fishtail-style', 'serpent-style', 'nautical-style'].includes(product.id);

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 bg-white">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        {/* GALLERY */}
        <div className="space-y-4">
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((img: string, index: number) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
                    <Image src={img} alt={product.name} fill unoptimized className="object-cover" priority={index === 0} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {product.images.length > 1 && <><CarouselPrevious className="left-4" /><CarouselNext className="right-4" /></>}
          </Carousel>
        </div>

        {/* INFO SECTION */}
        <div className="flex flex-col">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">{product.category}</p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 leading-none">{product.name}</h1>
          <div className="h-1 w-12 bg-black my-8"></div>
          <p className="text-3xl font-black tracking-tighter mb-8">₹ {product.price.toLocaleString('en-IN')}.00</p>
          <div className="text-gray-500 italic text-sm leading-relaxed mb-10"><p>{product.description}</p></div>

          {/* Wrist Size ONLY for Bracelets */}
{product.category === "Bracelets" && (
  <div className="space-y-2 mb-6">
    <Label className="font-black uppercase tracking-tighter text-lg">
      Enter Your Wrist Size(cm)
    </Label>
    <input
      type="number"
      min={10}
      max={25}
      placeholder="e.g. 17"
      className="w-full border border-gray-300 rounded-md px-3 py-4 focus:outline-none focus:ring-2 focus:ring-black text-sm"
      value={wristSize}
      onChange={(e) => setWristSize(e.target.value)}
    />
  </div>
)}

<div className="flex items-center gap-6 pt-4 mb-10">
  <Label className="font-black uppercase tracking-tighter text-lg">
    Quantity
  </Label>
  <div className="flex items-center gap-3">
    <Button size="icon" variant="outline" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</Button>
    <span className="w-8 text-center font-black text-xl">{quantity}</span>
    <Button size="icon" variant="outline" onClick={() => setQuantity((q: number) => q + 1)}>+</Button>
  </div>
</div>

<div className="mt-4">
  {isCustomizerTemplate
    ? <BraceletCustomizer selectedStyle={product} />
   : (
  <AddToCartForm
    product={product}
    wristSize={product.category === "Bracelets" ? wristSize : undefined}
    quantity={quantity}
  />
)}
</div>


          <div className="mt-16 pt-8 border-t border-gray-100 flex gap-8">
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
              <span className="block text-black mb-1">Handmade</span>Original EpicBraids
            </div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
              <span className="block text-black mb-1">Shipping</span>Across India
            </div>
          </div>
        </div>
      </div>    


      {/* SPECS & BUY IT WITH SECTION */}
      <div className="mt-32 pt-16 border-t border-gray-100">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-3/5">
            {/* TAB BUTTONS */}
            <div className="flex gap-8 mb-8 border-b border-gray-100">
              <button 
                onClick={() => setActiveTab('description')}
                className={`text-[10px] font-bold uppercase tracking-widest pb-4 transition-all ${activeTab === 'description' ? 'border-b-2 border-black text-black' : 'text-gray-300'}`}
              >
                Description
              </button>
              <button 
                onClick={() => setActiveTab('shipping')}
                className={`text-[10px] font-bold uppercase tracking-widest pb-4 transition-all ${activeTab === 'shipping' ? 'border-b-2 border-black text-black' : 'text-gray-300'}`}
              >
                Shipping & Returns
              </button>
            </div>

            {/* TAB CONTENT */}
            {activeTab === 'description' ? (
              <div className="animate-in fade-in duration-500">
                <p className="text-gray-600 text-sm leading-relaxed mb-8">
                  Every {product.name} is handcrafted with precision, combining vintage aesthetic with high-strength performance materials for daily wear.
                </p>
                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4">Technical specifications:</h4>
                  <ul className="text-xs text-gray-500 space-y-3">
                    <li><strong className="text-black">• Material:</strong> High-strength premium threads with reinforced weaving</li>
                    <li><strong className="text-black">• Fit:</strong> Adjustable sizing or custom wrist measurement</li>
                    <li><strong className="text-black">• Clasp:</strong> Compact metal clasp for secure and comfortable wear</li>
                    <li><strong className="text-black">• Finish:</strong> Handwoven detailing with precision stitching</li>
                    <li><strong className="text-black">• Durability:</strong> Designed for daily wear and long-lasting performance</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in duration-500 space-y-8">
                {/* SHIPPING POLICY */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase mb-4 text-black">Shipping Information</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed mb-4">We offer reliable and secure shipping to ensure your timepiece reaches you in perfect condition.</p>
                  <ul className="text-[11px] text-gray-500 space-y-2">
                    <li><span className="font-bold text-black">• Processing Time:</span> Orders are processed within 1–2 business days after confirmation.</li>
                    <li><span className="font-bold text-black">• Delivery Time:</span> Estimated delivery within 5–7 business days, depending on location.</li>
                    <li><span className="font-bold text-black">• Packaging:</span> Each order is carefully packaged to protect the product during transit.</li>
                    <li><span className="font-bold text-black">• Shipping Charges:</span> Shipping fees (if applicable) are calculated at checkout.</li>
                  </ul>
                </div>
                {/* RETURNS POLICY */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase mb-4 text-black">Returns & Exchanges</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed mb-4">Your satisfaction is important to us.</p>
                  <ul className="text-[11px] text-gray-500 space-y-2">
                    <li><span className="font-bold text-black">• Return Window:</span> Returns are accepted within 4 days of delivery.</li>
                    <li><span className="font-bold text-black">• Exchange:</span> Exchanges are subject to product availability.</li>
                    <li><span className="font-bold text-black">• Non-Returnable:</span> Customized or made-to-order pieces are not eligible for return unless defective.</li>
                  </ul>
                  <p className="text-[10px] text-gray-400 mt-6 italic">For any questions regarding shipping or returns, please contact our support team.</p>
                </div>
              </div>
            )}

            <div className="flex gap-8 mt-12 pt-8 border-t border-gray-50">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400"><ShieldCheck size={14}/> Warranty</div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400"><CreditCard size={14}/> Payment</div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400"><Leaf size={14}/> CO2 Neutral</div>
            </div>
          </div>

       
          {/* RELATED PRODUCTS */}
          <div className="md:w-2/5">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.1em] mb-8">Buy It With</h4>
            <div className="grid grid-cols-2 gap-6">
              {relatedProducts.map((item) => (
                <Link key={item.id} href={`/products/${item.id}`} className="group block text-center">
                  <div className="relative aspect-square mb-4 overflow-hidden bg-gray-50 rounded-lg">
                    <Image src={item.image} alt={item.name} fill unoptimized className="object-cover transition-transform group-hover:scale-105" />
                  </div>
                  <h3 className="text-[9px] font-bold uppercase tracking-tight mb-1">{item.name}</h3>
                  <p className="text-[10px] text-gray-400 mb-2">₹{product.price.toLocaleString('en-IN')}.00</p>
                  <span className="text-[9px] font-bold uppercase underline decoration-gray-200">Quick View</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}