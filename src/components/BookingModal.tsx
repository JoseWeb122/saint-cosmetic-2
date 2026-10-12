import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { CalendarCheck2, ChevronDown, Clock, X } from "lucide-react";
import { useStore } from "../store/StoreContext";
import { BUSINESS, SERVICES } from "../data/site";

const TIMES = ["10:00 AM", "11:30 AM", "1:00 PM", "2:30 PM", "4:00 PM", "5:30 PM"];

export default function BookingModal() {
  const { bookingService, closeBooking, pushToast } = useStore();
  const [serviceId, setServiceId] = useState("makeup-lesson");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  useEffect(() => {
    if (bookingService !== null) {
      setServiceId(bookingService);
      setDone(false);
      setDate("");
      setTime("");
      setErrors({});
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [bookingService]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBooking();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeBooking]);

  if (bookingService === null) return null;

  const service = SERVICES.find((s) => s.id === serviceId) ?? SERVICES[0];

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!serviceId) next.service = "Choose a service";
    if (!date) next.date = "Select a preferred date";
    if (!time) next.time = "Select a preferred time";
    if (form.name.trim().length < 2) next.name = "Please share your name";
    if (form.phone.replace(/\D/g, "").length < 7) next.phone = "We confirm appointments by phone";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "A valid email is required";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setDone(true);
    pushToast("Appointment requested", `${service.name} · We will call to confirm.`);
  };

  const prettyDate = date
    ? new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    : "";

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Book an appointment">
      <button className="animate-fade-in absolute inset-0 bg-espresso/75 backdrop-blur-sm" onClick={closeBooking} aria-label="Close booking" />
      <div className="animate-slide-up relative max-h-[92vh] w-full max-w-2xl overflow-y-auto bg-ivory shadow-2xl">
        <div className="flex items-center justify-between bg-espresso px-6 py-5 sm:px-8">
          <div>
            <p className="text-[0.6rem] font-semibold tracking-[0.3em] text-gold uppercase">Saint James Studio</p>
            <h3 className="mt-1 font-display text-2xl font-medium text-ivory">Request an Appointment</h3>
          </div>
          <button
            onClick={closeBooking}
            className="flex h-10 w-10 items-center justify-center border border-ivory/25 text-ivory transition-colors hover:border-gold hover:text-gold"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {done ? (
          <div className="px-6 py-12 text-center sm:px-10">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cream">
              <CalendarCheck2 className="h-10 w-10 text-golddeep" strokeWidth={1.25} />
            </span>
            <h4 className="mt-6 font-display text-3xl font-medium text-espresso">We look forward to meeting you</h4>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed font-light text-ink/75">
              Thank you, {form.name.split(" ")[0]}. Your request for{" "}
              <span className="font-medium text-espresso">{service.name}</span>
              {prettyDate && (
                <>
                  {" "}on <span className="font-medium text-espresso">{prettyDate}</span>
                </>
              )}
              {time && (
                <>
                  {" "}at <span className="font-medium text-espresso">{time}</span>
                </>
              )}{" "}
              has been received. Patricia's studio will call {form.phone} to confirm the details personally.
            </p>
            <button
              onClick={closeBooking}
              className="mt-8 bg-espresso px-8 py-3.5 text-[0.68rem] font-semibold tracking-[0.24em] text-gold uppercase transition-colors hover:bg-gold hover:text-espresso"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="px-6 py-7 sm:px-8" noValidate>
            <div>
              <label htmlFor="bk-service" className="text-[0.64rem] font-semibold tracking-[0.24em] text-espresso uppercase">
                Select a service
              </label>
              <div className="relative">
                <select
                  id="bk-service"
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="field pr-8"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} — {s.duration}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-1 h-4 w-4 -translate-y-1/2 text-taupe" />
              </div>
              <p className="mt-2 font-display text-[1.05rem] text-cocoa-soft italic">{service.tagline}</p>
            </div>

            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="bk-date" className="text-[0.64rem] font-semibold tracking-[0.24em] text-espresso uppercase">
                  Preferred date
                </label>
                <input id="bk-date" type="date" min={today} value={date} onChange={(e) => { setDate(e.target.value); setErrors((er) => ({ ...er, date: "" })); }} className="field" />
                {errors.date && <p className="mt-1.5 text-xs text-clay">{errors.date}</p>}
              </div>
              <div>
                <span className="flex items-center gap-1.5 text-[0.64rem] font-semibold tracking-[0.24em] text-espresso uppercase">
                  <Clock className="h-3.5 w-3.5 text-golddeep" /> Preferred time
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {TIMES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => { setTime(t); setErrors((er) => ({ ...er, time: "" })); }}
                      className={`border px-3 py-2 text-[0.72rem] tracking-wide transition-all ${
                        time === t ? "border-espresso bg-espresso text-gold" : "border-ink/20 text-ink/70 hover:border-golddeep"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {errors.time && <p className="mt-1.5 text-xs text-clay">{errors.time}</p>}
              </div>
            </div>

            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="bk-name" className="text-[0.64rem] font-semibold tracking-[0.24em] text-espresso uppercase">Your name</label>
                <input id="bk-name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Full name" autoComplete="name" className="field" />
                {errors.name && <p className="mt-1.5 text-xs text-clay">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="bk-phone" className="text-[0.64rem] font-semibold tracking-[0.24em] text-espresso uppercase">Phone</label>
                <input id="bk-phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="(310) 555-0100" autoComplete="tel" className="field" />
                {errors.phone && <p className="mt-1.5 text-xs text-clay">{errors.phone}</p>}
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="bk-email" className="text-[0.64rem] font-semibold tracking-[0.24em] text-espresso uppercase">Email</label>
              <input id="bk-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" autoComplete="email" className="field" />
              {errors.email && <p className="mt-1.5 text-xs text-clay">{errors.email}</p>}
            </div>
            <div className="mt-6">
              <label htmlFor="bk-notes" className="text-[0.64rem] font-semibold tracking-[0.24em] text-espresso uppercase">
                Anything we should know? (optional)
              </label>
              <textarea
                id="bk-notes"
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                rows={3}
                placeholder="The occasion, your beauty goals, questions about shades…"
                className="field resize-none"
              />
            </div>

            <button
              type="submit"
              className="mt-8 w-full bg-espresso py-4 text-[0.7rem] font-semibold tracking-[0.24em] text-gold uppercase transition-colors hover:bg-gold hover:text-espresso"
            >
              Request Appointment
            </button>
            <p className="mt-4 text-center text-xs leading-relaxed font-light text-taupe">
              Appointments are confirmed personally by phone. Prefer to speak now? Call{" "}
              <a href={BUSINESS.phoneHref} className="font-medium text-golddeep">
                {BUSINESS.phone}
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
