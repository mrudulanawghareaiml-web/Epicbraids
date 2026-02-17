import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function BraceletPage({ params }: { params: { id: string } }) {
  const { data: product } = await supabase
    .from("bracelets")
    .select(`*, bracelet_images(image_url)`)
    .eq("Bracelet_id", params.id)
    .single();

  if (!product) notFound();

  return (
    <div className="container mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="relative aspect-square">
        <Image 
          src={product.bracelet_images?.[0]?.image_url} 
          alt={product.Bracelet_Name} 
          fill 
          className="object-cover rounded-xl"
          unoptimized // Fixes the 500 timeout error
        />
      </div>
      <div className="space-y-6">
        <h1 className="text-4xl font-black uppercase tracking-tighter">{product.Bracelet_Name}</h1>
        <p className="text-2xl font-bold">₹ {product.Price}</p>
        <p className="text-gray-600">{product.Description}</p>
        
        <Link href={`/customize/${product.Bracelet_id}`} className="block w-full bg-black text-white text-center py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-all">
          Customize This Bracelet
        </Link>
      </div>
    </div>
  );
}
