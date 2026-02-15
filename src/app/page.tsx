import { createClient } from "@supabase/supabase-js";
import { ProductCard } from "@/components/product-card";
import Link from "next/link"; // Added for navigation

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Home() {
  const { data, error } = await supabase
    .from("bracelets")
    .select(`
      Bracelet_id,
      Bracelet_Name,
      Description,
      Price,
      bracelet_images (
        image_url
      )
    `);

  if (error) console.error("Supabase error:", error);
  
  // 1. LIMIT TO 4 PRODUCTS FOR THE HOME PAGE
  const products = data?.slice(0, 4) ?? [];

  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION */}
      {/* HERO SECTION WITH NEW SUPABASE BACKGROUND */}
{/* HERO SECTION - REPLACING WHITE BACKGROUND WITH SUPABASE IMAGE */}
<section className="relative h-screen w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-black font-poppins">
  
  {/* The Background Image Container */}
  <div className="absolute inset-0 z-0">
    <img 
      src="https://cmhypugbgxhzoeqgwrwn.supabase.co/storage/v1/object/public/Product/Bracelets/Bracelets%20(34).jpeg" 
      alt="Handcrafted Bracelet Background" 
      className="h-full w-full object-cover brightness-[0.4]"
    />
  </div>

  {/* Text Content Overlay - Now visible against the dark image */}
  <div className="relative z-10 max-w-5xl space-y-6">
    <div className="space-y-2">
      <h1 className="text-4xl md:text-8xl font-bold text-white tracking-[0.1em] uppercase leading-none">
        BRACELETS
      </h1>
      <h2 className="text-l md:text-4xl font-light text-white tracking-[0.2em] uppercase">
        THAT TELL YOUR STORY.
      </h2>
    </div>

    <p className="text-sm md:text-lg font-light text-gray-300 max-w-lg mx-auto leading-relaxed italic">
      explore our curated collection of handcrafted bracelets, designed for every occasion.
    </p>
    
    {/* BUTTON GROUP - SIDE BY SIDE */}
<div className="pt-10 flex flex-row items-center justify-center gap-4 px-4">
  
  {/* Primary Action: Explore */}
  <Link href="/products">
    <button className="bg-white text-black px-8 md:px-12 py-4 text-[10px] md:text-xs font-poppins font-bold uppercase tracking-[0.2em] hover:bg-gray-200 transition-all rounded-sm shadow-xl">
      Explore
    </button>
  </Link>
  
  {/* Secondary Action: Customize */}
  <Link href="/customize">
    <button className="bg-transparent text-white px-8 md:px-12 py-4 text-[10px] md:text-xs font-poppins font-bold uppercase tracking-[0.2em] border border-white/30 hover:bg-white/10 transition-all rounded-sm backdrop-blur-sm">
      Customize
    </button>
  </Link>

</div>

  </div>
</section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-gray-900 mb-4">Our Featured Products</h2>
          <div className="h-0.5 w-16 bg-black mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products.map((product: any) => {
            const imagePath = product.bracelet_images?.[0]?.image_url;
            const cleanImage = imagePath && typeof imagePath === "string" ? imagePath.trim() : null;

            const formattedProduct = {
              id: product.Bracelet_id,
              name: product.Bracelet_Name,
              description: product.Description,
              price: product.Price,
              images: cleanImage ? [cleanImage] : ["https://placehold.co"],
            };

            return (
              <div key={formattedProduct.id} className="transition-all duration-300 hover:shadow-lg rounded-xl overflow-hidden">
                <ProductCard product={formattedProduct} />
              </div>
            );
          })}
        </div>

        {/* 2. VIEW ALL PRODUCTS BUTTON */}
        <div className="mt-20 text-center">
          <Link href="/products">
            <button className="bg-black text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all rounded-sm shadow-md">
              View All Products
            </button>
          </Link>
        </div>
      </section>

      {/* OUR STORY SECTION */}

{/* OUR STORY SECTION - IMAGE LEFT, TEXT RIGHT */}
<section className="bg-black text-white py-24 px-6 overflow-hidden">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
    
    {/* Left Side: Crafting Image */}
    <div className="w-full md:w-1/2">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-white/5">
        <img 
          src="https://cmhypugbgxhzoeqgwrwn.supabase.co/storage/v1/object/public/Product/Bracelets/Bracelets%20(28).jpeg" 
          alt="Handcrafting process" 
          className="h-full w-full object-cover shadow-2xl"
        />
      </div>
    </div>

    {/* Right Side: Text Content */}
    <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
      <h2 className="text-4xl md:text-5xl font-poppins font-bold text-white mb-8 tracking-tight">
        Our Story
      </h2>
      
      <div className="space-y-6 font-poppins font-light text-gray-300 leading-relaxed text-sm md:text-base">
        <p>
          Founded in a small workshop with a big heart, EpicBraids was born from a 
          passion for creating beautiful, handcrafted items that tell a story. We 
          believe that accessories are more than just an ornament; they are a 
          form of self-expression, a memory of a special moment, or a bond between friends.
        </p>
        <p>
          Each bracelet and keychain is meticulously woven with high-quality 
          materials, attention to detail, and a whole lot of love. Our mission 
          is to bring a little piece of handcrafted joy into your life and to 
          help you celebrate your own unique story.
        </p>
      </div>

      {/* Decorative line matching the high-end look */}
      <div className="h-0.5 w-12 bg-white/20 mt-10"></div>
    </div>
  </div>
</section>

    </main>
  );
}
