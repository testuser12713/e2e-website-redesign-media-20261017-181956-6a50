import type { ReactNode } from "react";

export type ContainerWidth = "default" | "narrow";

export interface ContainerProps {
  children: ReactNode;
  width?: ContainerWidth;
  className?: string;
}

export function Container({ children, width = "default", className }: ContainerProps) {
  const classes = ["container", width === "narrow" ? "container--narrow" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} data-width={width}>
      {children}
    </div>
  );
}

export default Container;
