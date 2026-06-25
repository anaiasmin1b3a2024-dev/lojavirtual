import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
};

export type CartItem = Product & {
  cartId: string; // Unique ID for items in cart, allows multiple identical products
  size?: string;
};

type CartContextData = {
  cart: CartItem[];
  addToCart: (product: Product, size?: string) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
  total: number;
};

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, size?: string) => {
    const newItem: CartItem = {
      ...product,
      cartId: Math.random().toString(36).substring(7),
      size,
    };
    setCart((prev) => [...prev, newItem]);
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
