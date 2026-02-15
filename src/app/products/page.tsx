import { createClient } from "@supabase/supabase-js";
import { ProductCard } from "@/components/product-card";
import Link from "next/link"; // 1. Added Link import
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
  // Fetch Bracelets
  const { data: braceletData, error: bError } = await supabase
    .from("bracelets")
    .select(`
      Bracelet_id,
      Bracelet_Name,
      Price,
      bracelet_images(image_url)
    `);

  // Fetch Keychains
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

  // Format Bracelet Data
  const formattedBracelets = (braceletData ?? []).map((b: any) => ({
    id: b.Bracelet_id,
    name: b.Bracelet_Name,
    price: b.Price,
    category: "Bracelets",
    images: b.bracelet_images?.[0]?.image_url
      ? [b.bracelet_images[0].image_url]
      : ["https://placehold.co/600x400"],
  }));

  // Format Keychain Data
  const formattedKeychains = (keychainData ?? []).map((k: any) => ({
    id: k.Keychain_id,
    name: k.Keychain_Name,
    price: k.Price,
    description: k.Description,
    category: "Keychains",
    images: k.keychain_images?.[0]?.image_url
      ? [k.keychain_images[0].image_url]
      : ["https://placehold.co/600x400"],
  }));

  const allProducts = [...formattedBracelets, ...formattedKeychains];

  return (
    <div className="container mx-auto px-4 py-12 md:py-24 bg-white">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-gray-900">
          Our Collection
        </h1>
        <div className="h-0.5 w-16 bg-black mx-auto mt-4"></div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto bg-gray-100 rounded-full p-1">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="bracelets">Bracelets</TabsTrigger>
          <TabsTrigger value="keychains">Keychains</TabsTrigger>
        </TabsList>

        <div className="mt-16">
          {/* ALL PRODUCTS */}
          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {allProducts.map((product) => (
                <Link key={product.id} href={`/customize?style=${product.id}`}>
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* BRACELETS */}
          <TabsContent value="bracelets">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {formattedBracelets.map((product) => (
                <Link key={product.id} href={`/customize?style=${product.id}`}>
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          </TabsContent>

          {/* KEYCHAINS */}
          <TabsContent value="keychains">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {formattedKeychains.map((product) => (
                <Link key={product.id} href={`/customize?style=${product.id}`}>
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
