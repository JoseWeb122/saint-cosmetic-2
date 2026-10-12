import { useEffect } from "react";
import { ArrowLeft, ArrowRight, Clock3, X } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { ARTICLES } from "../data/site";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

function ArticleReader() {
  const { readArticle, setReadArticle, navigate, openBooking } = useStore();
  const article = ARTICLES.find((a) => a.id === readArticle);

  useEffect(() => {
    if (article) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [article]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setReadArticle(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setReadArticle]);

  if (!article) return null;

  const idx = ARTICLES.findIndex((a) => a.id === article.id);
  const next = ARTICLES[(idx + 1) % ARTICLES.length];

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-ivory" role="dialog" aria-modal="true" aria-label={article.title}>
      <div className="animate-fade-in">
        <div className="relative h-[46vh] min-h-[320px] overflow-hidden bg-espresso">
          <img src={article.image} alt={article.alt} className="img-warm h-full w-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-espresso/35" aria-hidden="true" />
          <button
            onClick={() => setReadArticle(null)}
            className="absolute top-24 left-4 flex items-center gap-2 bg-ivory/95 px-4 py-2.5 text-[0.64rem] font-semibold tracking-[0.22em] text-espresso uppercase transition-colors hover:bg-gold sm:left-6 lg:top-28"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All Articles
          </button>
          <button
            onClick={() => setReadArticle(null)}
            className="absolute top-24 right-4 flex h-10 w-10 items-center justify-center bg-espresso text-ivory transition-colors hover:bg-gold hover:text-espresso sm:right-6 lg:top-28"
            aria-label="Close article"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <div className="absolute right-0 bottom-0 left-0">
            <div className="mx-auto max-w-3xl px-4 pb-10 sm:px-6">
              <p className="flex items-center gap-3 text-[0.64rem] font-semibold tracking-[0.28em] text-champagne uppercase">
                {article.category}
                <span className="h-px w-10 bg-gold/70" />
                <span className="flex items-center gap-1.5 tracking-[0.14em] normal-case">
                  <Clock3 className="h-3.5 w-3.5" /> {article.readTime}
                </span>
              </p>
              <h2 className="mt-3 font-display text-4xl leading-[1.05] font-light text-balance text-ivory sm:text-5xl">
                {article.title}
              </h2>
            </div>
          </div>
        </div>

        <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <p className="border-l-2 border-gold pl-5 font-display text-[1.4rem] leading-relaxed text-espresso italic">
            {article.excerpt}
          </p>
          {article.body.map((para, i) => (
            <p key={i} className="mt-7 text-[1.05rem] leading-[1.85] font-light text-ink/85 first:mt-10">
              {para}
            </p>
          ))}

          <div className="mt-14 bg-espresso px-7 py-9 text-center text-ivory sm:px-10">
            <p className="eyebrow text-gold">Continue the Journey</p>
            <p className="mx-auto mt-3 max-w-md font-display text-2xl leading-snug font-light">
              Put these techniques into practice — with Patricia, or with the collection.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => {
                  setReadArticle(null);
                  openBooking("makeup-lesson");
                }}
                className="bg-gold px-6 py-3 text-[0.66rem] font-semibold tracking-[0.24em] text-espresso uppercase transition-colors hover:bg-ivory"
              >
                Book a Private Lesson
              </button>
              <button
                onClick={() => {
                  setReadArticle(null);
                  navigate("shop");
                }}
                className="border border-ivory/30 px-6 py-3 text-[0.66rem] font-semibold tracking-[0.24em] text-ivory uppercase transition-all hover:border-gold hover:text-gold"
              >
                Shop the Collection
              </button>
            </div>
          </div>

          <button onClick={() => setReadArticle(next.id)} className="group mt-12 block w-full text-left">
            <p className="text-[0.62rem] font-semibold tracking-[0.28em] text-golddeep uppercase">Read Next</p>
            <span className="mt-2 flex items-center justify-between gap-4">
              <span className="font-display text-2xl leading-snug font-medium text-espresso transition-colors group-hover:text-golddeep sm:text-3xl">
                {next.title}
              </span>
              <ArrowRight className="h-6 w-6 shrink-0 text-golddeep transition-transform group-hover:translate-x-1.5" strokeWidth={1.5} />
            </span>
          </button>
        </article>
      </div>
    </div>
  );
}

export default function Journal() {
  const { setReadArticle } = useStore();
  const [featured, ...rest] = ARTICLES;

  return (
    <>
      <section className="relative overflow-hidden bg-espresso text-ivory">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <span className="absolute -bottom-10 right-0 font-display text-[15vw] leading-none font-semibold text-ivory/[0.04] select-none">
            Journal
          </span>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 pt-48 pb-20 sm:px-6 lg:px-8 lg:pt-56 lg:pb-24">
          <Reveal>
            <span className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow text-gold">Beauty Tips · New Discoveries · From Patricia</span>
            </span>
            <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.02] font-light text-balance sm:text-6xl lg:text-7xl">
              The Beauty <span className="font-medium text-champagne italic">Journal</span>
            </h1>
            <p className="mt-6 max-w-xl leading-relaxed font-light text-ivory/65">
              The same guidance Patricia has shared with clients for years — simple industry techniques, honest product
              wisdom, and the occasional sparkle — now written for you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          {/* Featured */}
          <Reveal>
            <article className="group grid cursor-pointer overflow-hidden border border-ink/10 lg:grid-cols-2" onClick={() => setReadArticle(featured.id)}>
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
                <img
                  src={featured.image}
                  alt={featured.alt}
                  loading="lazy"
                  className="img-warm absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.05]"
                />
                <span className="absolute top-4 left-4 bg-gold px-3 py-1.5 text-[0.6rem] font-semibold tracking-[0.24em] text-espresso uppercase">
                  Featured
                </span>
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <p className="flex items-center gap-3 text-[0.62rem] font-semibold tracking-[0.26em] text-golddeep uppercase">
                  {featured.category} <span className="h-px w-8 bg-golddeep/50" /> {featured.readTime}
                </p>
                <h2 className="mt-4 font-display text-3xl leading-tight font-medium text-balance text-espresso transition-colors group-hover:text-golddeep lg:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 leading-relaxed font-light text-cocoa-soft">{featured.excerpt}</p>
                <span className="mt-7 flex items-center gap-2 text-[0.66rem] font-semibold tracking-[0.24em] text-espresso uppercase">
                  Read the Article
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                </span>
              </div>
            </article>
          </Reveal>

          {/* Grid */}
          <div className="mt-16 grid gap-10 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3">
            {rest.map((article, i) => (
              <Reveal key={article.id} delay={(i % 3) * 110}>
                <article className="group cursor-pointer" onClick={() => setReadArticle(article.id)}>
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
                  <h3 className="mt-3 font-display text-[1.55rem] leading-snug font-medium text-espresso transition-colors group-hover:text-golddeep">
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

      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <SectionHeading
            eyebrow="Prefer It In Person?"
            title={
              <>
                Every technique in this journal is one Patricia can <span className="text-golddeep italic">teach your hands</span>
              </>
            }
            description="A private lesson turns reading into muscle memory. Bring your makeup bag — leave with a routine that is entirely, confidently yours."
          />
          <Reveal delay={150}>
            <LessonsCta />
          </Reveal>
        </div>
      </section>

      <ArticleReader />
    </>
  );
}

function LessonsCta() {
  const { openBooking } = useStore();
  return (
    <button
      onClick={() => openBooking("makeup-lesson")}
      className="group mt-9 inline-flex items-center gap-3 bg-espresso px-8 py-4 text-[0.7rem] font-semibold tracking-[0.26em] text-gold uppercase transition-colors hover:bg-gold hover:text-espresso"
    >
      Book a Private Lesson
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
    </button>
  );
}
