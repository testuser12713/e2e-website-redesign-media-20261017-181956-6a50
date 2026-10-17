import { Seo } from "../components/Seo";
import { heroImage } from "../assets/images";
import { Hero } from "../sections/home/Hero";
import { CubeTeaser } from "../sections/home/CubeTeaser";
import { References } from "../sections/home/References";

export function HomePage() {
  return (
    <>
      <Seo
        title="EquiCrew | smarte energie – fair verteilte KI"
        description="smarte energie - fair verteilte KI: EquiCrew entwickelt nachhaltige Energie- und KI-Lösungen. Entdecke den EquiCube für Einfamilienhäuser."
        path="/"
        image={heroImage}
      />
      <Hero />
      <CubeTeaser />
      <References />
    </>
  );
}

export default HomePage;
