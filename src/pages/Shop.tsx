import { useMemo, useState } from "react";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { CATEGORIES, PRODUCTS } from "../data/site";
import ProductCard from "../components/ProductCard";
import Reveal from "../components/Reveal";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

export default function Shop() {
  const { shopCategory, setShopCategory, navigate } = useStore();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("featured");

  const activeCategory = CATEGORIES.find((c) => c.id === shopCategory);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => (shopCategory === "all" ? true : p.category === shopCategory));
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) =>
        [p.name, p.tagline, p.categoryLabel, p.description, ...(p.shades ?? [])].join(" ").toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "name":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return list;
  }, [shopCategory, query, sort]);

  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden bg-espresso text-ivory">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <span className="absolute -bottom-8 right-0 font-display text-[16vw] leading-none font-semibold text-ivory/[0.04] select-none">
            Shop
          </span>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 pt-48 pb-20 sm:px-6 lg:px-8 lg:pt-56 lg:pb-24">
          <Reveal>
            <span className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow text-gold">The Saint James Collection</span>
            </span>
            <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.02] font-light text-balance sm:text-6xl lg:text-7xl">
              {activeCategory ? (
                <>
                  {activeCategory.name}
                  <span className="block font-display text-2xl font-normal text-champagne italic sm:text-3xl">
                    {activeCategory.tagline}
                  </span>
                </>
              ) : (
                <>
                  Shop the <span className="font-medium text-champagne italic">collection</span>
                </>
              )}
            </h1>
            <p className="mt-6 max-w-xl leading-relaxed font-light text-ivory/65">
              {activeCategory
                ? activeCategory.description
                : "Of the highest quality and the most vibrant of colors — cosmetics and skin care blended to perfection for women of color and exotic skin tones."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Toolbar */}
      <section className="sticky top-[104px] z-30 border-b border-ink/10 bg-ivory/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="scrollbar-none -mx-4 flex gap-1 overflow-x-auto px-4 py-3 sm:mx-0 sm:px-0">
            {[{ id: "all", name: "All Products" }, ...CATEGORIES].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setShopCategory(cat.id)}
                className={`shrink-0 px-4 py-2.5 text-[0.66rem] font-semibold tracking-[0.2em] whitespace-nowrap uppercase transition-all ${
                  shopCategory === cat.id ? "bg-espresso text-gold" : "text-cocoa-soft hover:bg-cream hover:text-espresso"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 border-t border-ink/8 py-3.5">
            <label className="relative min-w-52 flex-1 sm:max-w-xs">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-taupe" strokeWidth={1.75} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search lipstick, foundation, shades…"
                className="w-full border border-ink/15 bg-transparent py-2.5 pr-9 pl-10 text-sm font-light outline-none placeholder:text-taupe focus:border-golddeep"
                aria-label="Search products"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 text-taupe hover:text-espresso"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>
            <label className="relative flex items-center">
              <SlidersHorizontal className="pointer-events-none absolute left-3 h-4 w-4 text-taupe" strokeWidth={1.75} />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="cursor-pointer appearance-none border border-ink/15 bg-transparent py-2.5 pr-9 pl-10 text-sm font-light outline-none focus:border-golddeep"
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price · Low to High</option>
                <option value="price-desc">Price · High to Low</option>
                <option value="name">Name · A to Z</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-taupe" />
            </label>
            <p className="ml-auto hidden text-[0.66rem] tracking-[0.24em] text-taupe uppercase sm:block" aria-live="polite">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-display text-3xl text-espresso italic">Nothing matched your search</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed font-light text-cocoa-soft">
                Try another shade or product name — or call us at (310) 494-8094 and we will find your perfect match
                personally.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setShopCategory("all");
                }}
                className="mt-7 bg-espresso px-7 py-3.5 text-[0.66rem] font-semibold tracking-[0.24em] text-gold uppercase transition-colors hover:bg-gold hover:text-espresso"
              >
                View the Full Collection
              </button>
            </div>
          ) : (
            <div key={`${shopCategory}-${sort}-${query}`} className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Shade help band */}
      <section className="bg-espresso text-ivory">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <Reveal>
            <p className="eyebrow text-gold">Not Sure of Your Shade?</p>
            <h2 className="mt-4 max-w-xl font-display text-3xl leading-tight font-light text-balance sm:text-4xl">
              Every order includes a <span className="font-medium text-champagne italic">complimentary shade consultation</span> —
              because your perfect match matters.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("contact")}
                className="bg-gold px-7 py-3.5 text-[0.68rem] font-semibold tracking-[0.24em] text-espresso uppercase transition-colors hover:bg-ivory"
              >
                Ask Us Anything
              </button>
              <a
                href="tel:+13104948094"
                className="border border-ivory/30 px-7 py-3.5 text-[0.68rem] font-semibold tracking-[0.24em] text-ivory uppercase transition-all hover:border-gold hover:text-gold"
              >
                Call the Studio
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
