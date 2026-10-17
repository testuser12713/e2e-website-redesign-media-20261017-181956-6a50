import { teamGroupImage } from "../../assets/images";
import { Container } from "../../components/Container";
import { Reveal } from "../../components/Reveal";
import { ResponsiveImage } from "../../components/ResponsiveImage";
import { Section } from "../../components/Section";

export function TeamShot() {
  return (
    <Section className="section--tight" aria-labelledby="team-photo-caption">
      <Container>
        <Reveal>
          <figure className="team-photo">
            <ResponsiveImage
              image={teamGroupImage}
              alt="Das Team von EquiCrew"
              sizes="(min-width: 1280px) 1280px, calc(100vw - 2rem)"
            />
            <figcaption className="team-photo__caption" id="team-photo-caption">
              Das Team von EquiCrew
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </Section>
  );
}

export default TeamShot;
