import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Reveal } from "./Reveal";

const motionState = vi.hoisted(() => ({ reduced: false }));

vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<typeof import("framer-motion")>();
  return {
    ...actual,
    useReducedMotion: () => motionState.reduced,
  };
});

class IntersectionObserverStub {
  root = null;
  rootMargin = "";
  thresholds: number[] = [];

  observe() {}

  unobserve() {}

  disconnect() {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

beforeEach(() => {
  motionState.reduced = false;
  vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);
});

describe("Reveal", () => {
  it("wraps its children in a motion reveal with a delay", () => {
    render(
      <Reveal delay={80}>
        <p>Inhalt</p>
      </Reveal>,
    );

    const wrapper = screen.getByText("Inhalt").parentElement;

    expect(wrapper).toHaveAttribute("data-reveal", "animated");
    expect(wrapper).toHaveAttribute("data-delay", "80");
  });

  it("renders its children statically when reduced motion is preferred", () => {
    motionState.reduced = true;

    render(
      <Reveal delay={160}>
        <p>Inhalt</p>
      </Reveal>,
    );

    const wrapper = screen.getByText("Inhalt").parentElement;

    expect(wrapper).toHaveAttribute("data-reveal", "static");
    expect(wrapper).not.toHaveAttribute("style");
  });

  it("forwards a custom class name to the wrapper", () => {
    render(
      <Reveal className="custom-reveal">
        <p>Inhalt</p>
      </Reveal>,
    );

    expect(screen.getByText("Inhalt").parentElement).toHaveClass("custom-reveal");
  });
});
