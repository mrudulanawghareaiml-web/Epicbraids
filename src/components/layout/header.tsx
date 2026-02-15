"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";

export default function Header() {
  const { items } = useCart();
  const cartCount = items?.length || 0;
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 h-14 flex items-center",
        isScrolled 
          ? "bg-[#1A1A1A]/80 backdrop-blur-md border-b border-white/5 shadow-xl" 
          : "bg-white border-b border-gray-100"
      )}
    >
      <div className="max-w-7xl mx-auto px-8 w-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 -mt-1 transition-transform group-hover:scale-110 duration-300">
            <Image 
              src="/logo.png" 
              alt="EpicBraids Logo" 
              fill
              className={cn(
                "object-contain transition-all duration-500",
                isScrolled ? "invert-0" : "invert"
              )}
              priority
            />
          </div>
          <span className={cn(
            "text-2xl font-black tracking-tighter uppercase transition-all duration-500",
            isScrolled ? "text-white" : "text-black"
          )}>
            EpicBraids
          </span>
        </Link>
        
        <nav className={cn(
          "hidden md:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-500",
          isScrolled ? "text-white/90" : "text-black/90"
        )}>
          <Link href="/products" className="hover:opacity-60 transition-opacity">Products</Link>
          <Link href="/customize" className="hover:opacity-60 transition-opacity">Customize</Link>
          <Link href="#about" className="hover:opacity-60 transition-opacity">About</Link>
          <Link href="#contact" className="hover:opacity-60 transition-opacity">Contact</Link>
        </nav>

        <div className="flex items-center">
           <Link href="/cart">
             <button className={cn(
               "text-[10px] font-bold uppercase tracking-widest border px-6 py-2 transition-all duration-500",
               isScrolled 
                ? "text-white border-white/20 hover:bg-white hover:text-black" 
                : "text-black border-black/20 hover:bg-black hover:text-white"
             )}>
               Cart ({cartCount})
             </button>
           </Link>
        </div>
      </div>
    </header>
  );
}

