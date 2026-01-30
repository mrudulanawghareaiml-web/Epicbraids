import { Logo } from '@/components/logo';
import { Twitter, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-secondary/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Logo />
            <span className="ml-2 font-headline text-xl font-bold">EpicBraids Online</span>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Twitter />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Instagram />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Facebook />
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} EpicBraids Online. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
