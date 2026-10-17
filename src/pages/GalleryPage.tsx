import { Seo } from "../components/Seo";
import { GalleryChrome } from "../gallery/GalleryChrome";
import { GalleryPrimitives } from "../gallery/GalleryPrimitives";

export function GalleryPage() {
  return (
    <>
      <Seo
        title="Komponentengalerie | equicrew"
        description="Interne Entwicklungsgalerie der equicrew Komponenten."
        path="/dev/gallery"
      />
      <GalleryPrimitives />
      <GalleryChrome />
    </>
  );
}

export default GalleryPage;
