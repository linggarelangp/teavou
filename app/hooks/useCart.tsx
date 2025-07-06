"use client";
import { createContext, useContext, useEffect, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
type CartItem = Partial<any> & { qty: number };

type CartContextType = {
    cart: CartItem[];
    totalQty: number;
    addToCart: (item: Partial<any>) => void;
    updateQty: (productId: string, newQty: number) => void;
    removeFromCart: (productId: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("cart");
        if (stored) {
            setCart(JSON.parse(stored));
        }
    }, []);

    const saveCart = (updatedCart: CartItem[]) => {
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
    };

    const addToCart = (product: Partial<any>) => {
        setCart((prev) => {
            const existing = prev.find((p) => p.ID === product.ID);
            let updatedCart: CartItem[];

            if (existing) {
                updatedCart = prev.map((item) =>
                    item.ID === product.ID
                        ? { ...item, qty: (item.qty || 1) + 1 }
                        : item
                );
            } else {
                updatedCart = [...prev, { ...product, qty: 1 }];
            }

            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const updateQty = (productId: string, newQty: number) => {
        if (newQty <= 0) return removeFromCart(productId);
        const updatedCart = cart.map((item) =>
            item.ID === productId ? { ...item, qty: newQty } : item
        );
        saveCart(updatedCart);
    };

    const removeFromCart = (productId: string) => {
        const updatedCart = cart.filter((item) => item.ID !== productId);
        saveCart(updatedCart);
    };

    const totalQty = cart.reduce((acc, item) => acc + (item.qty || 1), 0);

    return (
        <CartContext.Provider
            value={{ cart, totalQty, addToCart, updateQty, removeFromCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }
    return context;
};
