import { Seo } from "../components/Seo";
import { Container } from "../components/Container";
import { site } from "../content/site";
import { plantImage } from "../assets/images";
import { ContactDetails } from "../sections/contact/ContactDetails";
import { ContactForm } from "../sections/contact/ContactForm";

export function ContactPage() {
  return (
    <>
      <Seo
        title="Kontakt | equicrew"
        description="Sprich mit EquiCrew in Mauthausen – per Telefon, E-Mail oder Kontaktformular. Wir freuen uns auf deine Nachricht."
        path="/kontakt"
        image={plantImage}
      />

      <section className="page-intro" aria-labelledby="contact-title" data-od-id="contact-intro">
        <Container className="page-intro__inner">
          <div className="page-intro__title">
            <p className="eyebrow">Kontakt</p>
            <h1 className="display-2" id="contact-title" data-od-id="contact-title">
              Kontakt
            </h1>
          </div>
          <div className="page-intro__aside">
            <p>
              Schreib uns - wir erzählen dir gerne mehr über den EquiCube und deine Möglichkeiten.
            </p>
            <a
              href={site.emailHref}
              style={{ display: "inline-flex", alignItems: "center", minHeight: 44 }}
            >
              {site.email}
            </a>
          </div>
        </Container>
      </section>

      <Container className="contact-layout">
        <ContactDetails />
        <ContactForm />
      </Container>
    </>
  );
}

export default ContactPage;
