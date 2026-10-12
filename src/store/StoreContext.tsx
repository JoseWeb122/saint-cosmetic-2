import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "../data/site";

export type Page = "home" | "shop" | "services" | "about" | "journal" | "contact";

export interface CartItem {
  productId: string;
  shade?: string;
  qty: number;
}

interface Toast {
  id: number;
  title: string;
  message: string;
}

interface StoreState {
  page: Page;
  navigate: (page: Page, opts?: { category?: string; productId?: string }) => void;
  shopCategory: string;
  setShopCategory: (c: string) => void;
  cart: CartItem[];
  addToCart: (product: Product, shade?: string, qty?: number) => void;
  removeFromCart: (productId: string, shade?: string) => void;
  setQty: (productId: string, shade: string | undefined, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  quickView: Product | null;
  setQuickView: (p: Product | null) => void;
  bookingService: string | null;
  openBooking: (serviceId?: string) => void;
  closeBooking: () => void;
  toasts: Toast[];
  pushToast: (title: string, message: string) => void;
  readArticle: string | null;
  setReadArticle: (id: string | null) => void;
}

const StoreContext = createContext<StoreState | null>(null);

const CART_KEY = "sjc-cart-v1";

export function StoreProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<Page>("home");
  const [shopCategory, setShopCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [bookingService, setBookingService] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [readArticle, setReadArticle] = useState<string | null>(null);
  const toastId = useRef(0);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* storage unavailable */
    }
  }, [cart]);

  const pushToast = useCallback((title: string, message: string) => {
    const id = ++toastId.current;
    setToasts((t) => [...t, { id, title, message }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 4200);
  }, []);

  const navigate = useCallback((next: Page, opts?: { category?: string; productId?: string }) => {
    if (opts?.category) setShopCategory(opts.category);
    setPage(next);
    setReadArticle(null);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    });
  }, []);

  const addToCart = useCallback(
    (product: Product, shade?: string, qty = 1) => {
      setCart((prev) => {
        const idx = prev.findIndex((i) => i.productId === product.id && i.shade === shade);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
          return copy;
        }
        return [...prev, { productId: product.id, shade, qty }];
      });
      pushToast("Added to your beauty bag", shade ? `${product.name} — ${shade}` : product.name);
    },
    [pushToast]
  );

  const removeFromCart = useCallback((productId: string, shade?: string) => {
    setCart((prev) => prev.filter((i) => !(i.productId === productId && i.shade === shade)));
  }, []);

  const setQty = useCallback((productId: string, shade: string | undefined, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => !(i.productId === productId && i.shade === shade))
        : prev.map((i) => (i.productId === productId && i.shade === shade ? { ...i, qty } : i))
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const openBooking = useCallback((serviceId?: string) => {
    setBookingService(serviceId ?? "makeup-lesson");
  }, []);
  const closeBooking = useCallback(() => setBookingService(null), []);

  const cartCount = useMemo(() => cart.reduce((sum, i) => sum + i.qty, 0), [cart]);

  const value: StoreState = {
    page,
    navigate,
    shopCategory,
    setShopCategory,
    cart,
    addToCart,
    removeFromCart,
    setQty,
    clearCart,
    cartCount,
    cartOpen,
    setCartOpen,
    quickView,
    setQuickView,
    bookingService,
    openBooking,
    closeBooking,
    toasts,
    pushToast,
    readArticle,
    setReadArticle,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export const formatPrice = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: n % 1 === 0 ? 0 : 2 });
