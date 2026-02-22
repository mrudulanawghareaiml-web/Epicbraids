"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { ShieldCheck, CreditCard, Leaf } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function BraceletCustomizer({ selectedStyle }: { selectedStyle: any }) {
  const router = useRouter();
  const { addToCart } = useCart();

  const product = selectedStyle;

  const [quantity, setQuantity] = useState(1);
  const [wristSize, setWristSize] = useState("");
  const [activeTab, setActiveTab] =
    useState<"description" | "shipping">("description");
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  const ALL_COLORS = [
  { name: "STEALTH BLACK", image: "/threads/DSC04396.JPG" },
  { name: "SAGE GREY", image: "/threads/DSC04375.JPG" },
  { name: "ROYAL MAROON", image: "/threads/DSC04380.JPG" },
  { name: "NAVY DEPTH", image: "/threads/DSC04381.JPG" },
  { name: "FOREST GREEN", image: "/threads/DSC04385.JPG" },
  { name: "SAND BEIGE", image: "/threads/DSC04383.JPG" },
  { name: "CRIMSON RED", image: "/threads/DSC04378.JPG" },
  { name: "ICE BLUE", image: "/threads/DSC04384.JPG" },
  { name: "CHARCOAL", image: "/threads/DSC04386.JPG" },
  { name: "OLIVE", image: "/threads/DSC04388.JPG" },
  { name: "VINTAGE BROWN", image: "/threads/DSC04379.JPG" },
  { name: "MUSTARD", image: "/threads/DSC04389.JPG" },
  { name: "BURGUNDY", image: "/threads/DSC04392.JPG" },
  { name: "SKY GREY", image: "/threads/DSC04394.JPG" },
  { name: "MIDNIGHT", image: "/threads/DSC04401.JPG" },
  { name: "PURE WHITE", image: "/threads/DSC04398.JPG" },
];

  const ACCENT_COLORS = ALL_COLORS.slice(0, 12);

  const [dominant1, setDominant1] = useState(ALL_COLORS[0]);
  const [dominant2, setDominant2] = useState(ALL_COLORS[1]);
  const [accent, setAccent] = useState(ACCENT_COLORS[2]);

useEffect(() => {
  async function fetchRelated() {
    if (!selectedStyle?.id) return;

    const { data, error } = await supabase
      .from("customize")
      .select("id, name, price, images")
      .neq("id", selectedStyle.id)
      .limit(2);

    if (!error && data) {
      const productsWithUrls = data.map((item: any) => {
        const imagePath = Array.isArray(item.images)
          ? item.images[0]
          : item.images;

        let publicUrl = imagePath;

        if (imagePath && !imagePath.startsWith("http")) {
          const { data: urlData } = supabase.storage
            .from("products")
            .getPublicUrl(imagePath);

          publicUrl = urlData.publicUrl;
        }

        return { ...item, image: publicUrl };
      });

      setRelatedProducts(productsWithUrls);
    } else {
      setRelatedProducts([]);
    }
  }

  fetchRelated();
}, [selectedStyle?.id]);

  const handleAddToCart = () => {
    if (!wristSize) {
      alert("Please enter wrist size.");
      return;
    }

    addToCart({
      ...selectedStyle,
      id: `${selectedStyle.id}-${Date.now()}`,
      image_url: selectedStyle.images,
      quantity,
      size: wristSize,
      customization: {
        dominant1: dominant1.name,
        dominant2: dominant2.name,
        accent: accent.name,
      },
    });

    router.push("/cart");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* LEFT IMAGE */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="aspect-square relative bg-white rounded-lg overflow-hidden border">
            <Image
              src={
                Array.isArray(selectedStyle?.images)
                  ? selectedStyle.images[0]
                  : selectedStyle?.images
              }
              alt={selectedStyle?.name || ""}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-12">

          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 mb-3">
            {selectedStyle?.category || "CUSTOMIZE"}
          </p>

          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-gray-900 leading-[0.9] mb-6">
            {selectedStyle?.name}
          </h1>

          <div className="h-1.5 w-12 bg-black mb-8"></div>

          <p className="text-4xl font-black italic tracking-tighter text-gray-900 mb-8">
            ₹ {selectedStyle?.price?.toLocaleString("en-IN")}.00
          </p>

          <div className="text-gray-500 italic text-sm leading-relaxed max-w-md mb-10">
            <p>{selectedStyle?.description}</p>
          </div>

          <section>
            <h2 className="text-xs font-black uppercase tracking-widest mb-6">
              Select Dominant Colours
            </h2>

            <ColorPicker label="Colour 1" selected={dominant1} setSelected={setDominant1} options={ALL_COLORS} />
            <ColorPicker label="Colour 2" selected={dominant2} setSelected={setDominant2} options={ALL_COLORS} />
          </section>

          <section>
            <h2 className="text-xs font-black uppercase tracking-widest mb-6">
              Select Accent Colour
            </h2>

            <ColorPicker label="Accent" selected={accent} setSelected={setAccent} options={ACCENT_COLORS} />
          </section>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest">
              Wrist Size (in cm)
            </label>
            <input
              type="text"
              value={wristSize}
              onChange={(e) => setWristSize(e.target.value)}
              placeholder="e.g. 16 cm"
              className="w-full border px-4 py-3 mt-2 text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest">
              Quantity
            </label>
            <div className="flex items-center gap-4 mt-2">
              <button onClick={() => setQuantity((p) => Math.max(1, p - 1))} className="px-4 py-2 border">-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((p) => p + 1)} className="px-4 py-2 border">+</button>
            </div>
          </div>

          <div className="border-t pt-8">
            <div className="flex justify-between mb-6">
              <span>Total</span>
              <span className="text-2xl font-bold">
                ₹ {(selectedStyle?.price * quantity)?.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-4 uppercase text-xs tracking-widest hover:bg-gray-900"
            >
              Confirm & Add to Cart
            </button>
          </div>

           {/* HANDMADE + SHIPPING */}
          <div className="mt-16 pt-8 border-t flex gap-8 text-xs uppercase tracking-widest">
            <div>
              <span className="block text-black mb-1">Handmade</span>
              Original EpicBraids
            </div>
            <div>
              <span className="block text-black mb-1">Shipping</span>
              Across India
            </div>
          </div>
        </div>
      </div>

 {/* SPECS & BUY IT WITH SECTION */}
<div className="mt-32 pt-16 border-t border-gray-100">
  <div className="flex flex-col md:flex-row gap-16">

    {/* LEFT SIDE - TABS */}
    <div className="md:w-3/5">
      
      {/* TAB BUTTONS */}
      <div className="flex gap-8 mb-8 border-b border-gray-100">
        <button 
          onClick={() => setActiveTab('description')}
          className={`text-[10px] font-bold uppercase tracking-widest pb-4 transition-all ${
            activeTab === 'description'
              ? 'border-b-2 border-black text-black'
              : 'text-gray-300'
          }`}
        >
          Description
        </button>

        <button 
          onClick={() => setActiveTab('shipping')}
          className={`text-[10px] font-bold uppercase tracking-widest pb-4 transition-all ${
            activeTab === 'shipping'
              ? 'border-b-2 border-black text-black'
              : 'text-gray-300'
          }`}
        >
          Shipping & Returns
        </button>
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'description' ? (
        <div className="animate-in fade-in duration-500">
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            Every {product?.name} is handcrafted with precision, combining vintage aesthetic with high-strength performance materials for daily wear.
          </p>

          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4">
              Technical specifications:
            </h4>

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

          {/* SHIPPING */}
          <div>
            <h4 className="text-[11px] font-bold uppercase mb-4 text-black">
              Shipping Information
            </h4>

            <ul className="text-[11px] text-gray-500 space-y-2">
              <li><span className="font-bold text-black">• Processing Time:</span> 1–2 business days.</li>
              <li><span className="font-bold text-black">• Delivery Time:</span> 5–7 business days.</li>
              <li><span className="font-bold text-black">• Packaging:</span> Secure protective packaging.</li>
              <li><span className="font-bold text-black">• Shipping Charges:</span> Calculated at checkout.</li>
            </ul>
          </div>

          {/* RETURNS */}
          <div>
            <h4 className="text-[11px] font-bold uppercase mb-4 text-black">
              Returns & Exchanges
            </h4>

            <ul className="text-[11px] text-gray-500 space-y-2">
              <li><span className="font-bold text-black">• Return Window:</span> Within 4 days of delivery.</li>
              <li><span className="font-bold text-black">• Exchange:</span> Subject to availability.</li>
              <li><span className="font-bold text-black">• Non-Returnable:</span> Custom pieces not eligible.</li>
            </ul>
          </div>
        </div>
      )}

    {/* ICONS */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-gray-50">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <ShieldCheck size={14} /> Warranty
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <CreditCard size={14} /> Payment
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <Leaf size={14} /> CO2 Neutral
              </div>
            </div>
          </div>
{/* RIGHT BUY IT WITH */}
          <div className="md:w-2/5">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.1em] mb-8">
              Buy It With
            </h4>

            {relatedProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-6">
                {relatedProducts.map((item) => (
                  <Link
                    key={item.id}
                    href={`/products/${item.id}`}
                    className="group block text-center"
                  >
                    <div className="relative aspect-square mb-4 overflow-hidden bg-gray-50 rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        unoptimized
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>

                    <h3 className="text-[9px] font-bold uppercase tracking-tight mb-1">
                      {item.name}
                    </h3>

                    <p className="text-[10px] text-gray-400 mb-2">
                      ₹{item.price?.toLocaleString("en-IN")}.00
                    </p>

                    <span className="text-[9px] font-bold uppercase underline decoration-gray-200">
                      Quick View
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400">
                No related products available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   COLOR PICKER COMPONENT
========================= */

function ColorPicker({
  label,
  selected,
  setSelected,
  options,
}: {
  label: string;
  selected: any;
  setSelected: any;
  options: any[];
}) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-end mb-3">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-black">
          {label}
        </h3>
        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
          {selected.name}
        </span>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-4 gap-3">
        {options.map((color: any) => (
          <button
            key={`${label}-${color.name}`}
            onClick={() => setSelected(color)}
            className={`relative h-14 w-full rounded-md border-2 transition-all duration-200 overflow-hidden ${
              selected.name === color.name
                ? "border-black scale-105 shadow-md"
                : "border-gray-200"
            }`}
          >
            {color.image ? (
              <img
                src={color.image}
                alt={color.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{ backgroundColor: color.hex }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}