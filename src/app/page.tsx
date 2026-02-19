import { createClient } from "@supabase/supabase-js";
import { ProductCard } from "@/components/product-card";
import Link from "next/link";
import Image from "next/image"; // Added this missing import

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
  
  const products = data?.slice(0, 4) ?? [];

  return (
    <main className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-black font-poppins">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://cmhypugbgxhzoeqgwrwn.supabase.co/storage/v1/object/public/Product/Bracelets/Bracelets%20(34).jpeg" 
            alt="Handcrafted Bracelet Background" 
            className="h-full w-full object-cover brightness-[0.4]"
          />
        </div>

        <div className="relative z-10 max-w-5xl space-y-6">
          <div className="space-y-2">
            <h1 className="text-8xl md:text-8xl font-semibold text-white uppercase leading-none">
              BRACELETS
            </h1>
            <h2 className="p-2 text-xl md:text-5xl font-light text-white uppercase">
              THAT TELL YOUR STORY.
            </h2>
          </div>

          <p className="p-1 text-s md:text-lg font-light text-gray-300 max-w-lg mx-auto leading-relaxed italic">
            explore our curated collection of handcrafted bracelets, designed for every occasion.
          </p>
          
          <div className="pt-10 flex flex-row items-center justify-center gap-4 px-4">
            <Link href="/products">
              <button className="bg-white text-black px-8 md:px-12 py-4 text-[10px] md:text-xs font-poppins font-bold uppercase tracking-[0.1em] hover:bg-gray-200 transition-all rounded-sm shadow-xl">
                Explore 
              </button>
            </Link>
            
            <Link href="/customize">
              <button className="bg-transparent text-white px-8 md:px-12 py-4 text-[10px] md:text-xs font-poppins font-bold uppercase tracking-[0.1em] border border-white/30 hover:bg-white/10 transition-all rounded-sm backdrop-blur-sm">
                Customize 
              </button>
            </Link>
          </div>
        </div>
      </section>

    {/* FEATURED PRODUCTS SECTION */}
<section className="py-24 px-6 max-w-[1400px] mx-auto bg-white">
  <div className="flex flex-col items-center mb-16">
    <h2 className="text-3xl font-serif text-gray-900 mb-4">
      Our Featured Products
    </h2>
    <div className="h-0.5 w-16 bg-black"></div>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
    {products.map((product: any) => {

      const formatted = {
        id: product.Bracelet_id,
        name: product.Bracelet_Name,
        price: product.Price,
        description: product.Description,
        image: product.bracelet_images?.[0]?.image_url,
      };

      return (
        <Link
          key={formatted.id}
          href={`/products/${formatted.id}`}   // ✅ Correct route
          className="group block cursor-pointer transition-all duration-500 hover:-translate-y-2"
        >
          <div className="flex flex-col transition-all duration-500 group-hover:bg-white group-hover:shadow-2xl group-hover:-translate-y-2 rounded-xl">
            
            {/* IMAGE */}
            <div className="relative h-[220px] w-full overflow-hidden rounded-t-lg bg-gray-50 mb-4">
              <Image
                src={formatted.image || "/placeholder.png"}
                alt={formatted.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            {/* TEXT */}
            <div className="p-4 space-y-2">
              <h3 className="text-[11px] font-black uppercase tracking-tighter text-gray-900">
                {formatted.name}
              </h3>

              <p className="text-[10px] text-gray-400 font-medium leading-relaxed italic line-clamp-2">
                {formatted.description || 
                  "Handcrafted with premium materials for a unique story."}
              </p>

              <p className="text-sm font-black tracking-tighter text-gray-900 pt-1">
                ₹ {formatted.price?.toLocaleString("en-IN")}.00
              </p>
            </div>

          </div>
        </Link>
      );
    })}
  </div>

  <div className="mt-20 flex justify-center">
    <Link href="/products">
      <button className="bg-black text-white px-10 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all rounded-sm shadow-md">
        View All Products
      </button>
    </Link>
  </div>
</section>


      {/* OUR STORY SECTION */}
      <section className="bg-black text-white py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full md:w-1/2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-white/5">
              <img 
                src="https://cmhypugbgxhzoeqgwrwn.supabase.co/storage/v1/object/public/Product/Bracelets/Bracelets%20(28).jpeg" 
                alt="Handcrafting process" 
                className="h-full w-full object-cover shadow-2xl"
              />
            </div>
          </div>

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
            <div className="h-0.5 w-12 bg-white/20 mt-10"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
