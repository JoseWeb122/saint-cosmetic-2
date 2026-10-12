import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { BUSINESS, CATEGORIES } from "../data/site";

export function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.7V11H8.3v3h2.4v7h2.8Z" />
    </svg>
  );
}

export default function Footer() {
  const { navigate, openBooking } = useStore();

  return (
    <footer className="bg-espresso text-ivory">
      {/* Motto band */}
      <div className="border-b border-ivory/10">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <p className="eyebrow mb-4 text-gold">The Saint James Motto</p>
          <p className="mx-auto max-w-3xl font-display text-3xl leading-snug font-light italic sm:text-4xl lg:text-[2.75rem]">
            “Beauty that is love from within — this is our motto, and what we believe is the way you should live your
            life.”
          </p>
          <p className="mt-5 text-[0.7rem] tracking-[0.3em] text-ivory/50 uppercase">
            Patricia Saint James · Founder
          </p>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center border border-gold/60 font-display text-lg text-gold">
              SJ
            </span>
            <span className="leading-none">
              <span className="block font-display text-xl font-medium tracking-[0.08em]">SAINT JAMES</span>
              <span className="mt-1 block text-[0.58rem] font-medium tracking-[0.42em] text-champagne uppercase">
                Cosmetics
              </span>
            </span>
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed font-light text-ivory/65">
            An opulent line of cosmetics and skin care designed especially for women of color and exotic skin tones —
            of the highest quality, in the most vibrant of colors, blended to perfection.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={BUSINESS.facebook}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center border border-ivory/20 text-ivory/80 transition-all hover:border-gold hover:text-gold"
              aria-label="Saint James Cosmetics on Facebook"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href={BUSINESS.emailHref}
              className="flex h-10 w-10 items-center justify-center border border-ivory/20 text-ivory/80 transition-all hover:border-gold hover:text-gold"
              aria-label="Email Saint James Cosmetics"
            >
              <Mail className="h-4 w-4" strokeWidth={1.5} />
            </a>
            <a
              href={BUSINESS.phoneHref}
              className="flex h-10 w-10 items-center justify-center border border-ivory/20 text-ivory/80 transition-all hover:border-gold hover:text-gold"
              aria-label="Call Saint James Cosmetics"
            >
              <Phone className="h-4 w-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <nav aria-label="Explore">
          <h3 className="eyebrow text-gold">Explore</h3>
          <ul className="mt-6 space-y-3 text-sm font-light">
            {[
              { label: "Home", action: () => navigate("home") },
              { label: "Shop the Collection", action: () => navigate("shop") },
              { label: "Services & Lessons", action: () => navigate("services") },
              { label: "About Patricia", action: () => navigate("about") },
              { label: "Beauty Journal", action: () => navigate("journal") },
              { label: "Contact & Ordering", action: () => navigate("contact") },
              { label: "Book a Private Lesson", action: () => openBooking() },
            ].map((item) => (
              <li key={item.label}>
                <button onClick={item.action} className="group flex items-center gap-1 text-ivory/70 transition-colors hover:text-gold">
                  {item.label}
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Shop categories">
          <h3 className="eyebrow text-gold">The Collection</h3>
          <ul className="mt-6 space-y-3 text-sm font-light">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => navigate("shop", { category: c.id })}
                  className="group flex items-center gap-1 text-ivory/70 transition-colors hover:text-gold"
                >
                  {c.name}
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="eyebrow text-gold">Visit & Order</h3>
          <ul className="mt-6 space-y-4 text-sm font-light text-ivory/70">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
              <span>
                Saint James Cosmetics, LLC
                <br />
                {BUSINESS.city}
                <br />
                <span className="text-ivory/45">Consultations by appointment · Mail order nationwide</span>
              </span>
            </li>
            <li>
              <a href={BUSINESS.phoneHref} className="flex gap-3 transition-colors hover:text-gold">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                {BUSINESS.phone}
              </a>
            </li>
            <li>
              <a href={BUSINESS.emailHref} className="flex gap-3 transition-colors hover:text-gold">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                {BUSINESS.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-[0.66rem] tracking-[0.22em] text-ivory/40 uppercase sm:px-6 md:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} Saint James Cosmetics, LLC · All rights reserved</p>
          <p className="font-display text-sm tracking-normal normal-case italic text-champagne/70">
            Bold · Daring · Dynamic — Blended to Perfection
          </p>
        </div>
      </div>
    </footer>
  );
}
