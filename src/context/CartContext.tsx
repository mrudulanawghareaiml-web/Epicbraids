// src/context/CartContext.tsx
"use client";

import React, { createContext, useContext, useState } from 'react';

// 1. Updated to match your Database column
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images: string | string[];
  image_url: string; // CHANGED from 'images' to 'image_url'
  category?: string;
  size?: string;
}

interface CartContextType {
  cartItems: CartItem[]; 
  addToCart: (product: any) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

 const addToCart = (product: any) => {
  setCartItems(prev => {
    const existing = prev.find(item => item.id === product.id);

    if (existing) {
      return prev.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + product.quantity }
          : item
      );
    }

    return [...prev, { ...product }];
  });
};

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
