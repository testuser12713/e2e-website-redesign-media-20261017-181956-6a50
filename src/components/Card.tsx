import type { ReactNode } from "react";

export type CardVariant = "image" | "text" | "meta";

export interface CardProps {
  children: ReactNode;
  as?: "div" | "li";
  variant?: CardVariant;
  className?: string;
  id?: string;
}

const CARD_SHELL: Record<CardVariant, string> = {
  image: "reference-card",
  text: "founder-card",
  meta: "reference-card",
};

export function Card({ children, as = "div", variant = "image", className, id }: CardProps) {
  const Tag = as;

  return (
    <Tag
      id={id}
      className={[CARD_SHELL[variant], className].filter(Boolean).join(" ")}
      data-card-variant={variant}
    >
      {children}
    </Tag>
  );
}

export default Card;
