import { useEffect, useState } from "react";
import { Menu, Phone, ShoppingBag, X } from "lucide-react";
import { useStore } from "../store/StoreContext";
import type { Page } from "../store/StoreContext";
import { BUSINESS } from "../data/site";

const LINKS: { page: Page; label: string }[] = [
  { page: "home", label: "Home" },
  { page: "shop", label: "Shop" },
  { page: "services", label: "Services" },
  { page: "about", label: "About" },
  { page: "journal", label: "Beauty Journal" },
  { page: "contact", label: "Contact" },
];

export default function Navbar() {
  const { page, navigate, cartCount, setCartOpen, openBooking } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const go = (p: Page) => {
    setMobileOpen(false);
    navigate(p);
  };

  const solid = scrolled || mobileOpen;

  return (
    <>
      {/* Announcement bar */}
      <div className="fixed inset-x-0 top-0 z-[60] bg-espresso text-ivory">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-center gap-3 px-4 text-center">
          <span className="hidden h-px w-10 bg-gold/60 sm:block" />
          <p className="text-[0.6rem] font-medium tracking-[0.24em] whitespace-nowrap uppercase sm:text-[0.66rem] sm:tracking-[0.28em]">
            <span className="sm:hidden">Complimentary shade consultation · {BUSINESS.phone}</span>
            <span className="hidden sm:inline">Complimentary shade consultation with every order · Call {BUSINESS.phone}</span>
          </p>
          <span className="hidden h-px w-10 bg-gold/60 sm:block" />
        </div>
      </div>

      <header
        className={`fixed inset-x-0 top-9 z-[55] transition-all duration-500 ${
          solid ? "bg-ivory/95 shadow-[0_1px_0_rgba(51,36,26,0.08),0_18px_40px_-24px_rgba(23,16,12,0.35)] backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          {/* Brand */}
          <button
            onClick={() => go("home")}
            className="group flex items-center gap-3 text-left"
            aria-label="Saint James Cosmetics — home"
          >
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center border font-display text-lg tracking-wide transition-colors duration-500 ${
                solid ? "border-golddeep/50 text-golddeep" : "border-gold/70 text-gold"
              }`}
            >
              SJ
            </span>
            <span className="leading-none">
              <span
                className={`block font-display text-[1.35rem] font-medium tracking-[0.08em] transition-colors duration-500 ${
                  solid ? "text-espresso" : "text-ivory"
                }`}
              >
                SAINT JAMES
              </span>
              <span
                className={`mt-1 block text-[0.58rem] font-medium tracking-[0.42em] uppercase transition-colors duration-500 ${
                  solid ? "text-golddeep" : "text-champagne"
                }`}
              >
                Cosmetics
              </span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {LINKS.map((link) => (
              <button
                key={link.page}
                onClick={() => go(link.page)}
                className={`link-sweep text-[0.72rem] font-medium tracking-[0.22em] uppercase transition-colors duration-500 ${
                  page === link.page ? "active " : ""
                }${solid ? "text-ink hover:text-golddeep" : "text-ivory/90 hover:text-champagne"}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={BUSINESS.phoneHref}
              className={`hidden items-center gap-2 text-[0.72rem] font-medium tracking-[0.18em] uppercase transition-colors duration-500 xl:flex ${
                solid ? "text-ink hover:text-golddeep" : "text-ivory/90 hover:text-champagne"
              }`}
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.75} />
              {BUSINESS.phone}
            </a>
            <button
              onClick={() => openBooking()}
              className="hidden bg-gold px-5 py-2.5 text-[0.68rem] font-semibold tracking-[0.24em] text-espresso uppercase transition-all duration-300 hover:bg-espresso hover:text-gold md:block"
            >
              Book a Lesson
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className={`relative flex h-10 w-10 items-center justify-center border transition-colors duration-500 ${
                solid
                  ? "border-ink/15 text-ink hover:border-golddeep hover:text-golddeep"
                  : "border-ivory/30 text-ivory hover:border-gold hover:text-gold"
              }`}
              aria-label={`Open beauty bag, ${cartCount} items`}
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center bg-gold px-1 text-[0.62rem] font-semibold text-espresso">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`flex h-10 w-10 items-center justify-center border transition-colors duration-500 lg:hidden ${
                solid ? "border-ink/15 text-ink" : "border-ivory/30 text-ivory"
              }`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" strokeWidth={1.5} /> : <Menu className="h-5 w-5" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[54] bg-espresso transition-all duration-500 lg:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-between px-6 pt-36 pb-10">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {LINKS.map((link, i) => (
              <button
                key={link.page}
                onClick={() => go(link.page)}
                style={{ transitionDelay: mobileOpen ? `${120 + i * 60}ms` : "0ms" }}
                className={`border-b border-ivory/10 py-4 text-left font-display text-3xl font-light tracking-wide transition-all duration-500 ${
                  mobileOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                } ${page === link.page ? "text-gold" : "text-ivory"}`}
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className={`transition-all delay-500 duration-500 ${mobileOpen ? "opacity-100" : "opacity-0"}`}>
            <button
              onClick={() => {
                setMobileOpen(false);
                openBooking();
              }}
              className="mb-5 w-full bg-gold py-4 text-[0.72rem] font-semibold tracking-[0.26em] text-espresso uppercase transition-colors hover:bg-champagne"
            >
              Book a Private Lesson
            </button>
            <div className="flex items-center justify-between text-ivory/70">
              <a href={BUSINESS.phoneHref} className="flex items-center gap-2 text-sm tracking-wider">
                <Phone className="h-4 w-4 text-gold" strokeWidth={1.5} /> {BUSINESS.phone}
              </a>
              <span className="font-display text-sm text-champagne italic">{BUSINESS.motto}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
