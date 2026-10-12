import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export default function SectionHeading({ eyebrow, title, description, align = "center", dark = false }: SectionHeadingProps) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <Reveal className={`flex flex-col ${alignCls}`}>
      <span className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        <span className={`h-px w-8 ${dark ? "bg-gold" : "bg-golddeep"}`} />
        <span className={`eyebrow ${dark ? "text-gold" : "text-golddeep"}`}>{eyebrow}</span>
        <span className={`h-px w-8 ${dark ? "bg-gold" : "bg-golddeep"}`} />
      </span>
      <h2
        className={`mt-5 max-w-2xl font-display text-4xl leading-[1.08] font-medium text-balance sm:text-5xl ${
          dark ? "text-ivory" : "text-espresso"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-5 max-w-xl text-[0.98rem] leading-relaxed font-light ${dark ? "text-ivory/65" : "text-cocoa-soft"}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
