import type { Product } from './types';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl ?? 'https://picsum.photos/seed/placeholder/600/400';

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Sunset Chevron Bracelet',
    description: 'A vibrant, hand-woven bracelet featuring a classic chevron pattern in warm sunset colors. Perfect for adding a pop of color to any outfit.',
    price: 18.00,
    images: [getImage('bracelet-1'), getImage('bracelet-3')],
    category: 'Bracelets',
    materials: '100% Cotton Embroidery Floss',
    sizing: ['Small (5-6 inches)', 'Medium (6-7 inches)', 'Large (7-8 inches)'],
    colors: ['Orange', 'Pink', 'Yellow', 'Purple'],
  },
  {
    id: 'prod-2',
    name: 'Minimalist Gold Bead Bracelet',
    description: 'An elegant and simple bracelet featuring a single, polished gold bead on a delicate thread. Ideal for stacking or wearing alone.',
    price: 25.00,
    images: [getImage('bracelet-2')],
    category: 'Bracelets',
    materials: 'Gold-plated bead, Nylon cord',
    sizing: ['Adjustable'],
  },
  {
    id: 'prod-3',
    name: 'Boho Tassel Keychain',
    description: 'A beautiful and functional keychain with a colorful braided loop and a soft, handmade tassel. Easily find your keys in style.',
    price: 15.00,
    images: [getImage('keychain-1')],
    category: 'Keychains',
    materials: 'Cotton Embroidery Floss, Metal Clasp',
  },
  {
    id: 'prod-4',
    name: 'Nautical Anchor Bracelet',
    description: 'Show your love for the sea with this nautical-themed bracelet, featuring a durable paracord band and a stylish anchor charm closure.',
    price: 22.00,
    images: [getImage('bracelet-4')],
    category: 'Bracelets',
    materials: 'Paracord, Metal Alloy Charm',
    sizing: ['Small (5-6 inches)', 'Medium (6-7 inches)', 'Large (7-8 inches)'],
  },
  {
    id: 'prod-5',
    name: 'Monochrome Pattern Bracelet',
    description: 'A striking bracelet with a bold black and white geometric pattern. This versatile piece complements any modern wardrobe.',
    price: 18.00,
    images: [getImage('bracelet-5')],
    category: 'Bracelets',
    materials: '100% Cotton Embroidery Floss',
    sizing: ['Small (5-6 inches)', 'Medium (6-7 inches)', 'Large (7-8 inches)'],
  },
  {
    id: 'prod-6',
    name: 'Earthy Wooden Bead Keychain',
    description: 'A rustic keychain combining natural wooden beads with a short, sturdy braid. Perfect for a natural, earthy aesthetic.',
    price: 16.00,
    images: [getImage('keychain-2')],
    category: 'Keychains',
    materials: 'Natural Wood Beads, Cotton Cord, Metal Clasp',
  },
  {
    id: 'prod-7',
    name: 'Rainbow Lanyard Keychain',
    description: 'A long, vibrant keychain that can be worn as a lanyard. The continuous braid features all the colors of the rainbow.',
    price: 20.00,
    images: [getImage('keychain-3')],
    category: 'Keychains',
    materials: 'Cotton Embroidery Floss, Metal Clasp',
  },
];

export const getProducts = () => products;

export const getProductById = (id: string) => products.find(p => p.id === id);

export const getFeaturedProducts = (count: number) => products.slice(0, count);

export const braceletStyles = [
  { id: 'chevron', name: 'Chevron', description: 'Classic V-shaped pattern.', image: getImage('bracelet-1') },
  { id: 'fishtail', name: 'Fishtail', description: 'A delicate, intricate weave.', image: getImage('bracelet-2') },
  { id: 'spiral', name: 'Spiral', description: 'A twisting, candy-cane pattern.', image: getImage('bracelet-4') },
  { id: 'solid', name: 'Solid Flat', description: 'A wide, solid-colored band.', image: getImage('bracelet-5') },
];

export const availableColors = [
  { id: 'red', name: 'Red', hex: '#ef4444' },
  { id: 'orange', name: 'Orange', hex: '#f97316' },
  { id: 'yellow', name: 'Yellow', hex: '#eab308' },
  { id: 'green', name: 'Green', hex: '#22c55e' },
  { id: 'blue', name: 'Blue', hex: '#3b82f6' },
  { id: 'purple', name: 'Purple', hex: '#8b5cf6' },
  { id: 'pink', name: 'Pink', hex: '#ec4899' },
  { id: 'black', name: 'Black', hex: '#000000' },
  { id: 'white', name: 'White', hex: '#ffffff' },
  { id: 'brown', name: 'Brown', hex: '#78350f' },
  { id: 'gold', name: 'Gold', hex: '#B8860B' },
  { id: 'silver', name: 'Silver', hex: '#a1a1aa' },
];
