import { Eye, Plus } from "lucide-react";
import type { Product } from "../data/site";
import { formatPrice, useStore } from "../store/StoreContext";

const badgeStyles: Record<NonNullable<Product["badge"]>, string> = {
  Signature: "bg-gold text-espresso",
  "Best Loved": "bg-espresso text-champagne",
  "New Discovery": "bg-clay text-ivory",
};

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart, setQuickView } = useStore();
  const defaultShade = product.shades?.[0];

  return (
    <article
      className="group animate-fade-up flex h-full flex-col bg-ivory"
      style={{ animationDelay: `${(index % 8) * 70}ms` }}
    >
      <div className="relative overflow-hidden bg-cream">
        <button
          onClick={() => setQuickView(product)}
          className="block w-full cursor-pointer"
          aria-label={`View ${product.name}`}
        >
          <div className="aspect-[4/5] w-full overflow-hidden">
            <img
              src={product.image}
              alt={product.alt}
              loading="lazy"
              className="img-warm h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
            />
          </div>
        </button>
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 text-[0.58rem] font-semibold tracking-[0.22em] uppercase ${badgeStyles[product.badge]}`}
          >
            {product.badge}
          </span>
        )}
        <button
          onClick={() => setQuickView(product)}
          className="absolute right-3 bottom-3 flex translate-y-2 items-center gap-2 bg-espresso/90 px-3.5 py-2 text-[0.62rem] font-medium tracking-[0.22em] text-ivory uppercase opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-espresso"
        >
          <Eye className="h-3.5 w-3.5" strokeWidth={1.5} /> Quick view
        </button>
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <p className="text-[0.6rem] font-medium tracking-[0.3em] text-golddeep uppercase">{product.categoryLabel}</p>
        <button onClick={() => setQuickView(product)} className="mt-2 text-left">
          <h3 className="font-display text-[1.45rem] leading-tight font-medium text-espresso transition-colors group-hover:text-golddeep">
            {product.name}
          </h3>
        </button>
        <p className="mt-1 font-display text-[1.02rem] text-cocoa-soft italic">{product.tagline}</p>

        <div className="mt-auto flex items-end justify-between pt-5">
          <span className="text-[1.05rem] font-medium tracking-wide text-espresso">{formatPrice(product.price)}</span>
          <button
            onClick={() => addToCart(product, defaultShade)}
            className="flex items-center gap-2 border border-espresso px-4 py-2.5 text-[0.64rem] font-semibold tracking-[0.22em] text-espresso uppercase transition-all duration-300 hover:bg-espresso hover:text-gold"
            aria-label={`Add ${product.name} to beauty bag`}
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Add to Bag
          </button>
        </div>
      </div>
    </article>
  );
}
