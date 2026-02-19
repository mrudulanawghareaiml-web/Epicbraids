import { createClient } from "@supabase/supabase-js";
import { ProductCard } from "@/components/product-card";
import Link from "next/link";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function ProductsPage() {
  // 1. Fetch Bracelets from Supabase
  const { data: braceletData, error: bError } = await supabase
    .from("bracelets")
    .select(`
      Bracelet_id,
      Bracelet_Name,
      Price,
      Description, 
      bracelet_images(image_url)
    `);

  // 2. Fetch Keychains from Supabase
  const { data: keychainData, error: kError } = await supabase
    .from("Keychain")
    .select(`
      Keychain_id,
      Keychain_Name,
      Price,
      Description,
      keychain_images(image_url)
    `);

  if (bError) console.error("Bracelets fetch error:", bError);
  if (kError) console.error("Keychains fetch error:", kError);

  // 3. Format Bracelet Data with unoptimized handling
const formattedBracelets = (braceletData ?? []).map((b: any) => ({
  id: b.Bracelet_id,
  name: b.Bracelet_Name,
  price: b.Price,
  description: b.Description || "Handcrafted custom bracelet.",
  category: "Bracelets",
  images:
    b.bracelet_images?.[0]?.image_url ||
    "https://placehold.co/600x400",
}));

const formattedKeychains = (keychainData ?? []).map((k: any) => ({
  id: k.Keychain_id,
  name: k.Keychain_Name,
  price: k.Price,
  description: k.Description || "Handcrafted custom keychain.",
  category: "Keychains",
  images:
    k.keychain_images?.[0]?.image_url ||
    "https://placehold.co/600x400",
}));

  const allProducts = [...formattedBracelets, ...formattedKeychains];

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 bg-white">
      {/* HEADER SECTION */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 leading-none">
          Our Collection
        </h1>
        <div className="h-1 w-12 bg-black mx-auto mt-4"></div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        {/* TAB NAVIGATION */}
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto bg-gray-100 rounded-full p-1 mb-12">
          <TabsTrigger value="all" className="rounded-full text-[10px] font-bold uppercase tracking-widest">All</TabsTrigger>
          <TabsTrigger value="bracelets" className="rounded-full text-[10px] font-bold uppercase tracking-widest">Bracelets</TabsTrigger>
          <TabsTrigger value="keychains" className="rounded-full text-[10px] font-bold uppercase tracking-widest">Keychains</TabsTrigger>
        </TabsList>

        {/* TAB CONTENT AREAS */}
        <div className="mt-8">
          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {allProducts.map((product) => (
                <Link 
                  key={product.id} 
                  href={`/products/${product.id}`} 
                  className="block transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bracelets">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {formattedBracelets.map((product) => (
                <Link 
                  key={product.id} 
                  href={`/products/${product.id}`} 
                  className="block transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="keychains">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {formattedKeychains.map((product) => (
                <Link 
                  key={product.id} 
                  href={`/products/${product.id}`} 
                  className="block transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
