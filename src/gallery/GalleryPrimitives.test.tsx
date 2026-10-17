import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { GalleryPrimitives } from "./GalleryPrimitives";

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

function renderGallery() {
  return render(
    <MemoryRouter>
      <GalleryPrimitives />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  motionState.reduced = false;
  vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);
});

describe("GalleryPrimitives", () => {
  it("renders every primitive with its states", async () => {
    const user = userEvent.setup();

    renderGallery();

    expect(screen.getByRole("heading", { level: 1, name: "Primitives" })).toBeInTheDocument();

    for (const state of ["idle", "hover", "focus", "active", "selected", "disabled", "block"]) {
      expect(document.querySelector(`[data-testid="button-state-${state}"]`)).toBeInTheDocument();
    }

    expect(screen.getAllByRole("link", { name: "EquiCube entdecken" }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: "E-Mail schreiben" })[0]).toHaveAttribute(
      "href",
      "mailto:office@equicrew.com",
    );

    const toggle = screen.getByRole("button", { name: "Ausgewählt" });
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    await user.click(toggle);
    expect(screen.getByRole("button", { name: "Nicht ausgewählt" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );

    expect(screen.getByRole("button", { name: "Primär deaktiviert" })).toBeDisabled();
    expect(screen.getByRole("link", { name: "Sekundär deaktiviert" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );

    for (const variant of ["image", "text", "meta"]) {
      expect(document.querySelector(`[data-card-variant="${variant}"]`)).toBeInTheDocument();
    }

    expect(document.querySelector('[data-width="default"]')).toBeInTheDocument();
    expect(document.querySelector('[data-width="narrow"]')).toBeInTheDocument();

    expect(document.querySelector('[data-tone="base"]')).toBeInTheDocument();
    expect(document.querySelector('[data-tone="muted"]')).toBeInTheDocument();
    expect(document.querySelector('[data-tone="dark"]')).toBeInTheDocument();

    expect(
      document.querySelector('[data-testid="reveal-animated"] [data-reveal="animated"]'),
    ).toBeInTheDocument();
    expect(document.querySelectorAll('[data-testid="reveal-staggered"] [data-reveal]')).toHaveLength(
      3,
    );

    expect(document.querySelectorAll("picture.responsive-image").length).toBeGreaterThanOrEqual(5);
    expect(document.querySelector('[data-responsive-image="lazy"]')).toBeInTheDocument();
    expect(document.querySelector('[data-responsive-image="priority"]')).toBeInTheDocument();
    expect(document.querySelectorAll('source[type="image/avif"]').length).toBeGreaterThan(0);
    expect(document.querySelectorAll('source[type="image/webp"]').length).toBeGreaterThan(0);
  });

  it("renders every reveal statically when reduced motion is preferred", () => {
    motionState.reduced = true;

    renderGallery();

    expect(
      document.querySelector('[data-testid="reveal-animated"] [data-reveal="static"]'),
    ).toBeInTheDocument();
    expect(document.querySelector('[data-reveal="animated"]')).not.toBeInTheDocument();
    expect(document.querySelectorAll('[data-testid="reveal-staggered"] [data-reveal="static"]')).toHaveLength(
      3,
    );
  });
});
