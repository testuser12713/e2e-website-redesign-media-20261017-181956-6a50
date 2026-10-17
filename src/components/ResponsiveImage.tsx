import type { ImageAsset } from "../content/types";
import "./ResponsiveImage.css";

export interface ResponsiveImageProps {
  image: ImageAsset;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

export function ResponsiveImage({
  image,
  alt,
  sizes,
  priority = false,
  className,
}: ResponsiveImageProps) {
  return (
    <picture
      className={["responsive-image", className].filter(Boolean).join(" ")}
      data-responsive-image={priority ? "priority" : "lazy"}
    >
      <source type="image/avif" srcSet={image.avif} sizes={sizes} />
      <source type="image/webp" srcSet={image.webp} sizes={sizes} />
      <img
        src={image.fallback}
        alt={alt}
        width={image.width}
        height={image.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding={priority ? "sync" : "async"}
      />
    </picture>
  );
}

export default ResponsiveImage;
