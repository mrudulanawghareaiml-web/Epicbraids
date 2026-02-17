export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  // CHANGE THIS: Change from 'Bracelets' | 'Keychains' to string
  category: string; 
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
  productId?: string;
  size?: string;
  style?: string;
  colors?: string[];
};
