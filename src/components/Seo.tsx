import { useEffect } from "react";
import { heroImage } from "../assets/images";
import type { ImageAsset } from "../content/types";

export interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: ImageAsset;
}

const SITE_URL = "https://www.equicrew.com";

function absoluteUrl(value: string): string {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `${SITE_URL}${value.startsWith("/") ? "" : "/"}${value}`;
}

function upsertMeta(attribute: "name" | "property", key: string, content: string): void {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.append(element);
  }

  element.setAttribute("content", content);
}

export function Seo({ title, description, path, image = heroImage }: SeoProps) {
  useEffect(() => {
    const pageUrl = absoluteUrl(path);
    const imageUrl = absoluteUrl(image.fallback);

    document.title = title;

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:image:alt", title);
    upsertMeta("property", "og:image:width", String(image.width));
    upsertMeta("property", "og:image:height", String(image.height));
    upsertMeta("property", "og:url", pageUrl);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", "equicrew");
    upsertMeta("property", "og:locale", "de_AT");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);
  }, [title, description, path, image]);

  return null;
}

export default Seo;
