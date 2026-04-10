"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, CartState, Product } from "@/types";

const STORAGE_KEY = "kulto3d_cart_v1";

type Action =
  | { type: "ADD"; product: Product; quantity?: number }
  | { type: "REMOVE"; productId: string }
  | { type: "SET_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; state: CartState };

const initialState: CartState = { items: [] };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "HYDRATE":
      return action.state;

    case "ADD": {
      const qty = action.quantity ?? 1;
      const existing = state.items.find(
        (i) => i.product.id === action.product.id,
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + qty }
              : i,
          ),
        };
      }
      return {
        items: [...state.items, { product: action.product, quantity: qty }],
      };
    }

    case "REMOVE":
      return {
        items: state.items.filter((i) => i.product.id !== action.productId),
      };

    case "SET_QUANTITY": {
      if (action.quantity <= 0) {
        return {
          items: state.items.filter((i) => i.product.id !== action.productId),
        };
      }
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId
            ? { ...i, quantity: action.quantity }
            : i,
        ),
      };
    }

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  hydrated: boolean;
  add: (product: Product, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        if (parsed?.items && Array.isArray(parsed.items)) {
          dispatch({ type: "HYDRATE", state: parsed });
        }
      }
    } catch (err) {
      console.error("[kulto3d:cart] hydrate error", err);
    }
    setHydrated(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.error("[kulto3d:cart] persist error", err);
    }
  }, [state, hydrated]);

  const count = state.items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = state.items.reduce(
    (acc, i) => acc + i.product.price * i.quantity,
    0,
  );

  const value: CartContextValue = {
    items: state.items,
    count,
    subtotal,
    hydrated,
    add: (product, quantity) => dispatch({ type: "ADD", product, quantity }),
    remove: (productId) => dispatch({ type: "REMOVE", productId }),
    setQuantity: (productId, quantity) =>
      dispatch({ type: "SET_QUANTITY", productId, quantity }),
    clear: () => dispatch({ type: "CLEAR" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return ctx;
}
