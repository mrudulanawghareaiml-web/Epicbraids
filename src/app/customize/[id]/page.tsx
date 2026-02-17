import BraceletCustomizer from "@/components/bracelet-customizer";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default async function CustomizePage({ params }: { params: { id: string } }) {
  // Check both tables to find the style
  const { data: bracelet } = await supabase.from("bracelets").select("*, bracelet_images(image_url)").eq("Bracelet_id", params.id).single();
  const { data: keychain } = await supabase.from("Keychain").select("*, keychain_images(image_url)").eq("Keychain_id", params.id).single();

  const product = bracelet || keychain;

  const formattedProduct = {
    id: product.Bracelet_id || product.Keychain_id,
    name: product.Bracelet_Name || product.Keychain_Name,
    price: product.Price,
    description: product.Description,
    images: product.bracelet_images?.[0]?.image_url || product.keychain_images?.[0]?.image_url
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-black uppercase mb-12 text-center">Customize Your Style</h2>
      <BraceletCustomizer selectedStyle={formattedProduct} />
    </div>
  );
}
