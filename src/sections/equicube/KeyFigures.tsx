import { Container } from "../../components/Container";
import { Reveal } from "../../components/Reveal";
import { kpiDetails, kpis } from "../../content/equicube";

export function KeyFigures() {
  return (
    <section
      className="kpi-section"
      aria-label="EquiCube im Überblick"
      data-od-id="equicube-kpis"
    >
      <Container>
        <div className="kpi-grid">
          {kpis.map((kpi, index) => {
            const detail = kpiDetails[kpi.id];

            return (
              <Reveal key={kpi.id} className="kpi" delay={index * 60}>
                {detail ? <span className="kpi__index">{detail.index}</span> : null}
                <h2 className="kpi__label">{kpi.label}</h2>
                {detail ? <p className="kpi__description">{detail.description}</p> : null}
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default KeyFigures;
