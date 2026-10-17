import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { Reveal } from "../../components/Reveal";
import { Section } from "../../components/Section";

export function InquiryCta() {
  return (
    <Section className="section--tight" aria-labelledby="equicube-cta-title">
      <Container>
        <div className="cta-panel">
          <Reveal className="cta-panel__copy">
            <p className="eyebrow">Kontakt</p>
            <h2 id="equicube-cta-title">Neugierig geworden?</h2>
            <p>Schreib uns - wir erzählen dir gerne mehr!</p>
          </Reveal>
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
        </div>
      </Container>
    </Section>
  );
}

export default InquiryCta;
