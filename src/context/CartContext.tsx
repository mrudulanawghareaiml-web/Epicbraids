// src/context/CartContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Standardized Interface Name
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images: string; 
  category?: string;
  size?: string;
}

// 2. Updated Context Type to include clearCart
interface CartContextType {
  cartItems: CartItem[]; 
  addToCart: (product: any) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void; // <--- ADDED THIS
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
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // 3. Define the clearCart function logic
  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    // 4. Added clearCart to the Provider value
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
