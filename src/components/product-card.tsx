import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ProductCard({ product }: { product: any }) {
  let imageUrl = "https://placehold.co/600x400";

  if (Array.isArray(product?.images) && product.images.length > 0) {
    imageUrl = product.images[0];
  } else if (typeof product?.images === "string" && product.images.trim() !== "") {
    imageUrl = product.images;
  }

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 border-none shadow-none group-hover:shadow-xl group-hover:-translate-y-1">
      
      <div className="relative w-full aspect-[3/2] overflow-hidden bg-gray-50">
        <Image
          src={imageUrl}
          alt={product?.name || "Product image"}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {product?.category && (
          <Badge className="absolute top-3 left-3 bg-black text-white text-[8px] font-bold uppercase tracking-widest rounded-none border-none">
            {product.category}
          </Badge>
        )}
      </div>

      <CardContent className="pt-6 flex-grow">
        <h3 className="text-sm font-bold uppercase tracking-tight text-gray-900 line-clamp-1">
          {product?.name}
        </h3>

        {product?.description && (
          <p className="text-[10px] text-gray-500 mt-2 line-clamp-2 italic">
            {product.description}
          </p>
        )}
      </CardContent>

      <CardFooter className="pb-6 pt-0">
        <p className="text-lg font-black tracking-tighter text-black">
          ₹ {product?.price ? product.price.toLocaleString("en-IN") : "0"}.00
        </p>
      </CardFooter>

    </Card>
  );
}