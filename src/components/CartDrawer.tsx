import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { formatPrice, useStore } from "../store/StoreContext";
import { BUSINESS, PRODUCTS } from "../data/site";

type Step = "bag" | "details" | "confirmed";

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, setQty, removeFromCart, clearCart, navigate } = useStore();
  const [step, setStep] = useState<Step>("bag");
  const [orderRef, setOrderRef] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", zip: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const lines = useMemo(
    () =>
      cart
        .map((item) => {
          const product = PRODUCTS.find((p) => p.id === item.productId);
          return product ? { ...item, product } : null;
        })
        .filter((x): x is NonNullable<typeof x> => x !== null),
    [cart]
  );

  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);

  const close = () => {
    setCartOpen(false);
    window.setTimeout(() => setStep("bag"), 350);
  };

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const submitOrder = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Please share your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "A valid email helps us confirm your order";
    if (form.phone.replace(/\D/g, "").length < 7) next.phone = "We confirm every order by phone";
    if (form.address.trim().length < 4) next.address = "Street address required";
    if (form.city.trim().length < 2) next.city = "City required";
    if (form.zip.trim().length < 3) next.zip = "ZIP required";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setOrderRef(`SJ-${Math.floor(100000 + Math.random() * 900000)}`);
    setStep("confirmed");
    clearCart();
  };

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-[85]" role="dialog" aria-modal="true" aria-label="Your beauty bag">
      <button className="animate-fade-in absolute inset-0 bg-espresso/70 backdrop-blur-sm" onClick={close} aria-label="Close bag" />
      <aside className="animate-slide-in-right absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <div>
            <h3 className="font-display text-2xl font-medium text-espresso">Your Beauty Bag</h3>
            <p className="text-[0.62rem] tracking-[0.28em] text-taupe uppercase">
              {step === "bag" && (lines.length ? `${lines.length} selection${lines.length > 1 ? "s" : ""}` : "Mail-order boutique")}
              {step === "details" && "Order request details"}
              {step === "confirmed" && "Order received"}
            </p>
          </div>
          <button
            onClick={close}
            className="flex h-10 w-10 items-center justify-center border border-ink/15 text-ink transition-colors hover:border-golddeep hover:text-golddeep"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* BAG STEP */}
        {step === "bag" && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream">
                    <ShoppingBag className="h-7 w-7 text-golddeep" strokeWidth={1.25} />
                  </span>
                  <p className="mt-5 font-display text-2xl text-espresso italic">Your bag is empty</p>
                  <p className="mt-2 max-w-[26ch] text-sm leading-relaxed font-light text-taupe">
                    Discover color blended to perfection for your skin.
                  </p>
                  <button
                    onClick={() => {
                      close();
                      navigate("shop");
                    }}
                    className="mt-6 bg-espresso px-7 py-3.5 text-[0.68rem] font-semibold tracking-[0.24em] text-gold uppercase transition-colors hover:bg-gold hover:text-espresso"
                  >
                    Shop the Collection
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-ink/8">
                  {lines.map((line) => (
                    <li key={`${line.productId}-${line.shade ?? ""}`} className="flex gap-4 py-5">
                      <img
                        src={line.product.image}
                        alt={line.product.alt}
                        className="img-warm h-24 w-20 shrink-0 bg-cream object-cover"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-display text-[1.12rem] leading-tight font-medium text-espresso">
                              {line.product.name}
                            </p>
                            {line.shade && <p className="mt-0.5 text-xs text-taupe">Shade: {line.shade}</p>}
                          </div>
                          <button
                            onClick={() => removeFromCart(line.productId, line.shade)}
                            className="text-taupe transition-colors hover:text-clay"
                            aria-label={`Remove ${line.product.name}`}
                          >
                            <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center border border-ink/15">
                            <button
                              onClick={() => setQty(line.productId, line.shade, line.qty - 1)}
                              className="flex h-8 w-8 items-center justify-center text-ink/60 hover:text-golddeep"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-7 text-center text-sm">{line.qty}</span>
                            <button
                              onClick={() => setQty(line.productId, line.shade, line.qty + 1)}
                              className="flex h-8 w-8 items-center justify-center text-ink/60 hover:text-golddeep"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="text-[0.95rem] font-medium text-espresso">
                            {formatPrice(line.product.price * line.qty)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-ink/10 px-6 py-6">
                <div className="flex items-center justify-between">
                  <span className="text-[0.68rem] font-semibold tracking-[0.26em] text-espresso uppercase">Subtotal</span>
                  <span className="font-display text-2xl font-medium text-espresso">{formatPrice(subtotal)}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed font-light text-taupe">
                  Shipping & payment are arranged personally when we confirm your order — the Saint James mail-order
                  tradition.
                </p>
                <button
                  onClick={() => setStep("details")}
                  className="mt-5 flex w-full items-center justify-center gap-2.5 bg-espresso py-4 text-[0.7rem] font-semibold tracking-[0.24em] text-gold uppercase transition-colors hover:bg-gold hover:text-espresso"
                >
                  Request This Order <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                </button>
                <button
                  onClick={close}
                  className="mt-3 w-full py-2 text-center text-[0.68rem] font-medium tracking-[0.22em] text-cocoa-soft uppercase transition-colors hover:text-golddeep"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </>
        )}

        {/* DETAILS STEP */}
        {step === "details" && (
          <form onSubmit={submitOrder} className="flex flex-1 flex-col overflow-hidden" noValidate>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <button
                type="button"
                onClick={() => setStep("bag")}
                className="mb-6 flex items-center gap-2 text-[0.66rem] font-semibold tracking-[0.24em] text-cocoa-soft uppercase transition-colors hover:text-golddeep"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to bag
              </button>
              <p className="text-sm leading-relaxed font-light text-ink/75">
                Share your details and we will call to confirm your shades, arrange payment and ship your order with
                care. Prefer to talk first? Call{" "}
                <a href={BUSINESS.phoneHref} className="font-medium text-golddeep">
                  {BUSINESS.phone}
                </a>
                .
              </p>

              <div className="mt-7 space-y-5">
                {(
                  [
                    { field: "name", label: "Full name *", type: "text", placeholder: "Your name", autoComplete: "name" },
                    { field: "email", label: "Email *", type: "email", placeholder: "you@example.com", autoComplete: "email" },
                    { field: "phone", label: "Phone *", type: "tel", placeholder: "(310) 555-0100", autoComplete: "tel" },
                    { field: "address", label: "Street address *", type: "text", placeholder: "Street and number", autoComplete: "street-address" },
                  ] as const
                ).map((f) => (
                  <div key={f.field}>
                    <label htmlFor={`co-${f.field}`} className="text-[0.64rem] font-semibold tracking-[0.24em] text-espresso uppercase">
                      {f.label}
                    </label>
                    <input
                      id={`co-${f.field}`}
                      type={f.type}
                      value={form[f.field]}
                      onChange={(e) => update(f.field, e.target.value)}
                      placeholder={f.placeholder}
                      autoComplete={f.autoComplete}
                      className="field"
                    />
                    {errors[f.field] && <p className="mt-1.5 text-xs text-clay">{errors[f.field]}</p>}
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="co-city" className="text-[0.64rem] font-semibold tracking-[0.24em] text-espresso uppercase">
                      City *
                    </label>
                    <input id="co-city" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="City" autoComplete="address-level2" className="field" />
                    {errors.city && <p className="mt-1.5 text-xs text-clay">{errors.city}</p>}
                  </div>
                  <div>
                    <label htmlFor="co-zip" className="text-[0.64rem] font-semibold tracking-[0.24em] text-espresso uppercase">
                      ZIP *
                    </label>
                    <input id="co-zip" value={form.zip} onChange={(e) => update("zip", e.target.value)} placeholder="90274" autoComplete="postal-code" className="field" />
                    {errors.zip && <p className="mt-1.5 text-xs text-clay">{errors.zip}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="co-notes" className="text-[0.64rem] font-semibold tracking-[0.24em] text-espresso uppercase">
                    Shade notes (optional)
                  </label>
                  <textarea
                    id="co-notes"
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                    placeholder="Tell us about your skin tone or the look you love…"
                    rows={3}
                    className="field resize-none"
                  />
                </div>
              </div>
            </div>
            <div className="border-t border-ink/10 px-6 py-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[0.68rem] font-semibold tracking-[0.26em] text-espresso uppercase">Subtotal</span>
                <span className="font-display text-2xl font-medium text-espresso">{formatPrice(subtotal)}</span>
              </div>
              <button
                type="submit"
                className="w-full bg-espresso py-4 text-[0.7rem] font-semibold tracking-[0.24em] text-gold uppercase transition-colors hover:bg-gold hover:text-espresso"
              >
                Submit Order Request
              </button>
            </div>
          </form>
        )}

        {/* CONFIRMED STEP */}
        {step === "confirmed" && (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-cream">
              <CheckCircle2 className="h-10 w-10 text-golddeep" strokeWidth={1.25} />
            </span>
            <h4 className="mt-6 font-display text-3xl font-medium text-espresso">Order request received</h4>
            <p className="mt-2 text-[0.66rem] font-semibold tracking-[0.3em] text-golddeep uppercase">
              Reference {orderRef}
            </p>
            <p className="mt-4 max-w-[36ch] text-sm leading-relaxed font-light text-ink/75">
              Thank you, {form.name.split(" ")[0] || "beautiful"}. Patricia's studio will call{" "}
              <span className="font-medium text-espresso">{form.phone}</span> shortly to confirm your shades, arrange
              payment, and prepare your order with care.
            </p>
            <p className="mt-3 max-w-[36ch] text-sm leading-relaxed font-light text-ink/75">
              Need us sooner? Call{" "}
              <a href={BUSINESS.phoneHref} className="font-medium text-golddeep">
                {BUSINESS.phone}
              </a>{" "}
              or email{" "}
              <a href={BUSINESS.emailHref} className="font-medium text-golddeep">
                {BUSINESS.email}
              </a>
              .
            </p>
            <button
              onClick={close}
              className="mt-8 bg-espresso px-8 py-3.5 text-[0.68rem] font-semibold tracking-[0.24em] text-gold uppercase transition-colors hover:bg-gold hover:text-espresso"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
