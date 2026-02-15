import { createClient } from "@supabase/supabase-js";
import { notFound } from 'next/navigation';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AddToCartForm } from './add-to-cart-form';
import BraceletCustomizer from "@/components/bracelet-customizer";
import { Metadata } from 'next';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 1. Correct Type for Next.js 15 Params
type ProductPageProps = {
  params: Promise<{ id: string }>;
};

async function fetchProductFromSupabase(id: string) {
  const { data: bracelet } = await supabase
    .from("bracelets")
    .select("*, bracelet_images(image_url)")
    .eq("Bracelet_id", id)
    .single();

  if (bracelet) {
    return {
      id: bracelet.Bracelet_id,
      name: bracelet.Bracelet_Name,
      price: bracelet.Price,
      description: bracelet.Description,
      category: "Bracelets",
      images: bracelet.bracelet_images?.map((img: any) => img.image_url) || ["https://placehold.co"],
    };
  }

  const { data: keychain } = await supabase
    .from("Keychain")
    .select("*")
    .eq("Keychain_id", id)
    .single();

  if (keychain) {
    return {
      id: keychain.Keychain_id,
      name: keychain.Keychain_Name,
      price: keychain.Price,
      description: keychain.Description,
      category: "Keychains",
      images: ["https://placehold.co"],
    };
  }
  return null;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchProductFromSupabase(id);
  return {
    title: product ? `${product.name} | EpicBraids` : 'Product Not Found',
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  // 2. Await params properly for Next.js 15
  const { id } = await params;
  const product = await fetchProductFromSupabase(id);

  if (!product) notFound();

  // 3. Define the 4 custom styles
  const customizableIds = ['cobra-style', 'fishtail-style', 'serpent-style', 'nautical-style'];
  const isCustomizable = customizableIds.includes(id);

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
                    <Image src={img} alt={product.name} fill unoptimized className="object-cover" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {product.images.length > 1 && (
              <>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </>
            )}
          </Carousel>
        </div>

        {/* INFO SECTION */}
        <div className="flex flex-col">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">{product.category}</p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 leading-none">{product.name}</h1>
          <div className="h-1 w-12 bg-black my-8"></div>
          <p className="text-3xl font-black tracking-tighter mb-8">₹ {product.price.toLocaleString('en-IN')}.00</p>
          <div className="text-gray-500 italic text-sm leading-relaxed mb-10"><p>{product.description}</p></div>

          {/* 4. SMART TOGGLE */}
          <div className="mt-4">
            {isCustomizable ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                 <BraceletCustomizer selectedStyle={product} />
              </div>
            ) : (
              <AddToCartForm product={product} />
            )}
          </div>

          <div className="mt-16 pt-8 border-t border-gray-100 flex gap-12">
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
              <span className="block text-black mb-1">Handmade</span>Original EpicBraid
            </div>
            <div className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
              <span className="block text-black mb-1">Shipping</span>Across India
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
