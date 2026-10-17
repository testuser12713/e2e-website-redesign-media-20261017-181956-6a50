import type { CSSProperties, JSX } from "react";
import { MemoryRouter } from "react-router-dom";
import { Footer } from "../layout/Footer";
import { Header } from "../layout/Header";

const previewFrame: CSSProperties = {
  position: "relative",
  overflow: "hidden",
  border: "1px solid var(--line)",
  borderRadius: "var(--radius-md)",
  background: "var(--paper)",
};

const previewCaption: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: "var(--space-2)",
  marginBottom: "var(--space-3)",
  color: "var(--muted)",
  fontSize: "0.82rem",
};

function Preview({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: JSX.Element;
}): JSX.Element {
  return (
    <div>
      <div style={previewCaption}>
        <p className="eyebrow eyebrow--plain">{title}</p>
        <p>{description}</p>
      </div>
      <div style={previewFrame}>{children}</div>
    </div>
  );
}

export function GalleryChrome(): JSX.Element {
  return (
    <section className="section" aria-labelledby="gallery-chrome-title">
      <div className="container">
        <div className="section-head">
          <p className="section-head__index">Chrome</p>
          <div className="section-head__body">
            <p className="eyebrow">Kopf- und Fußzeile</p>
            <h2 className="display-2" id="gallery-chrome-title">
              Header &amp; Footer
            </h2>
            <p className="lead">
              Die Kopfzeile bleibt beim Scrollen sichtbar und markiert den
              Navigationspunkt der offenen Seite. Unter 960 px öffnet der
              Menüknopf das Navigationspanel. Jede Seite endet mit dem
              Kontakt-Band im Footer.
            </p>
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gap: "var(--space-6)",
            marginBottom: "var(--space-7)",
          }}
        >
          <Preview
            title="Header · Startseite"
            description="Sticky, aktiver Punkt: Start"
          >
            <MemoryRouter initialEntries={["/"]}>
              <Header menuId="gallery-menu-start" />
            </MemoryRouter>
          </Preview>
          <Preview
            title="Header · Unterseite"
            description="Aktiver Punkt: Über uns"
          >
            <MemoryRouter initialEntries={["/ueber-uns"]}>
              <Header menuId="gallery-menu-about" />
            </MemoryRouter>
          </Preview>
        </div>
        <Preview
          title="Footer · Kontakt-Band"
          description="Adresse, tel:- und mailto:-Link, Social-Links, Impressum"
        >
          <MemoryRouter initialEntries={["/"]}>
            <Footer contactTitleId="gallery-footer-contact-title" />
          </MemoryRouter>
        </Preview>
      </div>
    </section>
  );
}

export default GalleryChrome;
