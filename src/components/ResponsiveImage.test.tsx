import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { ImageAsset } from "../content/types";
import { ResponsiveImage } from "./ResponsiveImage";

const image: ImageAsset = {
  avif: "/images/sample.avif",
  webp: "/images/sample.webp",
  fallback: "/images/sample.jpg",
  width: 1200,
  height: 800,
};

describe("ResponsiveImage", () => {
  it("renders AVIF, WebP and fallback with intrinsic dimensions", () => {
    render(<ResponsiveImage image={image} alt="Beispielanlage" sizes="50vw" />);

    const picture = document.querySelector("picture");
    const avif = document.querySelector('source[type="image/avif"]');
    const webp = document.querySelector('source[type="image/webp"]');
    const img = screen.getByAltText("Beispielanlage");

    expect(picture).toHaveClass("responsive-image");
    expect(picture).toHaveAttribute("data-responsive-image", "lazy");
    expect(avif).toHaveAttribute("srcset", image.avif);
    expect(avif).toHaveAttribute("sizes", "50vw");
    expect(webp).toHaveAttribute("srcset", image.webp);
    expect(webp).toHaveAttribute("sizes", "50vw");
    expect(img).toHaveAttribute("src", image.fallback);
    expect(img).toHaveAttribute("width", "1200");
    expect(img).toHaveAttribute("height", "800");
    expect(img).toHaveAttribute("loading", "lazy");
    expect(img).toHaveAttribute("fetchpriority", "auto");
    expect(img).toHaveAttribute("decoding", "async");
  });

  it("loads eagerly with a high fetch priority when priority is passed", () => {
    render(<ResponsiveImage image={image} alt="Hero-Anlage" priority />);

    const picture = document.querySelector("picture");
    const img = screen.getByAltText("Hero-Anlage");

    expect(picture).toHaveAttribute("data-responsive-image", "priority");
    expect(img).toHaveAttribute("loading", "eager");
    expect(img).toHaveAttribute("fetchpriority", "high");
    expect(img).toHaveAttribute("decoding", "sync");
  });

  it("merges a custom class name onto the picture element", () => {
    render(<ResponsiveImage image={image} alt="Beispielanlage" className="hero-media" />);

    expect(document.querySelector("picture")).toHaveClass("responsive-image", "hero-media");
  });
});
