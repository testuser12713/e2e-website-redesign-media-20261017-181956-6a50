import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { EquiCubePage } from "./EquiCubePage";

const KEY_FIGURES = [
  "Standardisierter Basis-Cube",
  "Modular anpassbar",
  "Für Fußboden- & Radiatorenheizung",
  "Heizleistung: bis 40 kW",
];

const ADVANTAGES = [
  "Schnelle Installation: >2h",
  "Einfache Wartbarkeit",
  "Einfache Installation & Inbetriebnahme",
  "Abgestimmte Komponenten",
  "Minimierter Platzbedarf",
];

function renderPage() {
  return render(
    <MemoryRouter>
      <EquiCubePage />
    </MemoryRouter>,
  );
}

describe("EquiCubePage", () => {
  it("shows the hero with the installation photo and the cube cutout", () => {
    renderPage();

    expect(
      screen.getByRole("heading", { level: 1, name: "Der EquiCube" }),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("Anlagentechnik von EquiCrew für den EquiCube"),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(
        "Freisteller des geöffneten EquiCube mit seinen integrierten Komponenten",
      ),
    ).toBeInTheDocument();
  });

  it("lists the four key figures word for word", () => {
    renderPage();

    const overview = screen.getByRole("region", { name: "EquiCube im Überblick" });

    for (const label of KEY_FIGURES) {
      expect(within(overview).getByText(label)).toBeInTheDocument();
    }
    expect(within(overview).getAllByRole("heading", { level: 2 })).toHaveLength(4);
  });

  it("lists all five advantages word for word", () => {
    renderPage();

    const section = screen.getByRole("region", { name: "Vorteile des EquiCubes" });

    for (const title of ADVANTAGES) {
      expect(
        within(section).getByRole("heading", { level: 3, name: title }),
      ).toBeInTheDocument();
    }
    expect(within(section).getAllByRole("heading", { level: 3 })).toHaveLength(5);
  });

  it("links the inquiry calls to action to the contact page", () => {
    renderPage();

    const hero = screen.getByRole("region", { name: "Der EquiCube" });
    const cta = screen.getByRole("region", { name: "Neugierig geworden?" });

    expect(
      within(hero).getByRole("link", { name: /Jetzt anfragen!/ }),
    ).toHaveAttribute("href", "/kontakt");
    expect(
      within(cta).getByRole("link", { name: /Jetzt anfragen!/ }),
    ).toHaveAttribute("href", "/kontakt");
  });
});
