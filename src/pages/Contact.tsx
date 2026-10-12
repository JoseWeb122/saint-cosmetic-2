import { useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, ChevronDown, Clock3, Mail, MapPin, PackageCheck, Phone, Send, Truck } from "lucide-react";
import { BUSINESS, FAQS } from "../data/site";
import { FacebookIcon } from "../components/Footer";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

const TOPICS = ["Product & shade question", "Order by phone or mail", "Book a lesson or consultation", "Events, galas & beauty shows", "Press & partnership", "Something else"];

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", topic: TOPICS[0], message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Please share your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "A valid email is required";
    if (form.message.trim().length < 10) next.message = "Tell us a little more so we can help";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-4 py-16 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-cream">
          <CheckCircle2 className="h-10 w-10 text-golddeep" strokeWidth={1.25} />
        </span>
        <h3 className="mt-6 font-display text-3xl font-medium text-espresso">Thank you, {form.name.split(" ")[0]}</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed font-light text-cocoa-soft">
          Your message has been received. We personally answer every inquiry — expect to hear from the studio at{" "}
          {form.email}. For anything urgent, call us at {BUSINESS.phone}.
        </p>
        <button
          onClick={() => {
            setSent(false);
            setForm({ name: "", email: "", phone: "", topic: TOPICS[0], message: "" });
          }}
          className="mt-8 border border-espresso px-7 py-3 text-[0.66rem] font-semibold tracking-[0.24em] text-espresso uppercase transition-all hover:bg-espresso hover:text-gold"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="ct-name" className="text-[0.64rem] font-semibold tracking-[0.24em] text-espresso uppercase">Your name *</label>
          <input id="ct-name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Full name" autoComplete="name" className="field" />
          {errors.name && <p className="mt-1.5 text-xs text-clay">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="ct-email" className="text-[0.64rem] font-semibold tracking-[0.24em] text-espresso uppercase">Email *</label>
          <input id="ct-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" autoComplete="email" className="field" />
          {errors.email && <p className="mt-1.5 text-xs text-clay">{errors.email}</p>}
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="ct-phone" className="text-[0.64rem] font-semibold tracking-[0.24em] text-espresso uppercase">Phone (optional)</label>
          <input id="ct-phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="(310) 555-0100" autoComplete="tel" className="field" />
        </div>
        <div>
          <label htmlFor="ct-topic" className="text-[0.64rem] font-semibold tracking-[0.24em] text-espresso uppercase">I'm writing about</label>
          <div className="relative">
            <select id="ct-topic" value={form.topic} onChange={(e) => update("topic", e.target.value)} className="field pr-8">
              {TOPICS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-1 h-4 w-4 -translate-y-1/2 text-taupe" />
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="ct-message" className="text-[0.64rem] font-semibold tracking-[0.24em] text-espresso uppercase">Your message *</label>
        <textarea
          id="ct-message"
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={5}
          placeholder="Tell us about your skin, your event, or the look you're dreaming of…"
          className="field resize-none"
        />
        {errors.message && <p className="mt-1.5 text-xs text-clay">{errors.message}</p>}
      </div>
      <button
        type="submit"
        className="group flex items-center gap-3 bg-espresso px-8 py-4 text-[0.7rem] font-semibold tracking-[0.26em] text-gold uppercase transition-colors hover:bg-gold hover:text-espresso"
      >
        Send Message
        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" strokeWidth={1.75} />
      </button>
      <p className="text-xs leading-relaxed font-light text-taupe">
        Prefer email? Write to{" "}
        <a href={BUSINESS.emailHref} className="font-medium text-golddeep">
          {BUSINESS.email}
        </a>{" "}
        — we answer personally.
      </p>
    </form>
  );
}

function FaqItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-ink/10">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-[1.3rem] leading-snug font-medium text-espresso">{q}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-golddeep transition-transform duration-300 ${open ? "rotate-180" : ""}`} strokeWidth={1.75} />
      </button>
      <div className={`grid transition-all duration-500 ease-out ${open ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <p className="max-w-2xl text-[0.95rem] leading-relaxed font-light text-cocoa-soft">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-espresso text-ivory">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <span className="absolute -bottom-10 right-0 font-display text-[15vw] leading-none font-semibold text-ivory/[0.04] select-none">
            Contact
          </span>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 pt-48 pb-20 sm:px-6 lg:px-8 lg:pt-56 lg:pb-24">
          <Reveal>
            <span className="flex items-center gap-3">
              <span className="h-px w-10 bg-gold" />
              <span className="eyebrow text-gold">Contact · Ordering · Questions</span>
            </span>
            <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.02] font-light text-balance sm:text-6xl lg:text-7xl">
              Let's talk <span className="font-medium text-champagne italic">beauty</span>
            </h1>
            <p className="mt-6 max-w-xl leading-relaxed font-light text-ivory/65">
              Shade questions, orders by phone, lessons, galas — Saint James is a personal boutique, and every message
              is answered by a person. Usually by Patricia herself.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Info + form */}
      <section className="bg-ivory">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-8 lg:py-24">
          <div>
            <Reveal>
              <span className="flex items-center gap-3">
                <span className="h-px w-8 bg-golddeep" />
                <span className="eyebrow text-golddeep">Reach the Studio</span>
              </span>
              <h2 className="mt-5 font-display text-4xl leading-tight font-medium text-espresso">
                Personal, <span className="text-golddeep italic">always</span>
              </h2>
            </Reveal>
            <div className="mt-10 space-y-7">
              {[
                {
                  icon: Phone,
                  label: "Call or Text",
                  value: BUSINESS.phone,
                  href: BUSINESS.phoneHref,
                  note: "The fastest way to order or ask about shades",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: BUSINESS.email,
                  href: BUSINESS.emailHref,
                  note: "For orders, events and detailed questions",
                },
                {
                  icon: MapPin,
                  label: "The Studio",
                  value: BUSINESS.city,
                  href: undefined,
                  note: "Consultations & lessons by appointment · Mail order nationwide",
                },
                {
                  icon: Clock3,
                  label: "Studio Hours",
                  value: "By appointment",
                  href: undefined,
                  note: "Call to arrange a time that suits your life",
                },
              ].map((item, i) => (
                <Reveal key={item.label} delay={i * 80}>
                  <div className="flex gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-golddeep/35 text-golddeep">
                      <item.icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <div>
                      <p className="text-[0.62rem] font-semibold tracking-[0.28em] text-taupe uppercase">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="mt-1 block font-display text-[1.45rem] font-medium text-espresso transition-colors hover:text-golddeep">
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1 font-display text-[1.45rem] font-medium text-espresso">{item.value}</p>
                      )}
                      <p className="mt-0.5 text-sm font-light text-cocoa-soft">{item.note}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={200}>
              <a
                href={BUSINESS.facebook}
                target="_blank"
                rel="noreferrer"
                className="group mt-10 flex items-center justify-between border border-ink/12 px-6 py-5 transition-all hover:border-golddeep/50 hover:bg-cream"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center bg-espresso text-gold">
                    <FacebookIcon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-display text-lg leading-tight font-medium text-espresso">Saint James on Facebook</span>
                    <span className="text-xs font-light text-cocoa-soft">Events, galas and beauty moments from the studio</span>
                  </span>
                </span>
                <span className="text-[0.62rem] font-semibold tracking-[0.24em] text-golddeep uppercase">Follow</span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="border border-ink/10 bg-ivory p-7 shadow-[0_35px_60px_-40px_rgba(23,16,12,0.35)] sm:p-10">
              <h3 className="font-display text-3xl font-medium text-espresso">Write to the studio</h3>
              <p className="mt-2 text-sm font-light text-cocoa-soft">We reply personally — usually within one business day.</p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* How ordering works */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading
            eyebrow="Mail Order, the Saint James Way"
            title={
              <>
                How ordering <span className="text-golddeep italic">works</span>
              </>
            }
            description="Saint James began as a personal mail-order boutique — and we have kept the best part: a real conversation with every order."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: PackageCheck,
                title: "Choose & Request",
                text: "Browse the collection, add your selections to your beauty bag, and submit an order request — or simply call us at (310) 494-8094.",
              },
              {
                icon: Phone,
                title: "We Confirm Personally",
                text: "The studio contacts you to verify shades, answer questions, and arrange payment and shipping. Your complimentary shade consultation happens here.",
              },
              {
                icon: Truck,
                title: "Prepared & Shipped with Care",
                text: "Your order is prepared by hand and shipped to your door — beauty from our Palos Verdes studio to your vanity, wherever you are.",
              },
            ].map((step, i) => (
              <Reveal key={step.title} delay={i * 110} className="h-full">
                <div className="h-full border border-espresso/10 bg-ivory p-8">
                  <span className="flex h-12 w-12 items-center justify-center bg-espresso text-gold">
                    <step.icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-6 font-display text-[1.5rem] font-medium text-espresso">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed font-light text-cocoa-soft">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-ivory">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:py-24">
          <SectionHeading
            eyebrow="Questions, Answered"
            title={
              <>
                Before you <span className="text-golddeep italic">ask</span>
              </>
            }
          />
          <Reveal delay={120}>
            <div className="mt-12 border-t border-ink/10">
              {FAQS.map((faq, i) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} defaultOpen={i === 0} />
              ))}
            </div>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-10 text-center text-sm font-light text-cocoa-soft">
              Still curious?{" "}
              <a href={BUSINESS.phoneHref} className="font-medium text-golddeep underline underline-offset-4">
                Call {BUSINESS.phone}
              </a>{" "}
              — a human answers, and she knows beauty.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
