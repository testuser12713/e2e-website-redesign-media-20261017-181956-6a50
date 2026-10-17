import { useState, type ReactNode } from "react";
import { cubeImage, portraitMichaelHochstoeger, references } from "../assets/images";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { Section } from "../components/Section";
import "./GalleryPrimitives.css";

interface GalleryPanelProps {
  state: string;
  label: string;
  hint?: string;
  children: ReactNode;
}

function GalleryPanel({ state, label, hint, children }: GalleryPanelProps) {
  return (
    <div className="gallery-panel" data-testid={`button-state-${state}`} data-state={state}>
      <div className="gallery-panel__head">
        <span className="badge badge--neutral">{label}</span>
        <code className="gallery-panel__code">{state}</code>
      </div>
      <div className="gallery-panel__body">{children}</div>
      {hint ? <p className="gallery-panel__hint">{hint}</p> : null}
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="spec-list__row">
      <dt className="spec-list__label">{label}</dt>
      <dd className="spec-list__value">{value}</dd>
    </div>
  );
}

function SelectedButtonDemo() {
  const [selected, setSelected] = useState(true);

  return (
    <Button
      variant="secondary"
      aria-pressed={selected}
      onClick={() => setSelected((current) => !current)}
    >
      {selected ? "Ausgewählt" : "Nicht ausgewählt"}
    </Button>
  );
}

export function GalleryPrimitives() {
  return (
    <>
      <Section className="gallery-intro" aria-labelledby="gallery-title">
        <Container>
          <header className="gallery-header">
            <p className="eyebrow">Entwicklungsgalerie</p>
            <h1 className="display-2" id="gallery-title">
              Primitives
            </h1>
            <p className="lead">
              Alle Bausteine des Designsystems in ihren Zuständen: Buttons, Karten,
              Layout-Rahmen, Reveals und responsive Bilder. Diese Seite ist nur im
              Entwicklungsmodus erreichbar.
            </p>
          </header>
        </Container>
      </Section>

      <Section
        id="gallery-buttons"
        tone="muted"
        className="gallery-section"
        aria-labelledby="gallery-buttons-title"
      >
        <Container>
          <header className="gallery-section__head">
            <p className="eyebrow">Button</p>
            <h2 className="display-3" id="gallery-buttons-title">
              Buttons und Zustände
            </h2>
            <p className="lead">
              Primär- und Sekundärvariante mit Hover, Fokus, aktivem Druckzustand,
              Auswahl und deaktiviertem Zustand. Hover, Fokus und aktiver Druck
              entstehen durch die echte Bedienung der Steuerelemente.
            </p>
          </header>

          <div className="gallery-grid">
            <GalleryPanel state="idle" label="Idle" hint="Grundzustand ohne Interaktion.">
              <Button variant="primary" to="/equicube">
                EquiCube entdecken
              </Button>
              <Button variant="secondary" href="mailto:office@equicrew.com">
                Kontakt aufnehmen
              </Button>
              <Button variant="dark" to="/equicube">
                Dunkle Variante
              </Button>
            </GalleryPanel>

            <GalleryPanel
              state="hover"
              label="Hover"
              hint="Mit dem Mauszeiger über die Schaltfläche fahren."
            >
              <Button variant="primary" to="/equicube">
                EquiCube entdecken
              </Button>
              <Button variant="secondary" href="mailto:office@equicrew.com">
                Kontakt aufnehmen
              </Button>
            </GalleryPanel>

            <GalleryPanel
              state="focus"
              label="Focus"
              hint="Mit der Tab-Taste fokussieren; der Fokusring bleibt sichtbar."
            >
              <Button variant="primary" to="/kontakt">
                Jetzt anfragen!
              </Button>
              <Button variant="secondary" to="/ueber-uns">
                Über uns
              </Button>
            </GalleryPanel>

            <GalleryPanel
              state="active"
              label="Active"
              hint="Schaltfläche gedrückt halten, um den Druckzustand zu sehen."
            >
              <Button variant="primary" to="/kontakt">
                Jetzt anfragen!
              </Button>
              <Button variant="secondary" to="/ueber-uns">
                Über uns
              </Button>
            </GalleryPanel>

            <GalleryPanel
              state="selected"
              label="Selected"
              hint="Ausgewählte Umschaltfläche mit aria-pressed; ein Klick wechselt den Zustand."
            >
              <SelectedButtonDemo />
            </GalleryPanel>

            <GalleryPanel
              state="disabled"
              label="Disabled"
              hint="Nicht verfügbare Aktionen sind sichtbar deaktiviert."
            >
              <Button variant="primary" disabled>
                Primär deaktiviert
              </Button>
              <Button variant="secondary" href="/kontakt" disabled>
                Sekundär deaktiviert
              </Button>
            </GalleryPanel>

            <GalleryPanel
              state="block"
              label="Block"
              hint="Volle Breite für Formulare und schmale Ansichten."
            >
              <Button variant="primary" to="/kontakt" block>
                Jetzt anfragen!
              </Button>
            </GalleryPanel>
          </div>

          <div className="gallery-surface gallery-surface--dark" data-testid="button-dark-surface">
            <p className="eyebrow eyebrow--light">Auf dunklem Grund</p>
            <div className="button-row">
              <Button variant="light" to="/kontakt">
                Kontakt aufnehmen
              </Button>
              <Button variant="primary" href="mailto:office@equicrew.com">
                E-Mail schreiben
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        id="gallery-cards"
        className="gallery-section"
        aria-labelledby="gallery-cards-title"
      >
        <Container>
          <header className="gallery-section__head">
            <p className="eyebrow">Card</p>
            <h2 className="display-3" id="gallery-cards-title">
              Kartenvarianten
            </h2>
            <p className="lead">
              Bildkarte, Textkarte und Metakarte folgen der Kartenoptik der
              Referenz- und Gründerkarten. Der Hover-Zustand nutzt die vorhandene
              Design-Interaktion.
            </p>
          </header>

          <ul className="reference-grid gallery-card-grid">
            <Card as="li" variant="image">
              <div className="reference-card__media">
                <ResponsiveImage
                  image={references[0]}
                  alt="EquiCrew-Anlage für ein Einfamilienhaus im Neubau"
                  sizes="(min-width: 960px) 33vw, 100vw"
                />
              </div>
              <div className="reference-card__body">
                <div className="reference-card__top">
                  <h3 className="reference-card__title">Einfamilienhaus-Neubau</h3>
                  <span className="badge">Neubau</span>
                </div>
                <dl className="spec-list">
                  <SpecRow label="Gebäudetyp" value="Einfamilienhaus" />
                  <SpecRow label="Heizungsart" value="Fußbodenheizung" />
                  <SpecRow label="Heizleistung" value="bis 40 kW" />
                </dl>
              </div>
            </Card>

            <Card as="li" variant="text">
              <div className="founder-card__media">
                <ResponsiveImage
                  image={portraitMichaelHochstoeger}
                  alt="Portrait von Michael Hochstöger, Founder bei EquiCrew"
                  sizes="(min-width: 960px) 33vw, 100vw"
                />
              </div>
              <div className="founder-card__body">
                <span className="founder-card__role">Founder</span>
                <h3 className="founder-card__name">Michael Hochstöger</h3>
                <a className="founder-card__mail" href="mailto:michael.hochstoeger@equicrew.com">
                  michael.hochstoeger@equicrew.com
                </a>
              </div>
            </Card>

            <Card as="li" variant="meta">
              <div className="reference-card__body">
                <div className="reference-card__top">
                  <h3 className="reference-card__title">Sanierung mit Radiatorheizung</h3>
                  <span className="badge badge--neutral">Sanierung</span>
                </div>
                <dl className="spec-list">
                  <SpecRow label="Gebäudetyp" value="Einfamilienhaus" />
                  <SpecRow label="Heizungsart" value="Radiatorheizung" />
                  <SpecRow label="Heizleistung" value="bis 40 kW" />
                </dl>
              </div>
            </Card>
          </ul>
        </Container>
      </Section>

      <Section
        id="gallery-layout"
        tone="dark"
        className="gallery-section"
        aria-labelledby="gallery-layout-title"
      >
        <Container>
          <header className="gallery-section__head">
            <p className="eyebrow eyebrow--light">Section &amp; Container</p>
            <h2 className="display-3 text-light" id="gallery-layout-title">
              Layout-Rahmen
            </h2>
            <p className="lead lead--light">
              Die Section trägt den vertikalen Rhythmus und die Tonlage, der
              Container begrenzt die Breite. Diese Section zeigt die dunkle
              Tonlage, die Kontakt- und CTA-Bereiche verwenden.
            </p>
          </header>
        </Container>

        <Container>
          <div className="gallery-panel" data-testid="container-default">
            <div className="gallery-panel__head">
              <span className="badge badge--neutral">Container · default</span>
              <code className="gallery-panel__code">container</code>
            </div>
            <p className="gallery-panel__hint">
              Standardbreite bis zur Maximalbreite des Layouts, mit dem Gutter aus
              den Design-Tokens.
            </p>
          </div>
        </Container>

        <Container width="narrow">
          <div className="gallery-panel" data-testid="container-narrow">
            <div className="gallery-panel__head">
              <span className="badge badge--neutral">Container · narrow</span>
              <code className="gallery-panel__code">container--narrow</code>
            </div>
            <p className="gallery-panel__hint">
              Schmalere Lesebreite für Fließtext und rechtliche Inhalte.
            </p>
          </div>
        </Container>
      </Section>

      <Section
        id="gallery-reveal"
        className="gallery-section"
        aria-labelledby="gallery-reveal-title"
      >
        <Container>
          <header className="gallery-section__head">
            <p className="eyebrow">Reveal</p>
            <h2 className="display-3" id="gallery-reveal-title">
              Bewegung und reduzierte Bewegung
            </h2>
            <p className="lead">
              Der Reveal blendet Inhalte beim Scrollen mit einer kurzen Dauer ein.
              Bei aktivierter Systemeinstellung „Bewegung reduzieren“ erscheinen
              alle Inhalte sofort und ohne Transformation.
            </p>
          </header>

          <div className="gallery-grid">
            <div className="gallery-panel" data-testid="reveal-animated">
              <div className="gallery-panel__head">
                <span className="badge badge--neutral">Bewegung erlaubt</span>
                <code className="gallery-panel__code">reveal</code>
              </div>
              <Reveal>
                <div className="gallery-reveal-box">
                  <p className="eyebrow">Scroll-Reveal</p>
                  <p>Dieser Inhalt blendet beim Sichtbarwerden ein.</p>
                </div>
              </Reveal>
            </div>

            <div className="gallery-panel" data-testid="reveal-reduced">
              <div className="gallery-panel__head">
                <span className="badge badge--neutral">Bewegung reduzieren</span>
                <code className="gallery-panel__code">static</code>
              </div>
              <p className="gallery-panel__hint">
                Bei aktiver Systemeinstellung wird derselbe Inhalt ohne Animation
                und ohne Verschiebung gerendert.
              </p>
              <Reveal>
                <div className="gallery-reveal-box">
                  <p className="eyebrow">Reduzierte Bewegung</p>
                  <p>Sofort sichtbar, ohne Einblendung.</p>
                </div>
              </Reveal>
            </div>

            <div className="gallery-panel" data-testid="reveal-staggered">
              <div className="gallery-panel__head">
                <span className="badge badge--neutral">Gestaffelt</span>
                <code className="gallery-panel__code">delay 0 · 80 · 160</code>
              </div>
              <div className="gallery-stagger">
                <Reveal delay={0}>
                  <div className="gallery-reveal-box">Karte 01</div>
                </Reveal>
                <Reveal delay={80}>
                  <div className="gallery-reveal-box">Karte 02</div>
                </Reveal>
                <Reveal delay={160}>
                  <div className="gallery-reveal-box">Karte 03</div>
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        id="gallery-images"
        tone="muted"
        className="gallery-section"
        aria-labelledby="gallery-images-title"
      >
        <Container>
          <header className="gallery-section__head">
            <p className="eyebrow">ResponsiveImage</p>
            <h2 className="display-3" id="gallery-images-title">
              Responsive Bilder
            </h2>
            <p className="lead">
              Jedes Bild liefert AVIF, WebP und einen Fallback mit festen
              Breiten- und Höhenangaben. Der Standard lädt nachgelagert, die
              Prioritätsvariante sofort und mit hoher Priorität.
            </p>
          </header>

          <div className="gallery-grid">
            <div className="gallery-panel" data-testid="responsive-image-lazy">
              <div className="gallery-panel__head">
                <span className="badge badge--neutral">Lazy</span>
                <code className="gallery-panel__code">
                  {cubeImage.width} × {cubeImage.height}
                </code>
              </div>
              <div className="gallery-image-frame">
                <ResponsiveImage
                  image={cubeImage}
                  alt="Freisteller des geöffneten EquiCube mit integrierter Anlagentechnik"
                  sizes="(min-width: 960px) 33vw, 100vw"
                />
              </div>
              <p className="gallery-panel__hint">
                Standard: loading=&quot;lazy&quot;, intrinsisches Seitenverhältnis
                1:1.
              </p>
            </div>

            <div className="gallery-panel" data-testid="responsive-image-priority">
              <div className="gallery-panel__head">
                <span className="badge badge--neutral">Priority</span>
                <code className="gallery-panel__code">
                  {references[0].width} × {references[0].height}
                </code>
              </div>
              <div className="gallery-image-frame gallery-image-frame--wide">
                <ResponsiveImage
                  image={references[0]}
                  alt="EquiCrew-Energieanlage an einem Einfamilienhaus"
                  sizes="(min-width: 960px) 50vw, 100vw"
                  priority
                />
              </div>
              <p className="gallery-panel__hint">
                Hero-Bild: loading=&quot;eager&quot; und fetchpriority=&quot;high&quot;.
              </p>
            </div>

            <div className="gallery-panel" data-testid="responsive-image-portrait">
              <div className="gallery-panel__head">
                <span className="badge badge--neutral">Portrait</span>
                <code className="gallery-panel__code">
                  {portraitMichaelHochstoeger.width} × {portraitMichaelHochstoeger.height}
                </code>
              </div>
              <div className="gallery-image-frame">
                <ResponsiveImage
                  image={portraitMichaelHochstoeger}
                  alt="Portrait von Michael Hochstöger, Founder bei EquiCrew"
                  sizes="(min-width: 960px) 25vw, 50vw"
                />
              </div>
              <p className="gallery-panel__hint">
                Hochformat mit reserviertem Seitenverhältnis und beschreibendem
                Alt-Text.
              </p>
            </div>
          </div>

          <p className="note-line">
            Alle Beispiele verwenden ausschließlich Dateien aus dem eigenen Build.
          </p>
        </Container>
      </Section>
    </>
  );
}

export default GalleryPrimitives;
