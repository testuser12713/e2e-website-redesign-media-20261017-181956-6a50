import { Container } from "../../components/Container";
import { Reveal } from "../../components/Reveal";
import { Section } from "../../components/Section";
import { team } from "../../content/team";
import { FounderCard } from "./FounderCard";

export function FounderCards() {
  return (
    <Section aria-labelledby="team-title">
      <Container>
        <Reveal>
          <div className="team-intro">
            <div>
              <p className="eyebrow">Das Team</p>
              <h2 className="display-2" id="team-title">
                Die Crew.
              </h2>
            </div>
            <p className="lead">
              Unsere Crew besteht aus einem interdisziplinär versierten Team mit
              geballtem Innovationswillen, gelebter Menschlichkeit und einer
              großen Portion Spaß.
            </p>
          </div>
        </Reveal>
        <div className="founder-grid">
          {team.map((member, index) => (
            <FounderCard key={member.id} member={member} delay={index * 80} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default FounderCards;
