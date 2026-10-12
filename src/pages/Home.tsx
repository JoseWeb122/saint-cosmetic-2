import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Gem, Heart, Leaf, Sparkles } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { ARTICLES, BUSINESS, CATEGORIES, IMAGES, PRODUCTS, SERVICES } from "../data/site";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import ProductCard from "../components/ProductCard";

const MARQUEE_ITEMS = [
  "Blended to Perfection",
  "Designed for Women of Color",
  "Bold · Daring · Dynamic",
  "Natural Ingredients",
  "Beauty That Is Love From Within",
  "Beverly Hills Heritage",
];

function Hero() {
  const { navigate, openBooking } = useStore();
  const imgRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setOffset(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-espresso text-ivory">
      {/* ambient texture blocks */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 right-[38%] hidden h-full w-px bg-ivory/6 lg:block" />
        <div className="absolute top-0 right-[6%] hidden h-full w-px bg-ivory/6 lg:block" />
        <span className="absolute -bottom-10 left-0 font-display text-[26vw] leading-none font-semibold text-ivory/[0.035] select-none">
          SJ
        </span>
      </div>

      <div className="relative mx-auto grid max-w-7xl lg:min-h-[100svh] lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div className="flex flex-col justify-center px-4 pt-44 pb-16 sm:px-6 lg:px-8 lg:pt-40 lg:pb-24">
          <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
            <span className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow text-gold">Saint James Cosmetics · Est. Beverly Hills</span>
            </span>
          </div>

          <h1
            className="animate-fade-up mt-7 font-display text-[13.5vw] leading-[0.98] font-light text-balance sm:text-6xl lg:text-[4.6rem] xl:text-[5.2rem]"
            style={{ animationDelay: "220ms" }}
          >
            Beauty that is
            <span className="block font-medium text-champagne italic">love from within,</span>
            made visible.
          </h1>

          <p
            className="animate-fade-up mt-7 max-w-xl text-base leading-relaxed font-light text-ivory/70 sm:text-lg"
            style={{ animationDelay: "340ms" }}
          >
            An opulent line of cosmetics and skin care by Patricia Saint James — designed especially for women of color
            and exotic skin tones, in the most vibrant of colors, blended to perfection.
          </p>

          <div className="animate-fade-up mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: "460ms" }}>
            <button
              onClick={() => navigate("shop")}
              className="group flex items-center gap-3 bg-gold px-8 py-4 text-[0.7rem] font-semibold tracking-[0.26em] text-espresso uppercase transition-all duration-300 hover:bg-ivory"
            >
              Shop the Collection
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
            </button>
            <button
              onClick={() => openBooking()}
              className="group flex items-center gap-3 border border-ivory/30 px-8 py-4 text-[0.7rem] font-semibold tracking-[0.26em] text-ivory uppercase transition-all duration-300 hover:border-gold hover:text-gold"
            >
              Book a Private Lesson
            </button>
          </div>

          <div
            className="animate-fade-up mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t border-ivory/10 pt-7"
            style={{ animationDelay: "580ms" }}
          >
            {[
              ["For Women of Color", "Rich & exotic skin tones"],
              ["Natural Ingredients", "Discriminating selection"],
              ["Personal Service", "Mail order, by phone & studio"],
            ].map(([title, sub]) => (
              <div key={title}>
                <p className="font-display text-lg text-champagne italic">{title}</p>
                <p className="mt-0.5 text-[0.68rem] tracking-[0.18em] text-ivory/45 uppercase">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Imagery */}
        <div className="relative px-4 pb-16 sm:px-6 lg:px-0 lg:py-0">
          <div ref={imgRef} className="relative h-[70vh] overflow-hidden lg:h-full lg:min-h-[100svh]">
            <div
              className="absolute inset-0 will-change-transform"
              style={{ transform: `translateY(${offset * 0.12}px) scale(1.08)` }}
            >
              <img
                src={IMAGES.heroPortrait}
                alt={IMAGES.heroPortraitAlt}
                className="animate-kenburns img-warm h-full w-full object-cover object-[center_20%]"
              />
            </div>
            <div className="absolute inset-0 bg-espresso/10" aria-hidden="true" />
            {/* offset frame */}
            <div className="pointer-events-none absolute inset-4 border border-ivory/25 lg:inset-6" aria-hidden="true" />
            {/* caption card */}
            <figure className="absolute bottom-8 left-1/2 w-[86%] max-w-sm -translate-x-1/2 bg-ivory/95 p-5 text-espresso backdrop-blur lg:right-10 lg:left-auto lg:translate-x-0">
              <p className="text-[0.6rem] font-semibold tracking-[0.3em] text-golddeep uppercase">The Signature Lipstick</p>
              <figcaption className="mt-1.5 font-display text-xl leading-snug font-medium">
                “Bold, daring and dynamic — color that honors your skin.”
              </figcaption>
              <button
                onClick={() => navigate("shop", { category: "lips" })}
                className="mt-3 flex items-center gap-1.5 text-[0.66rem] font-semibold tracking-[0.24em] text-espresso uppercase transition-colors hover:text-golddeep"
              >
                Shop Lips & Tips <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden border-y border-gold/25 bg-cocoa py-4" aria-hidden="true">
      <div className="animate-marquee flex w-max items-center gap-10 pr-10">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-lg tracking-wide whitespace-nowrap text-champagne italic">{item}</span>
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-gold" strokeWidth={1.5} />
          </span>
        ))}
      </div>
    </div>
  );
}

function BrandIntro() {
  const { navigate, openBooking } = useStore();
  return (
    <section className="relative overflow-hidden bg-ivory">
      <span
        className="pointer-events-none absolute top-8 right-0 font-display text-[11rem] leading-none text-espresso/[0.04] italic select-none lg:text-[16rem]"
        aria-hidden="true"
      >
        Patricia
      </span>
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-36">
        <Reveal variant="left" className="relative">
          <div className="relative overflow-hidden">
            <img
              src={IMAGES.aboutStudio}
              alt={IMAGES.aboutStudioAlt}
              loading="lazy"
              className="img-warm aspect-[4/5] w-full object-cover lg:aspect-[5/6]"
            />
          </div>
          <div className="absolute -right-3 -bottom-8 hidden w-56 border-[10px] border-ivory shadow-xl sm:block lg:-right-8">
            <img src={IMAGES.flatlay} alt={IMAGES.flatlayAlt} loading="lazy" className="img-warm aspect-square w-full object-cover" />
          </div>
          <div className="absolute -bottom-6 left-6 bg-espresso px-6 py-5 text-ivory lg:left-10">
            <p className="font-display text-3xl text-gold italic">Beverly Hills</p>
            <p className="mt-1 text-[0.62rem] tracking-[0.28em] text-ivory/60 uppercase">Born of a beauty insider</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="flex items-center gap-3">
              <span className="h-px w-8 bg-golddeep" />
              <span className="eyebrow text-golddeep">Welcome to Saint James</span>
            </span>
            <h2 className="mt-5 font-display text-4xl leading-[1.08] font-medium text-balance text-espresso sm:text-5xl">
              Cosmetics for women of color — <span className="text-golddeep italic">and every woman</span> still searching
              for her true shade.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 leading-relaxed font-light text-cocoa-soft">
              Saint James Cosmetics is an opulent line of products designed especially for women of color by Patricia
              Saint James of Beverly Hills. Our collection is of the highest quality and the most vibrant of colors —
              formulated with the most discriminating selection of natural ingredients ever tested in the development
              of cosmetics.
            </p>
            <p className="mt-4 leading-relaxed font-light text-cocoa-soft">
              With years across make-up, skin-care and fashion, Patricia has taught countless clients to use simple
              industry techniques and basic products to enhance their own natural appearance. That same personal
              guidance lives in everything we make — and in every order we personally confirm.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-9 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("about")}
                className="group flex items-center gap-3 bg-espresso px-7 py-3.5 text-[0.68rem] font-semibold tracking-[0.24em] text-gold uppercase transition-colors hover:bg-gold hover:text-espresso"
              >
                Our Story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
              </button>
              <button
                onClick={() => openBooking("beauty-consultation")}
                className="border border-espresso/25 px-7 py-3.5 text-[0.68rem] font-semibold tracking-[0.24em] text-espresso uppercase transition-all hover:border-golddeep hover:text-golddeep"
              >
                Find My Shade
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CategoryGrid() {
  const { navigate } = useStore();
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <SectionHeading
          eyebrow="The Collection"
          title={
            <>
              Six rituals, <span className="text-golddeep italic">one woman</span>
            </>
          }
          description="From a flawless base to a gala-ready finish — every category of the Saint James collection, organized the way the original house intended."
        />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.id} delay={(i % 3) * 110}>
              <button
                onClick={() => navigate("shop", { category: cat.id })}
                className="group relative block w-full overflow-hidden text-left"
                aria-label={`Shop ${cat.name}`}
              >
                <div className="aspect-[4/3] overflow-hidden bg-sand sm:aspect-[5/4]">
                  <img
                    src={cat.image}
                    alt={cat.alt}
                    loading="lazy"
                    className="img-warm h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07]"
                  />
                </div>
                <div className="absolute inset-0 bg-espresso/45 transition-colors duration-500 group-hover:bg-espresso/55" aria-hidden="true" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-ivory">
                  <p className="text-[0.6rem] font-semibold tracking-[0.3em] text-champagne uppercase">{cat.tagline}</p>
                  <div className="mt-1.5 flex items-end justify-between gap-3">
                    <h3 className="font-display text-3xl font-medium">{cat.name}</h3>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-ivory/40 transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-espresso">
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                  </div>
                  <p className="mt-2 max-w-[42ch] text-[0.82rem] leading-relaxed font-light text-ivory/75 opacity-0 transition-all duration-500 group-hover:opacity-100 lg:translate-y-1 lg:group-hover:translate-y-0">
                    {cat.description}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SignatureProducts() {
  const { navigate } = useStore();
  const featured = PRODUCTS.filter((p) => p.badge === "Signature" || p.badge === "Best Loved").slice(0, 4);
  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="Signature & Best Loved"
            title={
              <>
                The icons of <span className="text-golddeep italic">the house</span>
              </>
            }
          />
          <Reveal delay={150}>
            <button
              onClick={() => navigate("shop")}
              className="group mb-1 flex items-center gap-2.5 border border-espresso px-6 py-3.5 text-[0.66rem] font-semibold tracking-[0.24em] text-espresso uppercase transition-all hover:bg-espresso hover:text-gold"
            >
              View All Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
            </button>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 100} className="h-full">
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const PILLARS = [
  {
    icon: Gem,
    title: "Blended for Rich Skin",
    text: "Designed especially for women of color and exotic skin tones — foundations and colors that honor golden, warm and deep undertones, never turning grey or ashy.",
  },
  {
    icon: Leaf,
    title: "Natural Ingredients",
    text: "Formulated with the most discriminating selection of natural ingredients tested in the development of cosmetics. Opulent, and considered.",
  },
  {
    icon: Sparkles,
    title: "The Most Vibrant Color",
    text: "Bold, daring and dynamic color with the pigment payoff deeper skin deserves — from a whisper of blush to a signature scarlet lip.",
  },
  {
    icon: Heart,
    title: "A Personal Boutique",
    text: "Every order is confirmed by a real conversation. Every client can learn directly from Patricia. This is beauty with a heartbeat, not a warehouse.",
  },
];

function WhySaintJames() {
  return (
    <section className="relative overflow-hidden bg-espresso text-ivory">
      <span
        className="pointer-events-none absolute -top-6 left-0 font-display text-[13rem] leading-none text-ivory/[0.03] italic select-none lg:text-[19rem]"
        aria-hidden="true"
      >
        Opulence
      </span>
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <SectionHeading
          dark
          eyebrow="Why Saint James"
          title={
            <>
              Opulence is easy. <span className="text-champagne italic">Intention</span> is rare.
            </>
          }
          description="Saint James was never built to follow the beauty industry. It was built by a woman inside it — for the women it kept overlooking."
        />
        <div className="mt-16 grid gap-px overflow-hidden border border-ivory/10 bg-ivory/10 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 110} className="h-full">
              <div className="group flex h-full flex-col bg-espresso p-8 transition-colors duration-500 hover:bg-cocoa">
                <pillar.icon className="h-8 w-8 text-gold" strokeWidth={1.25} />
                <h3 className="mt-6 font-display text-[1.55rem] leading-tight font-medium">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed font-light text-ivory/60">{pillar.text}</p>
                <span className="mt-auto pt-6 font-display text-lg text-gold/50 italic">0{i + 1}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesTeaser() {
  const { navigate, openBooking } = useStore();
  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <SectionHeading
          eyebrow="At the Studio"
          title={
            <>
              Learn it from <span className="text-golddeep italic">Patricia</span> herself
            </>
          }
          description="Products are only half the house. The other half is teaching — simple industry techniques, honest guidance, and beauty created for galas, fundraisers and the women who host them."
        />
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <Reveal key={service.id} delay={i * 120} className="h-full">
              <article className="group flex h-full flex-col border border-ink/10 bg-ivory transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_30px_50px_-30px_rgba(23,16,12,0.35)]">
                <div className="relative aspect-[16/10] overflow-hidden bg-cream">
                  <img
                    src={service.image}
                    alt={service.alt}
                    loading="lazy"
                    className="img-warm h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.06]"
                  />
                  <span className="absolute bottom-3 left-3 bg-espresso/85 px-3 py-1.5 text-[0.6rem] font-semibold tracking-[0.24em] text-champagne uppercase backdrop-blur">
                    {service.duration}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-[1.7rem] leading-tight font-medium text-espresso">{service.name}</h3>
                  <p className="mt-1 font-display text-[1.05rem] text-golddeep italic">{service.tagline}</p>
                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed font-light text-cocoa-soft">{service.description}</p>
                  <div className="mt-auto flex gap-3 pt-7">
                    <button
                      onClick={() => openBooking(service.id)}
                      className="flex-1 bg-espresso py-3.5 text-[0.66rem] font-semibold tracking-[0.22em] text-gold uppercase transition-colors hover:bg-gold hover:text-espresso"
                    >
                      Book Now
                    </button>
                    <button
                      onClick={() => navigate("services")}
                      className="border border-espresso/25 px-5 py-3.5 text-[0.66rem] font-semibold tracking-[0.22em] text-espresso uppercase transition-all hover:border-golddeep hover:text-golddeep"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ritual() {
  const { navigate } = useStore();
  const steps = [
    { n: "01", title: "Cleanse", text: "Skin Basics Gentle Cleanser removes the day without stripping what makes your skin yours." },
    { n: "02", title: "Nourish", text: "Skin Basics Moisture Crème, pressed into warm skin — the canvas beneath every beautiful face." },
    { n: "03", title: "Enhance", text: "Foundation, powder and color blended to perfection. Cosmetics enhance the beauty that is already within." },
  ];
  return (
    <section className="overflow-hidden bg-cream">
      <div className="mx-auto grid max-w-7xl items-center lg:grid-cols-2">
        <Reveal variant="scale" className="relative order-2 lg:order-1">
          <img src={IMAGES.ritual} alt={IMAGES.ritualAlt} loading="lazy" className="img-warm h-full min-h-[420px] w-full object-cover lg:min-h-[720px]" />
          <div className="absolute right-5 bottom-5 bg-ivory/95 px-5 py-4 backdrop-blur lg:right-8 lg:bottom-8">
            <p className="text-[0.6rem] font-semibold tracking-[0.28em] text-golddeep uppercase">Evening Ritual</p>
            <p className="mt-1 max-w-[24ch] font-display text-lg leading-snug text-espresso italic">
              A delicious Bath Enhancer, a candle, ten unhurried minutes.
            </p>
          </div>
        </Reveal>
        <div className="order-1 px-4 py-20 sm:px-6 lg:order-2 lg:px-14 lg:py-28">
          <Reveal>
            <span className="flex items-center gap-3">
              <span className="h-px w-8 bg-golddeep" />
              <span className="eyebrow text-golddeep">Skin Basics</span>
            </span>
            <h2 className="mt-5 font-display text-4xl leading-[1.08] font-medium text-balance text-espresso sm:text-5xl">
              The ritual beneath <span className="text-golddeep italic">the beauty</span>
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed font-light text-cocoa-soft">
              Saint James carries a wonderful line of skin-care products for all types of skin — because foundation is
              only ever as beautiful as the skin beneath it.
            </p>
          </Reveal>
          <div className="mt-10">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 120}>
                <div className="group flex gap-6 border-t border-espresso/12 py-6 last:border-b">
                  <span className="font-display text-2xl text-golddeep italic">{step.n}</span>
                  <div>
                    <h3 className="font-display text-2xl font-medium text-espresso">{step.title}</h3>
                    <p className="mt-1 max-w-md text-sm leading-relaxed font-light text-cocoa-soft">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <button
              onClick={() => navigate("shop", { category: "skin" })}
              className="group mt-9 flex items-center gap-3 bg-espresso px-7 py-3.5 text-[0.68rem] font-semibold tracking-[0.24em] text-gold uppercase transition-colors hover:bg-gold hover:text-espresso"
            >
              Shop Skin Basics
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function JournalTeaser() {
  const { navigate, setReadArticle } = useStore();
  const picks = ARTICLES.slice(0, 3);
  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            align="left"
            eyebrow="Beauty Tips & New Discoveries"
            title={
              <>
                From Patricia's <span className="text-golddeep italic">beauty journal</span>
              </>
            }
          />
          <Reveal delay={150}>
            <button
              onClick={() => navigate("journal")}
              className="group mb-1 flex items-center gap-2.5 border border-espresso px-6 py-3.5 text-[0.66rem] font-semibold tracking-[0.24em] text-espresso uppercase transition-all hover:bg-espresso hover:text-gold"
            >
              All Articles
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
            </button>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
          {picks.map((article, i) => (
            <Reveal key={article.id} delay={i * 110}>
              <article className="group cursor-pointer" onClick={() => { navigate("journal"); setReadArticle(article.id); }}>
                <div className="aspect-[4/3] overflow-hidden bg-cream">
                  <img
                    src={article.image}
                    alt={article.alt}
                    loading="lazy"
                    className="img-warm h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.06]"
                  />
                </div>
                <p className="mt-5 flex items-center gap-3 text-[0.62rem] font-semibold tracking-[0.26em] text-golddeep uppercase">
                  {article.category} <span className="h-px flex-1 bg-ink/10" /> {article.readTime}
                </p>
                <h3 className="mt-3 font-display text-[1.6rem] leading-snug font-medium text-espresso transition-colors group-hover:text-golddeep">
                  {article.title}
                </h3>
                <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed font-light text-cocoa-soft">{article.excerpt}</p>
                <span className="mt-4 flex items-center gap-2 text-[0.66rem] font-semibold tracking-[0.24em] text-espresso uppercase">
                  Read the Article
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const { navigate, openBooking } = useStore();
  return (
    <section className="relative overflow-hidden bg-espresso text-ivory">
      <img
        src={IMAGES.portraitGold}
        alt="Sophisticated portrait of a woman adorned with gold jewelry"
        loading="lazy"
        className="img-warm absolute inset-0 h-full w-full object-cover object-[center_25%] opacity-30"
      />
      <div className="absolute inset-0 bg-espresso/55" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-4 py-28 text-center sm:px-6 lg:py-40">
        <Reveal>
          <p className="eyebrow text-gold">Begin Your Saint James Journey</p>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] font-light text-balance sm:text-6xl">
            Your shade exists. <span className="font-medium text-champagne italic">It was blended for you.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed font-light text-ivory/70">
            Shop the collection, or sit with Patricia and learn the techniques that make it yours. Either way — your
            experience with Saint James will be an easy, beauty-enhancing journey.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("shop")}
              className="group flex items-center gap-3 bg-gold px-8 py-4 text-[0.7rem] font-semibold tracking-[0.26em] text-espresso uppercase transition-colors hover:bg-ivory"
            >
              Shop Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
            </button>
            <a
              href={BUSINESS.phoneHref}
              className="border border-ivory/40 px-8 py-4 text-[0.7rem] font-semibold tracking-[0.26em] text-ivory uppercase transition-all hover:border-gold hover:text-gold"
            >
              Call {BUSINESS.phone}
            </a>
            <button
              onClick={() => openBooking()}
              className="px-2 py-4 text-[0.7rem] font-semibold tracking-[0.26em] text-champagne uppercase underline decoration-gold/50 underline-offset-8 transition-colors hover:text-gold"
            >
              Book a Lesson
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <BrandIntro />
      <CategoryGrid />
      <SignatureProducts />
      <WhySaintJames />
      <ServicesTeaser />
      <Ritual />
      <JournalTeaser />
      <FinalCta />
    </>
  );
}
