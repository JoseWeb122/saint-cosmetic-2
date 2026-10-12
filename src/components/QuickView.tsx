import { useEffect, useState } from "react";
import { Check, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { formatPrice, useStore } from "../store/StoreContext";

export default function QuickView() {
  const { quickView, setQuickView, addToCart, setCartOpen } = useStore();
  const [shade, setShade] = useState<string | undefined>(undefined);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (quickView) {
      setShade(quickView.shades?.[0]);
      setQty(1);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [quickView]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setQuickView(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setQuickView]);

  if (!quickView) return null;
  const product = quickView;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={product.name}>
      <button
        className="animate-fade-in absolute inset-0 bg-espresso/70 backdrop-blur-sm"
        onClick={() => setQuickView(null)}
        aria-label="Close quick view"
      />
      <div className="animate-slide-up relative max-h-[92vh] w-full max-w-4xl overflow-y-auto bg-ivory shadow-2xl">
        <button
          onClick={() => setQuickView(null)}
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center bg-espresso text-ivory transition-colors hover:bg-gold hover:text-espresso"
          aria-label="Close"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative bg-cream">
            <img src={product.image} alt={product.alt} className="img-warm h-64 w-full object-cover sm:h-80 md:h-full md:min-h-[560px]" />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-gold px-3 py-1 text-[0.6rem] font-semibold tracking-[0.22em] text-espresso uppercase">
                {product.badge}
              </span>
            )}
          </div>

          <div className="flex flex-col p-6 sm:p-9">
            <p className="text-[0.62rem] font-medium tracking-[0.3em] text-golddeep uppercase">{product.categoryLabel}</p>
            <h3 className="mt-3 font-display text-3xl leading-tight font-medium text-espresso sm:text-4xl">{product.name}</h3>
            <p className="mt-2 font-display text-lg text-cocoa-soft italic">{product.tagline}</p>
            <p className="mt-5 text-[1.35rem] font-medium text-espresso">{formatPrice(product.price)}</p>

            <p className="mt-4 text-sm leading-relaxed font-light text-ink/80">{product.description}</p>

            <ul className="mt-5 space-y-2">
              {product.benefits.map((b) => (
                <li key={b} className="flex gap-2.5 text-sm font-light text-ink/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-golddeep" strokeWidth={2} />
                  {b}
                </li>
              ))}
            </ul>

            {product.shades && (
              <div className="mt-6">
                <p className="text-[0.64rem] font-semibold tracking-[0.26em] text-espresso uppercase">
                  Shade — <span className="text-golddeep normal-case">{shade}</span>
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.shades.map((s) => (
                    <button
                      key={s}
                      onClick={() => setShade(s)}
                      className={`border px-3 py-2 text-[0.72rem] tracking-wide transition-all ${
                        shade === s
                          ? "border-espresso bg-espresso text-gold"
                          : "border-ink/20 text-ink/70 hover:border-golddeep hover:text-espresso"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex items-stretch gap-3">
              <div className="flex items-center border border-ink/20">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="flex h-full w-10 items-center justify-center text-ink/60 transition-colors hover:text-golddeep"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm font-medium">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="flex h-full w-10 items-center justify-center text-ink/60 transition-colors hover:text-golddeep"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => {
                  addToCart(product, shade, qty);
                  setQuickView(null);
                  setCartOpen(true);
                }}
                className="flex flex-1 items-center justify-center gap-2.5 bg-espresso py-3.5 text-[0.7rem] font-semibold tracking-[0.24em] text-gold uppercase transition-colors hover:bg-gold hover:text-espresso"
              >
                <ShoppingBag className="h-4 w-4" strokeWidth={1.75} />
                Add to Bag — {formatPrice(product.price * qty)}
              </button>
            </div>

            <p className="mt-5 border-t border-ink/10 pt-4 text-xs leading-relaxed font-light text-taupe">
              Saint James is a personal mail-order boutique. We confirm every order with you directly to verify shades
              and arrange payment & shipping. Questions? Call{" "}
              <a href="tel:+13104948094" className="text-golddeep underline underline-offset-2">
                (310) 494-8094
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
