import { Card } from "../../components/Card";
import { Reveal } from "../../components/Reveal";
import { ResponsiveImage } from "../../components/ResponsiveImage";
import type { TeamMember } from "../../content/types";

export interface FounderCardProps {
  member: TeamMember;
  delay?: number;
}

export function FounderCard({ member, delay = 0 }: FounderCardProps) {
  return (
    <Card variant="text" id={member.id}>
      <Reveal delay={delay}>
        <div className="founder-card__media">
          <ResponsiveImage
            image={member.portrait}
            alt={`Portrait von ${member.name}, ${member.role} bei EquiCrew`}
            sizes="(min-width: 960px) 33vw, (min-width: 760px) 50vw, 100vw"
          />
        </div>
      </Reveal>
      <div className="founder-card__body">
        <span className="founder-card__role">{member.role}</span>
        <h3 className="founder-card__name">{member.name}</h3>
        <a className="founder-card__mail" href={`mailto:${member.email}`}>
          {member.email}
        </a>
      </div>
    </Card>
  );
}

export default FounderCard;
