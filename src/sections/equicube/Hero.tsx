import { cubeImage, plantImage } from "../../assets/images";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { ResponsiveImage } from "../../components/ResponsiveImage";
import { productDescription } from "../../content/equicube";

export function Hero() {
  return (
    <section className="page-hero" aria-labelledby="equicube-title" data-od-id="equicube-hero">
      <div className="page-hero__media">
        <ResponsiveImage
          image={plantImage}
          alt="Anlagentechnik von EquiCrew für den EquiCube"
          sizes="100vw"
          priority
        />
      </div>
      <div className="page-hero__veil" />
      <Container className="page-hero__inner">
        <div className="page-hero__content">
          <p className="eyebrow eyebrow--light">EquiCube · Heiztechnik für Einfamilienhäuser</p>
          <h1 className="display-2" id="equicube-title" data-od-id="equicube-title">
            Der EquiCube
          </h1>
          <p className="lead lead--light">{productDescription}</p>
          <div className="button-row">
            <Button variant="primary" to="/kontakt">
              Jetzt anfragen!
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
            </Button>
            <span className="badge badge--dark">Heizleistung bis 40 kW</span>
          </div>
        </div>
        <div className="cube-stage" data-od-id="equicube-freesteller">
          <span className="cube-stage__tag">Standardisierter Basis-Cube</span>
          <ResponsiveImage
            image={cubeImage}
            alt="Freisteller des geöffneten EquiCube mit seinen integrierten Komponenten"
            sizes="(min-width: 960px) 40vw, 100vw"
            priority
          />
        </div>
      </Container>
    </section>
  );
}

export default Hero;
