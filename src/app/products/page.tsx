import { getProducts } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function ProductsPage() {
  const allProducts = getProducts();
  const bracelets = allProducts.filter(p => p.category === 'Bracelets');
  const keychains = allProducts.filter(p => p.category === 'Keychains');

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline">Our Collection</h1>
        <p className="text-muted-foreground mt-2 text-lg">Handcrafted with passion and precision.</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="bracelets">Bracelets</TabsTrigger>
          <TabsTrigger value="keychains">Keychains</TabsTrigger>
        </TabsList>
        <div className="mt-8">
            <TabsContent value="all">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {allProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="bracelets">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {bracelets.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="keychains">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {keychains.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
