import { Seo } from "../components/Seo";
import { heroImage } from "../assets/images";

export function HomePage() {
  return (
    <Seo
      title="EquiCrew | smarte energie – fair verteilte KI"
      description="smarte energie - fair verteilte KI: EquiCrew entwickelt nachhaltige Energie- und KI-Lösungen. Entdecke den EquiCube für Einfamilienhäuser."
      path="/"
      image={heroImage}
    />
  );
}

export default HomePage;
