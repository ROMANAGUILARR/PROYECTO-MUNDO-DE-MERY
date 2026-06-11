"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  sizeId: number;
  sizeName: string;
  sizeDimension: string;
  quantity: number;
};

type AddToCartInput = Omit<CartItem, "quantity"> & {
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  lastAddedAt: number;
  addItem: (item: AddToCartInput) => void;
  increaseItem: (productId: number, sizeId: number) => void;
  decreaseItem: (productId: number, sizeId: number) => void;
  removeItem: (productId: number, sizeId: number) => void;
  clearCart: () => void;
};

const CART_STORAGE_KEY = "mery-cart";
const CartContext = createContext<CartContextValue | null>(null);

function getItemKey(productId: number, sizeId: number) {
  return `${productId}-${sizeId}`;
}

function readStoredCart() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? (JSON.parse(storedCart) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [lastAddedAt, setLastAddedAt] = useState(0);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setItems(readStoredCart());
      setLoaded(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (loaded) {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, loaded]);

  const addItem = useCallback((item: AddToCartInput) => {
    setItems((currentItems) => {
      const incomingKey = getItemKey(item.productId, item.sizeId);
      const existingItem = currentItems.find(
        (currentItem) => getItemKey(currentItem.productId, currentItem.sizeId) === incomingKey,
      );

      if (!existingItem) {
        return [...currentItems, item];
      }

      return currentItems.map((currentItem) =>
        getItemKey(currentItem.productId, currentItem.sizeId) === incomingKey
          ? { ...currentItem, quantity: currentItem.quantity + item.quantity }
          : currentItem,
      );
    });
    setLastAddedAt(Date.now());
  }, []);

  const increaseItem = useCallback((productId: number, sizeId: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.productId === productId && item.sizeId === sizeId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  }, []);

  const decreaseItem = useCallback((productId: number, sizeId: number) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.productId === productId && item.sizeId === sizeId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((productId: number, sizeId: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.productId !== productId || item.sizeId !== sizeId),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);

    return {
      items,
      totalItems,
      totalAmount,
      lastAddedAt,
      addItem,
      increaseItem,
      decreaseItem,
      removeItem,
      clearCart,
    };
  }, [addItem, clearCart, decreaseItem, increaseItem, items, lastAddedAt, removeItem]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }

  return context;
}
