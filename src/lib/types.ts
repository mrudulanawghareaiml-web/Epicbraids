export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: 'Bracelets' | 'Keychains';
  materials?: string;
  sizing?: string[];
  colors?: string[];
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  // For standard products
  productId?: string;
  size?: string;
  // For custom products
  style?: string;
  colors?: string[];
};
