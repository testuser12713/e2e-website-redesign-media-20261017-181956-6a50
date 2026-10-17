import { Container } from "../../components/Container";
import { Card } from "../../components/Card";
import { ResponsiveImage } from "../../components/ResponsiveImage";
import { Reveal } from "../../components/Reveal";
import { Section } from "../../components/Section";
import { references } from "../../content/references";
import "./home.css";

export function References() {
  return (
    <Section tone="muted" aria-labelledby="references-title">
      <Container>
        <Reveal className="section-head">
          <p className="section-head__index">02 / Anlagen</p>
          <div className="section-head__body">
            <p className="eyebrow">Referenzen &amp; Anlagen</p>
            <h2 className="display-2" id="references-title">
              Drei typische Anlagen&shy;konfigurationen.
            </h2>
            <p className="lead">
              Der EquiCube lässt sich an Gebäude, Heizungsart und Energiebedarf
              anpassen. Diese drei Auslegungen zeigen typische Einsatzszenarien –
              vom Neubau bis zur Sanierung mit PV-Einbindung.
            </p>
          </div>
        </Reveal>
        <div className="reference-grid">
          {references.map((reference, index) => (
            <Reveal key={reference.id} delay={index * 80}>
              <Card variant="image">
                <div className="reference-card__media">
                  <ResponsiveImage
                    image={reference.image}
                    alt={`EquiCrew-Anlage: ${reference.title}`}
                    sizes="(min-width: 960px) 33vw, (min-width: 760px) 50vw, 100vw"
                  />
                </div>
                <div className="reference-card__body">
                  <div className="reference-card__top">
                    <h3 className="reference-card__title">{reference.title}</h3>
                    {reference.badge ? (
                      <span className="badge">{reference.badge}</span>
                    ) : null}
                  </div>
                  <dl className="spec-list">
                    {reference.specs.map((spec) => (
                      <div className="spec-list__row" key={spec.label}>
                        <dt className="spec-list__label">{spec.label}</dt>
                        <dd className="spec-list__value">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
        <p className="note-line">
          Typische Anlagenkonfigurationen, keine Kundenstimmen, Kundennamen oder
          Kundenlogos.
        </p>
      </Container>
    </Section>
  );
}

export default References;
