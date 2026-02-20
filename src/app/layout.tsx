import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { CartProvider } from '@/context/CartContext';

// 1. Configure the Poppins font used in your Hero section
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'EpicBraids | Handcrafted Custom Bracelets',
  description: 'Handcrafted premium bracelets and accessories made with passion.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" suppressHydrationWarning className={poppins.variable}>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased flex flex-col',
          poppins.className
        )}
      >
        {/* 
          CRITICAL FIX: Header is placed INSIDE CartProvider 
          because it uses the useCart() hook.
        */}
        <CartProvider>
          <Header />
          
          <main className="flex-grow">
            {children}
          </main>
          
          <Footer />
        </CartProvider>

        <Toaster />
      </body>
    </html>
  );
}
