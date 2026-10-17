import { heroImage } from "../../assets/images";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { ResponsiveImage } from "../../components/ResponsiveImage";
import { Section } from "../../components/Section";

function ArrowIcon() {
  return (
    <svg
      className="btn__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Hero() {
  return (
    <Section className="hero hero--home" aria-labelledby="home-hero-title">
      <div className="hero__media">
        <ResponsiveImage
          image={heroImage}
          alt="EquiCrew-Energieanlage an einem Einfamilienhaus"
          sizes="100vw"
          priority
        />
      </div>
      <div className="hero__veil" aria-hidden="true" />
      <Container className="hero__content">
        <p className="eyebrow eyebrow--light">
          EquiCrew FlexCo · Mauthausen, Österreich
        </p>
        <h1
          className="hero__wordmark"
          id="home-hero-title"
          data-od-id="home-wordmark"
        >
          equicrew
        </h1>
        <p className="hero__claim" data-od-id="home-claim">
          smarte energie - fair verteilte KI
        </p>
        <p className="hero__mission">
          EquiCrew hat sich zum Ziel gesetzt, Energie und Künstliche Intelligenz
          nachhaltig bereitzustellen und zu nutzen, um so den nachfolgenden
          Generationen bestmögliche Chancen zu liefern, um sicher und erfolgreich
          die Herausforderungen der Zukunft zu meistern.
        </p>
        <div className="button-row">
          <Button variant="primary" to="/equicube">
            EquiCube entdecken
            <ArrowIcon />
          </Button>
          <Button variant="light" to="/kontakt">
            Kontakt aufnehmen
          </Button>
        </div>
        <span className="hero__scroll">Mehr entdecken</span>
      </Container>
    </Section>
  );
}

export default Hero;
