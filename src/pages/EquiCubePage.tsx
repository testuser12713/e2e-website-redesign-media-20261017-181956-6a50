import { Seo } from "../components/Seo";
import { plantImage } from "../assets/images";
import { Advantages } from "../sections/equicube/Advantages";
import { Hero } from "../sections/equicube/Hero";
import { InquiryCta } from "../sections/equicube/InquiryCta";
import { KeyFigures } from "../sections/equicube/KeyFigures";

export function EquiCubePage() {
  return (
    <>
      <Seo
        title="EquiCube | equicrew"
        description="Der EquiCube vereint Wärmepumpe, Batterie, Pufferspeicher und KI-Recheneinheit in einem System – die Heiztechnikanlage für Einfamilienhäuser."
        path="/equicube"
        image={plantImage}
      />
      <Hero />
      <KeyFigures />
      <Advantages />
      <InquiryCta />
    </>
  );
}

export default EquiCubePage;
