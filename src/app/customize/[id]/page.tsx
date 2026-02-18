import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CustomizePage({ params }: PageProps) {
  // 1. Await params to get the ID (Required in Next.js 15)
  const { id } = await params;

  // 2. Query both potential tables or a unified view
  // Note: Adjust table names/columns to match your actual schema
  const { data: product, error } = await supabase
    .from("bracelets")
    .select("*")
    .eq("Bracelet_id", id)
    .maybeSingle(); // maybeSingle returns null instead of throwing error if not found

  // 3. Null Check: If no product is found, redirect to 404
  if (!product || error) {
    // If you have a separate keychains table, you might chain another query here
    return notFound();
  }

  // 4. Safe Data Mapping
  const formattedProduct = {
    id: product.Bracelet_id,
    name: product.Bracelet_Name,
    price: product.Price,
    description: product.Description,
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold uppercase">{formattedProduct.name}</h1>
      {/* Rest of your customization UI */}
    </div>
  );
}
