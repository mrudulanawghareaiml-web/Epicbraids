import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { getFeaturedProducts } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const featuredProducts = getFeaturedProducts(4);
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-1');
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us');

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline text-primary-foreground mb-4 drop-shadow-lg">
            Craft Your Story, One Braid at a Time
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Discover handcrafted bracelets and keychains, or design your own unique piece.
          </p>
          <Button asChild size="lg" className="font-bold text-lg py-6 px-10">
            <Link href="/customize">Start Customizing</Link>
          </Button>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div className="mb-8 lg:mb-0">
              {aboutImage && <Image
                src={aboutImage.imageUrl}
                alt={aboutImage.description}
                width={600}
                height={500}
                className="rounded-lg shadow-lg object-cover"
                data-ai-hint={aboutImage.imageHint}
              />}
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-headline mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Founded in a small workshop with a big heart, EpicBraids was born from a passion for creating beautiful, handcrafted items that tell a story. We believe that accessories are more than just an adornment; they are a form of self-expression, a reminder of a special moment, or a bond between friends.
              </p>
              <p className="text-muted-foreground">
                Each bracelet and keychain is meticulously woven with high-quality materials, attention to detail, and a whole lot of love. Our mission is to bring a little piece of handcrafted joy into your life and to help you celebrate your own unique story.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
