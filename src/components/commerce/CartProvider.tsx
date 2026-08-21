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

import { PRODUCT_BY_ID, type StoreProduct } from "@/lib/products";

const STORAGE_KEY = "emt-demo-cart-v1";
const STORAGE_VERSION = 1;

type StoredCartItem = {
  productId: string;
  quantity: number;
};

export type CartLine = StoredCartItem & {
  product: StoreProduct;
  lineTotal: number;
};

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  hydrated: boolean;
  drawerOpen: boolean;
  addItem: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<StoredCartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const hydrationTimer = window.setTimeout(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed: unknown = JSON.parse(raw);
          if (isStoredCart(parsed)) {
            setItems(
              parsed.items.filter((item) => PRODUCT_BY_ID.has(item.productId)),
            );
          }
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(hydrationTimer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: STORAGE_VERSION, items }),
    );
  }, [hydrated, items]);

  const addItem = useCallback((productId: string, quantity = 1) => {
    const safeQuantity = Math.max(1, Math.floor(quantity));
    setItems((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (!existing) return [...current, { productId, quantity: safeQuantity }];
      return current.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + safeQuantity }
          : item,
      );
    });
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const safeQuantity = Math.floor(quantity);
    setItems((current) =>
      safeQuantity < 1
        ? current.filter((item) => item.productId !== productId)
        : current.map((item) =>
            item.productId === productId
              ? { ...item, quantity: safeQuantity }
              : item,
          ),
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((current) =>
      current.filter((item) => item.productId !== productId),
    );
  }, []);

  const lines = useMemo(
    () =>
      items.flatMap((item) => {
        const product = PRODUCT_BY_ID.get(item.productId);
        return product
          ? [{ ...item, product, lineTotal: product.price * item.quantity }]
          : [];
      }),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
      subtotal: lines.reduce((sum, line) => sum + line.lineTotal, 0),
      hydrated,
      drawerOpen,
      addItem,
      setQuantity,
      removeItem,
      openCart: () => setDrawerOpen(true),
      closeCart: () => setDrawerOpen(false),
    }),
    [
      addItem,
      drawerOpen,
      hydrated,
      lines,
      removeItem,
      setQuantity,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}

function isStoredCart(
  value: unknown,
): value is { version: 1; items: StoredCartItem[] } {
  if (!value || typeof value !== "object") return false;
  const cart = value as { version?: unknown; items?: unknown };
  if (cart.version !== STORAGE_VERSION || !Array.isArray(cart.items)) {
    return false;
  }

  return cart.items.every(
    (item) =>
      item &&
      typeof item === "object" &&
      typeof (item as StoredCartItem).productId === "string" &&
      Number.isInteger((item as StoredCartItem).quantity) &&
      (item as StoredCartItem).quantity > 0,
  );
}
