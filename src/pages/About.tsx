import { ArrowRight, Award, HandHeart, Mic2, Shirt, Sparkles } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { BUSINESS, IMAGES } from "../data/site";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

const CREDENTIALS = [
  {
    icon: Award,
    title: "Certified Expertise",
    text: "Training and certifications in cosmetology and personal image development — the formal craft behind the artistry.",
  },
  {
    icon: Sparkles,
    title: "Beauty Industry Veteran",
    text: "Years across make-up, skin-care and fashion in Beverly Hills — and a teacher's gift for making professional technique simple.",
  },
  {
    icon: Mic2,
    title: "Spokesperson & Host",
    text: "A spokesperson and mistress of ceremony for numerous charity events, benefits and fundraisers — and a producer of fashion and beauty shows for all ages.",
  },
  {
    icon: HandHeart,
    title: "Beauty with Purpose",
    text: "Board member of The Jonathan Foundation, contributing services and products to fundraising and outreach initiatives for families.",
  },
];

export default function About() {
  const { navigate, openBooking } = useStore();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-espresso text-ivory">
        <div className="relative mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="flex flex-col justify-center px-4 pt-48 pb-16 sm:px-6 lg:px-8 lg:pt-56 lg:pb-28">
            <Reveal>
              <span className="flex items-center gap-3">
                <span className="h-px w-10 bg-gold" />
                <span className="eyebrow text-gold">About Saint James</span>
              </span>
              <h1 className="mt-6 font-display text-5xl leading-[1.02] font-light text-balance sm:text-6xl lg:text-[4.2rem]">
                Meet <span className="font-medium text-champagne italic">Patricia</span> Saint James
              </h1>
              <p className="mt-6 max-w-lg leading-relaxed font-light text-ivory/65">
                Founder of Saint James Cosmetics — a Beverly Hills beauty insider who built the line she could never
                find: opulent cosmetics designed especially for women of color, made with natural ingredients and the
                most vibrant of colors.
              </p>
              <p className="mt-5 font-display text-2xl text-champagne italic">“Beauty that is love from within.”</p>
            </Reveal>
          </div>
          <Reveal variant="scale" className="relative min-h-[380px] lg:min-h-[640px]">
            <img
              src={IMAGES.portraitGold}
              alt="Elegant portrait of a woman with gold jewelry against a golden backdrop — the Saint James muse"
              className="img-warm absolute inset-0 h-full w-full object-cover object-[center_20%]"
            />
            <div className="absolute inset-0 bg-espresso/15" aria-hidden="true" />
            <div className="absolute bottom-6 left-6 bg-ivory/95 px-5 py-4 text-espresso backdrop-blur">
              <p className="text-[0.6rem] font-semibold tracking-[0.28em] text-golddeep uppercase">Founder & CEO</p>
              <p className="mt-0.5 font-display text-xl font-medium">Patricia Saint James</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal variant="left">
              <div className="lg:sticky lg:top-40">
                <span className="flex items-center gap-3">
                  <span className="h-px w-8 bg-golddeep" />
                  <span className="eyebrow text-golddeep">Our Story</span>
                </span>
                <h2 className="mt-5 font-display text-4xl leading-[1.08] font-medium text-balance text-espresso sm:text-5xl">
                  We are <span className="text-golddeep italic">innovative</span> — because she had to be.
                </h2>
                <div className="relative mt-10 overflow-hidden">
                  <img
                    src={IMAGES.aboutStudio}
                    alt={IMAGES.aboutStudioAlt}
                    loading="lazy"
                    className="img-warm aspect-[4/3] w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
            <div className="space-y-6 text-[1.02rem] leading-relaxed font-light text-cocoa-soft">
              <Reveal>
                <p>
                  <span className="font-display text-2xl text-espresso italic">Saint James Cosmetics</span> is an
                  opulent line of products designed especially for women of color by Patricia Saint James of Beverly
                  Hills. Our collection is of the highest quality and the most vibrant of colors. These products have
                  been formulated to include the most discriminating selection of natural ingredients ever tested in
                  the development of cosmetics. We are innovative!
                </p>
              </Reveal>
              <Reveal delay={80}>
                <p>
                  Patricia has several years in the beauty industry, from make-up, skin-care to fashion. She has taught
                  many of her clients how to utilize simple industry techniques and basic products to enhance their own
                  natural appearance. Her background in this business, coupled with her passion for simple, quality
                  products, will make your experience with Saint James Cosmetics an easy, beauty-enhancing journey.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <p>
                  Cosmetics are a wonderful way to enhance your inner beauty — and Saint James carries a wonderful line
                  of skin-care products for all types of skin, alongside delicious bath enhancers. From foundations
                  blended to perfection, to bold lipsticks and evening glitter, every product begins with the same
                  question: <em className="font-display text-espresso">will this honor the woman wearing it?</em>
                </p>
              </Reveal>
              <Reveal delay={160}>
                <div className="border-l-2 border-gold bg-cream px-7 py-6">
                  <p className="font-display text-[1.45rem] leading-snug text-espresso italic">
                    “This is our motto, and what we believe is the way you should live your life — beauty that is love
                    from within.”
                  </p>
                  <p className="mt-3 text-[0.64rem] font-semibold tracking-[0.28em] text-golddeep uppercase">
                    The Saint James Philosophy
                  </p>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <p>
                  Beyond the studio, Ms. Saint James is a spokesperson and mistress of ceremony for numerous charity
                  events, benefits and fundraisers. One of her favorite pastimes is producing successful fashion and
                  beauty shows for those of all ages to enjoy — because beauty, shared generously, has a way of coming
                  back multiplied.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
          <SectionHeading
            eyebrow="Why Clients Trust Patricia"
            title={
              <>
                A lifetime in beauty, <span className="text-golddeep italic">at your service</span>
              </>
            }
          />
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CREDENTIALS.map((cred, i) => (
              <Reveal key={cred.title} delay={i * 110} className="h-full">
                <div className="flex h-full flex-col border border-espresso/10 bg-ivory p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_28px_45px_-28px_rgba(23,16,12,0.35)]">
                  <span className="flex h-12 w-12 items-center justify-center bg-espresso text-gold">
                    <cred.icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-6 font-display text-[1.5rem] leading-tight font-medium text-espresso">{cred.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed font-light text-cocoa-soft">{cred.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={150}>
            <p className="mx-auto mt-12 flex max-w-2xl items-start justify-center gap-3 text-center text-sm leading-relaxed font-light text-cocoa-soft">
              <Shirt className="mt-0.5 h-5 w-5 shrink-0 text-golddeep" strokeWidth={1.5} />
              Patricia has worked with public figures and charitable organizations throughout her career — frequently
              contributing services and products to fundraising and outreach initiatives.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Philosophy split */}
      <section className="overflow-hidden bg-ivory">
        <div className="mx-auto grid max-w-7xl items-stretch lg:grid-cols-2">
          <Reveal variant="scale" className="relative min-h-[360px]">
            <img
              src={IMAGES.bath}
              alt={IMAGES.bathAlt}
              loading="lazy"
              className="img-warm absolute inset-0 h-full w-full object-cover"
            />
          </Reveal>
          <div className="flex flex-col justify-center bg-espresso px-4 py-20 text-ivory sm:px-6 lg:px-14 lg:py-28">
            <Reveal>
              <span className="flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <span className="eyebrow text-gold">The Philosophy</span>
              </span>
              <h2 className="mt-5 font-display text-4xl leading-[1.08] font-light text-balance sm:text-5xl">
                Beauty begins <span className="font-medium text-champagne italic">within</span> — we simply help it
                shine through.
              </h2>
              <p className="mt-6 max-w-lg leading-relaxed font-light text-ivory/65">
                A Saint James woman is bold, daring and dynamic — not because of what she wears, but because she knows
                who she is. Our cosmetics are blended to perfection to honor that woman: her skin, her undertones, her
                light. Enhance, never mask. Illuminate, never imitate.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <button
                  onClick={() => openBooking("makeup-lesson")}
                  className="group flex items-center gap-3 bg-gold px-7 py-3.5 text-[0.68rem] font-semibold tracking-[0.24em] text-espresso uppercase transition-colors hover:bg-ivory"
                >
                  Learn with Patricia
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                </button>
                <button
                  onClick={() => navigate("shop")}
                  className="border border-ivory/30 px-7 py-3.5 text-[0.68rem] font-semibold tracking-[0.24em] text-ivory uppercase transition-all hover:border-gold hover:text-gold"
                >
                  Shop the Collection
                </button>
              </div>
              <p className="mt-8 text-xs font-light text-ivory/45">
                Questions about the line, an event, or your shades?{" "}
                <a href={BUSINESS.phoneHref} className="text-champagne underline underline-offset-4 hover:text-gold">
                  Call {BUSINESS.phone}
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
