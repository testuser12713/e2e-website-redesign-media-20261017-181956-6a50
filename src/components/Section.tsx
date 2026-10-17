import type { ReactNode } from "react";

export type SectionTone = "base" | "muted" | "dark";

export interface SectionProps {
  id?: string;
  tone?: SectionTone;
  children: ReactNode;
  className?: string;
  "aria-labelledby"?: string;
}

export function Section({
  id,
  tone = "base",
  children,
  className,
  "aria-labelledby": ariaLabelledBy,
}: SectionProps) {
  const classes = [
    "section",
    tone === "muted" ? "section--muted" : "",
    tone === "dark" ? "section--dark" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={classes} data-tone={tone} aria-labelledby={ariaLabelledBy}>
      {children}
    </section>
  );
}

export default Section;
