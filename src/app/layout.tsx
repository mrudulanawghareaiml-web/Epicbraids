import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header'; // Your existing Header component
import Footer from '@/components/layout/footer'; // Your existing Footer component
import { CartProvider } from '@/context/CartContext';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'EpicBraids Online',
  description: 'Handcrafted braids and customized styles by you.',
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
        <CartProvider>
          {/* 1. Header is placed here so it shows on every page */}
          <Header />
          
          {/* 2. The main content (like your Products page) is rendered here */}
          <main className="flex-grow">{children}</main>
          
          {/* 3. Footer is placed here to appear at the bottom of every page */}
          <Footer />
        </CartProvider>
        <Toaster />
      </body>
    </html>
  );
}
