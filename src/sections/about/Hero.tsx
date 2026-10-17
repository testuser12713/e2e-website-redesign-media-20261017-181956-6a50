import { plantImage } from "../../assets/images";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { ResponsiveImage } from "../../components/ResponsiveImage";
import { Mission } from "./Mission";

function ArrowIcon() {
  return (
    <svg
      className="btn__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="page-hero" aria-labelledby="about-title" data-od-id="about-hero">
      <div className="page-hero__media">
        <ResponsiveImage
          image={plantImage}
          alt="Energie- und Klimatechnik im Hintergrund der EquiCrew-Unternehmensseite"
          sizes="100vw"
          priority
        />
      </div>
      <div className="page-hero__veil" />
      <Container className="team-hero-grid">
        <div className="team-hero__copy">
          <p className="eyebrow eyebrow--light">Über uns</p>
          <h1 className="display-2" id="about-title" data-od-id="about-title">
            Über die Crew
          </h1>
          <Mission />
          <div className="button-row">
            <Button variant="primary" to="/kontakt" aria-label="Kontakt aufnehmen">
              Kontakt
              <ArrowIcon />
            </Button>
            <Button variant="light" to="/equicube">
              EquiCube
            </Button>
          </div>
        </div>
        <p className="team-hero__watermark">
          EquiCrew FlexCo
          <br />
          Mauthausen, Österreich
          <br />
          Drei Gründer · eine Crew
        </p>
      </Container>
    </section>
  );
}

export default Hero;
