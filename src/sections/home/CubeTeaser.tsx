import { cubeImage } from "../../assets/images";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { ResponsiveImage } from "../../components/ResponsiveImage";
import { Reveal } from "../../components/Reveal";
import { Section } from "../../components/Section";
import { cubeParts } from "../../content/cubeParts";
import "./home.css";

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

export function CubeTeaser() {
  return (
    <Section
      className="home-product"
      aria-labelledby="equicube-teaser-title"
    >
      <Container>
        <Reveal className="section-head">
          <p className="section-head__index">01 / Das Produkt</p>
          <div className="section-head__body">
            <p className="eyebrow">equicube · Der EquiCube</p>
            <h2 className="display-2" id="equicube-teaser-title">
              alles unter{" "}
              <br />
              einem dach
            </h2>
            <p className="lead">
              Der EquiCube stellt eine innovative Komplettlösung im Bereich der
              Heizungstechnik dar. Anstatt einzelner Insellösungen vereint er
              Wärmepumpe, Batterie, Pufferspeicher und KI-Recheneinheit zu einer
              einzigartigen Kombination.
            </p>
          </div>
        </Reveal>
        <div className="product-split">
          <Reveal className="product-visual">
            <span className="product-visual__index">01 / 04</span>
            <ResponsiveImage
              image={cubeImage}
              alt="Freisteller des geöffneten EquiCube mit Blick auf die integrierte Anlagentechnik"
              sizes="(min-width: 960px) 50vw, 100vw"
            />
          </Reveal>
          <div className="product-copy">
            <Reveal className="product-copy__content" delay={80}>
              <p className="product-copy__claim">
                Wärmepumpe. Batterie. Pufferspeicher. KI.
              </p>
              <p>
                Vier Komponenten, ein geschlossenes System – aufeinander
                abgestimmt, platzsparend kombiniert und für den Alltag im
                Einfamilienhaus gemacht.
              </p>
              <ul
                className="component-list"
                aria-label="Komponenten des EquiCube"
              >
                {cubeParts.map((part) => (
                  <li className="component" key={part.id}>
                    <span className="component__name">{part.name}</span>
                    <span className="component__meta">
                      {part.description}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Button variant="secondary" to="/equicube">
              über den EquiCube
              <ArrowIcon />
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default CubeTeaser;
