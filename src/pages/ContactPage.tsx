import { Seo } from "../components/Seo";
import { plantImage } from "../assets/images";

export function ContactPage() {
  return (
    <Seo
      title="Kontakt | equicrew"
      description="Sprich mit EquiCrew in Mauthausen – per Telefon, E-Mail oder Kontaktformular. Wir freuen uns auf deine Nachricht."
      path="/kontakt"
      image={plantImage}
    />
  );
}

export default ContactPage;
