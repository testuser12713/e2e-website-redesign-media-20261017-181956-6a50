import { Seo } from "../components/Seo";
import { plantImage } from "../assets/images";

export function EquiCubePage() {
  return (
    <Seo
      title="EquiCube | equicrew"
      description="Der EquiCube vereint Wärmepumpe, Batterie, Pufferspeicher und KI-Recheneinheit in einem System – die Heiztechnikanlage für Einfamilienhäuser."
      path="/equicube"
      image={plantImage}
    />
  );
}

export default EquiCubePage;
