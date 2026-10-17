import { Seo } from "../components/Seo";
import { teamGroupImage } from "../assets/images";

export function AboutPage() {
  return (
    <Seo
      title="Über uns | equicrew"
      description="Die Crew hinter EquiCrew: Michael Hochstöger, Christian Hinterdorfer und Christian Hinterreiter. Lerne das Team und die Mission kennen."
      path="/ueber-uns"
      image={teamGroupImage}
    />
  );
}

export default AboutPage;
