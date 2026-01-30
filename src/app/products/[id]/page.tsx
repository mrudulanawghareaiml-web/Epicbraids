import { getProductById, getProducts } from '@/lib/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AddToCartForm } from './add-to-cart-form';
import { Metadata } from 'next';

type ProductPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductById(params.id);

  if (!product) {
    return {
      title: 'Product not found',
    }
  }

  return {
    title: `${product.name} | EpicBraids`,
    description: product.description,
  }
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((img, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-w-3 aspect-h-2">
                    <Image
                      src={img}
                      alt={`${product.name} - view ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        <div>
          <p className="text-sm font-medium text-primary">{product.category.toUpperCase()}</p>
          <h1 className="text-3xl md:text-4xl font-headline my-2">{product.name}</h1>
          <p className="text-3xl font-bold text-primary mb-4">${product.price.toFixed(2)}</p>
          
          <div className="prose text-muted-foreground max-w-none">
            <p>{product.description}</p>
          </div>
          
          {product.materials && (
            <div className="mt-6">
              <h3 className="font-semibold text-lg">Materials</h3>
              <p className="text-muted-foreground">{product.materials}</p>
            </div>
          )}

          <div className="mt-6">
            <AddToCartForm product={product} />
          </div>

        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
    const products = getProducts();
    return products.map(product => ({ id: product.id }));
}
