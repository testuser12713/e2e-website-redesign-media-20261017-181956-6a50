import { Container } from "../../components/Container";
import { Reveal } from "../../components/Reveal";
import { Section } from "../../components/Section";
import { advantages, advantagesIntro } from "../../content/equicube";

export function Advantages() {
  return (
    <Section aria-labelledby="advantages-title">
      <Container>
        <Reveal className="section-head">
          <p className="section-head__index">01 / Vorteile</p>
          <div className="section-head__body">
            <p className="eyebrow">Warum EquiCube</p>
            <h2 className="display-2" id="advantages-title">
              Vorteile des EquiCubes
            </h2>
            <p className="lead">{advantagesIntro}</p>
          </div>
        </Reveal>
        <div className="advantage-list">
          {advantages.map((advantage, index) => (
            <Reveal
              key={advantage.id}
              className="advantage advantage--simple"
              delay={index * 50}
            >
              <span className="advantage__index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="advantage__title">{advantage.title}</h3>
                {advantage.description ? (
                  <p className="advantage__note">{advantage.description}</p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default Advantages;
