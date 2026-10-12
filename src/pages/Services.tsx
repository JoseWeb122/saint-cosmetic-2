import { ArrowRight, CalendarCheck2, Check, Clock3, MapPin, MessagesSquare } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { BUSINESS, SERVICES } from "../data/site";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

export default function Services() {
  const { openBooking } = useStore();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-espresso text-ivory">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <span className="absolute -bottom-10 right-0 font-display text-[15vw] leading-none font-semibold text-ivory/[0.04] select-none">
            Studio
          </span>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 pt-48 pb-20 sm:px-6 lg:px-8 lg:pt-56 lg:pb-24">
          <Reveal>
            <span className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow text-gold">Services · By Appointment</span>
            </span>
            <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.02] font-light text-balance sm:text-6xl lg:text-7xl">
              The art of beauty, <span className="font-medium text-champagne italic">taught & performed</span>
            </h1>
            <p className="mt-6 max-w-xl leading-relaxed font-light text-ivory/65">
              Patricia Saint James has spent years in make-up, skin-care and fashion — teaching clients simple industry
              techniques, and bringing beauty to galas, fundraisers and fashion shows. This is where you experience it
              in person.
            </p>
            <button
              onClick={() => openBooking()}
              className="group mt-9 flex items-center gap-3 bg-gold px-8 py-4 text-[0.7rem] font-semibold tracking-[0.26em] text-espresso uppercase transition-colors hover:bg-ivory"
            >
              Request an Appointment
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
            </button>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-ink/10 bg-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            {
              icon: MessagesSquare,
              title: "1 · Request",
              text: "Choose your service and a preferred date and time. Send the request in under a minute — no payment taken online.",
            },
            {
              icon: CalendarCheck2,
              title: "2 · Personal Confirmation",
              text: "Patricia's studio calls you personally to confirm the details, answer questions and prepare for your visit.",
            },
            {
              icon: Clock3,
              title: "3 · Your Appointment",
              text: "Visit the Palos Verdes studio — or connect by phone for shade consultations — and enjoy beauty, unhurried.",
            },
          ].map((step, i) => (
            <Reveal key={step.title} delay={i * 110}>
              <div className="flex gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-golddeep/40 text-golddeep">
                  <step.icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-display text-[1.4rem] font-medium text-espresso">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed font-light text-cocoa-soft">{step.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services detail */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
          <SectionHeading
            eyebrow="The Services"
            title={
              <>
                Three ways to experience <span className="text-golddeep italic">Saint James</span>
              </>
            }
          />
          <div className="mt-20 space-y-24">
            {SERVICES.map((service, i) => (
              <article key={service.id} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <Reveal variant={i % 2 === 0 ? "left" : "right"} className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.alt}
                      loading="lazy"
                      className="img-warm aspect-[4/3] w-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      <span className="bg-espresso/85 px-3 py-1.5 text-[0.6rem] font-semibold tracking-[0.22em] text-champagne uppercase backdrop-blur">
                        {service.duration}
                      </span>
                      <span className="bg-ivory/90 px-3 py-1.5 text-[0.6rem] font-semibold tracking-[0.22em] text-espresso uppercase backdrop-blur">
                        {service.format}
                      </span>
                    </div>
                  </div>
                </Reveal>
                <Reveal variant={i % 2 === 0 ? "right" : "left"} className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="font-display text-xl text-golddeep italic">{service.tagline}</p>
                  <h3 className="mt-2 font-display text-4xl leading-tight font-medium text-espresso">{service.name}</h3>
                  <p className="mt-5 leading-relaxed font-light text-cocoa-soft">{service.description}</p>
                  <p className="mt-7 text-[0.64rem] font-semibold tracking-[0.28em] text-espresso uppercase">Your experience includes</p>
                  <ul className="mt-4 space-y-2.5">
                    {service.includes.map((item) => (
                      <li key={item} className="flex gap-3 text-[0.95rem] font-light text-ink/85">
                        <Check className="mt-0.5 h-4.5 w-4.5 shrink-0 text-golddeep" strokeWidth={2} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-9 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => openBooking(service.id)}
                      className="group flex items-center gap-3 bg-espresso px-7 py-3.5 text-[0.68rem] font-semibold tracking-[0.24em] text-gold uppercase transition-colors hover:bg-gold hover:text-espresso"
                    >
                      Book {service.id === "events" ? "Your Event" : "This Service"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                    </button>
                    <a
                      href={BUSINESS.phoneHref}
                      className="text-[0.68rem] font-semibold tracking-[0.24em] text-cocoa-soft uppercase underline decoration-gold/60 underline-offset-8 transition-colors hover:text-golddeep"
                    >
                      or call {BUSINESS.phone}
                    </a>
                  </div>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Location band */}
      <section className="bg-espresso text-ivory">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 py-16 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <Reveal>
            <span className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-gold" strokeWidth={1.5} />
              <p className="eyebrow text-gold">The Studio</p>
            </span>
            <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight font-light text-balance sm:text-4xl">
              Palos Verdes Estates, California — <span className="font-medium text-champagne italic">by appointment</span>,
              with clients welcomed by phone from everywhere.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <button
              onClick={() => openBooking()}
              className="bg-gold px-8 py-4 text-[0.7rem] font-semibold tracking-[0.26em] text-espresso uppercase transition-colors hover:bg-ivory"
            >
              Request Your Appointment
            </button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
