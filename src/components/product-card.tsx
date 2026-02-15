import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">

        <div className="relative w-full aspect-[3/2] overflow-hidden">
<Image
  src={
    product.images &&
    Array.isArray(product.images) &&
    product.images[0]
      ? product.images[0]
      : "/logo.png"
  }
  alt={product.name}
  fill
  unoptimized
  className="object-cover transition-transform duration-300 group-hover:scale-105"
/>

        </div>

        <CardContent className="p-4 flex flex-col gap-2">
          <h3 className="font-medium text-base">
            {product.name}
          </h3>

          <p className="text-sm text-gray-500">
            {product.category}
          </p>

          <p className="text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>

          <p className="font-semibold text-lg mt-1">
  &#8377; {product.price.toFixed(2)}
</p>


        </CardContent>

      </Card>
    </Link>
  );
}
