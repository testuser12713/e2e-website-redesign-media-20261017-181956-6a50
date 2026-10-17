import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const REVEAL_EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

function delayInSeconds(delay: number): number {
  return delay > 10 ? delay / 1000 : delay;
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const canObserveViewport = typeof IntersectionObserver !== "undefined";

  if (prefersReducedMotion || !canObserveViewport) {
    return (
      <div className={className} data-reveal="static" data-delay={delay}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      data-reveal="animated"
      data-delay={delay}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -36px 0px" }}
      transition={{
        duration: 0.4,
        ease: REVEAL_EASE,
        delay: delayInSeconds(delay),
      }}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
