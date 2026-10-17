import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { Container } from "../components/Container";
import { Section } from "../components/Section";
import { imprint } from "../content/imprint";
import { plantImage } from "../assets/images";

export function ImprintPage() {
  return (
    <>
      <Seo
        title="Impressum | equicrew"
        description="Impressum der EquiCrew FlexCo, Marktplatz 14, 4310 Mauthausen, Österreich. Firmenbuch, UID-Nummer und Geschäftsführung."
        path="/impressum"
        image={plantImage}
      />

      <Section
        tone="dark"
        className="page-hero page-hero--plain"
        aria-labelledby="imprint-title"
      >
        <Container className="page-hero__inner">
          <div className="page-hero__content">
            <p className="eyebrow eyebrow--light">Rechtliches</p>
            <h1 className="display-2" id="imprint-title">
              Impressum
            </h1>
            <p className="lead lead--light">
              Angaben zur {imprint.companyName} in Mauthausen, Österreich.
            </p>
          </div>
        </Container>
      </Section>

      <Container className="legal-layout">
        <aside className="legal-aside" aria-label="Inhalt des Impressums">
          <p className="eyebrow">{imprint.companyName}</p>
          <nav className="legal-aside__nav" aria-label="Impressum-Abschnitte">
            <a href="#unternehmen">Unternehmen</a>
            <a href="#kontakt">Kontakt</a>
            <a href="#firmenbuch">Firmenbuch</a>
            <a href="#vertretung">Vertretung</a>
          </nav>
        </aside>

        <div>
          <Section
            id="unternehmen"
            className="legal-block"
            aria-labelledby="unternehmen-title"
          >
            <h2 id="unternehmen-title">Unternehmen</h2>
            <p className="legal-meta">
              <strong>{imprint.companyName}</strong>
            </p>
            <address>
              {imprint.addressLines.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < imprint.addressLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </address>
          </Section>

          <Section
            id="kontakt"
            className="legal-block"
            aria-labelledby="imprint-kontakt-title"
          >
            <h2 id="imprint-kontakt-title">Kontakt</h2>
            <div className="legal-meta">
              <p>
                Tel.: <a href={imprint.phoneHref}>{imprint.phone}</a>
              </p>
              <p>
                E-Mail: <a href={imprint.emailHref}>{imprint.email}</a>
              </p>
            </div>
          </Section>

          <Section
            id="firmenbuch"
            className="legal-block"
            aria-labelledby="firmenbuch-title"
          >
            <h2 id="firmenbuch-title">Firmenbuch</h2>
            <div className="legal-meta">
              <p>
                <strong>Firmenbuchnummer:</strong> {imprint.register.number}
              </p>
              <p>
                <strong>Firmenbuchgericht:</strong> {imprint.register.court}
              </p>
              <p>
                <strong>Unternehmensgegenstand:</strong> {imprint.register.purpose}
              </p>
              <p>
                <strong>UID-Nummer:</strong> {imprint.register.uid}
              </p>
            </div>
          </Section>

          <Section
            id="vertretung"
            className="legal-block"
            aria-labelledby="vertretung-title"
          >
            <h2 id="vertretung-title">Geschäftsführung</h2>
            <p>
              {imprint.directorsLabel}: {imprint.directors}
            </p>
            <p>
              <Link className="legal-cta" to={imprint.contactPath}>
                {imprint.contactCta}
              </Link>
            </p>
          </Section>
        </div>
      </Container>
    </>
  );
}

export default ImprintPage;
