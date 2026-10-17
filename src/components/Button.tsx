import type { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "light" | "dark";

export interface ButtonProps {
  variant: ButtonVariant;
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
  block?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLElement>;
  target?: string;
  rel?: string;
  "aria-label"?: string;
  "aria-pressed"?: boolean;
  "aria-current"?: "page" | "step" | "location" | "date" | "time" | true | false;
}

function buttonClassName(variant: ButtonVariant, block: boolean, className?: string): string {
  return ["btn", `btn--${variant}`, block ? "btn--block" : "", className]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  variant,
  to,
  href,
  children,
  className,
  block = false,
  disabled = false,
  type = "button",
  onClick,
  target,
  rel,
  "aria-label": ariaLabel,
  "aria-pressed": ariaPressed,
  "aria-current": ariaCurrent,
}: ButtonProps) {
  const classes = buttonClassName(variant, block, className);
  const linkRel = rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);

  const handleDisabledClick: MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
  };

  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        data-variant={variant}
        aria-label={ariaLabel}
        aria-pressed={ariaPressed}
        aria-current={ariaCurrent}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={disabled ? handleDisabledClick : onClick}
        target={target}
        rel={linkRel}
      >
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        data-variant={variant}
        aria-label={ariaLabel}
        aria-pressed={ariaPressed}
        aria-current={ariaCurrent}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={disabled ? handleDisabledClick : onClick}
        target={target}
        rel={linkRel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      data-variant={variant}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      aria-current={ariaCurrent}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
