import { teamGroupImage } from "../assets/images";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { Reveal } from "../components/Reveal";
import { Section } from "../components/Section";
import { Seo } from "../components/Seo";
import { FounderCards } from "../sections/about/FounderCards";
import { Hero } from "../sections/about/Hero";
import { TeamShot } from "../sections/about/TeamShot";

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

export function AboutPage() {
  return (
    <>
      <Seo
        title="Über uns | equicrew"
        description="Die Crew hinter EquiCrew: Michael Hochstöger, Christian Hinterdorfer und Christian Hinterreiter. Lerne das Team und die Mission kennen."
        path="/ueber-uns"
        image={teamGroupImage}
      />
      <Hero />
      <TeamShot />
      <FounderCards />
      <Section className="section--tight" aria-labelledby="about-cta-title">
        <Container>
          <div className="cta-panel">
            <Reveal className="cta-panel__copy">
              <p className="eyebrow">Kontakt</p>
              <h2 id="about-cta-title">Neugierig geworden?</h2>
              <p>Schreib uns - wir erzählen dir gerne mehr!</p>
            </Reveal>
            <Button variant="primary" to="/kontakt">
              Kontakt
              <ArrowIcon />
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}

export default AboutPage;
