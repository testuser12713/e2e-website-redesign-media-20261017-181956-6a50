import { Seo } from "../components/Seo";
import { plantImage } from "../assets/images";

export function ImprintPage() {
  return (
    <Seo
      title="Impressum | equicrew"
      description="Impressum der EquiCrew FlexCo, Marktplatz 14, 4310 Mauthausen, Österreich. Firmenbuch, UID-Nummer und Geschäftsführung."
      path="/impressum"
      image={plantImage}
    />
  );
}

export default ImprintPage;
