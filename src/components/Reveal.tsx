import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

type Variant = "up" | "left" | "right" | "scale";

const variantClass: Record<Variant, string> = {
  up: "reveal",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
};

interface RevealProps {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article" | "figure" | "span";
}

export default function Reveal({ children, variant = "up", delay = 0, className = "", as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as as "div";
  const style = { "--reveal-delay": `${delay}ms` } as CSSProperties;

  return (
    <Tag ref={ref as never} style={style} className={`${variantClass[variant]} ${className}`}>
      {children}
    </Tag>
  );
}
