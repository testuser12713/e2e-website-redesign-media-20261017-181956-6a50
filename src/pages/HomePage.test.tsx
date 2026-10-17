import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import HomePage from "./HomePage";

function renderHome() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <HomePage />
    </MemoryRouter>,
  );
}

describe("HomePage", () => {
  it("shows the wordmark, the claim and the mission text in the hero", () => {
    renderHome();

    expect(
      screen.getByRole("heading", { level: 1, name: "equicrew" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("smarte energie - fair verteilte KI"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Energie und Künstliche Intelligenz nachhaltig/),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("EquiCrew-Energieanlage an einem Einfamilienhaus"),
    ).toBeInTheDocument();
  });

  it("offers the EquiCube and contact calls to action", () => {
    renderHome();

    expect(
      screen.getByRole("link", { name: /EquiCube entdecken/ }),
    ).toHaveAttribute("href", "/equicube");
    expect(
      screen.getByRole("link", { name: "Kontakt aufnehmen" }),
    ).toHaveAttribute("href", "/kontakt");
  });

  it("teases the EquiCube and names all four components", () => {
    renderHome();

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /alles unter einem dach/i,
      }),
    ).toBeInTheDocument();

    const components = screen.getByRole("list", {
      name: "Komponenten des EquiCube",
    });

    const expected = [
      ["Wärmepumpe", "Luft-Wasser-Technik"],
      ["Batterie", "Batterietechnik"],
      ["Pufferspeicher", "Wärmespeicher"],
      ["KI-Recheneinheit", "KI- & Server-Technik"],
    ];

    for (const [name, meta] of expected) {
      expect(within(components).getByText(name)).toBeInTheDocument();
      expect(within(components).getByText(meta)).toBeInTheDocument();
    }

    expect(
      screen.getByRole("link", { name: /über den EquiCube/ }),
    ).toHaveAttribute("href", "/equicube");
    expect(
      screen.getByAltText(
        "Freisteller des geöffneten EquiCube mit Blick auf die integrierte Anlagentechnik",
      ),
    ).toBeInTheDocument();
  });

  it("lists three reference installations with photo and technical data", () => {
    renderHome();

    const expected = [
      { title: "Einfamilienhaus-Neubau", heating: "Fußbodenheizung" },
      { title: "Sanierung mit Radiatorheizung", heating: "Radiatorheizung" },
      { title: "Objekt mit PV-Einbindung", heating: "Fußbodenheizung" },
    ];

    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(
      expected.length,
    );

    for (const { title, heating } of expected) {
      const heading = screen.getByRole("heading", { level: 3, name: title });
      const card = heading.closest<HTMLElement>(".reference-card");

      expect(card).not.toBeNull();
      const scope = within(card as HTMLElement);

      expect(scope.getByText("Gebäudetyp")).toBeInTheDocument();
      expect(scope.getByText("Einfamilienhaus")).toBeInTheDocument();
      expect(scope.getByText("Heizungsart")).toBeInTheDocument();
      expect(scope.getByText(heating)).toBeInTheDocument();
      expect(scope.getByText("Heizleistung")).toBeInTheDocument();
      expect(scope.getByText("bis 40 kW")).toBeInTheDocument();
      expect(scope.getByRole("img")).toHaveAttribute(
        "alt",
        `EquiCrew-Anlage: ${title}`,
      );
    }
  });

  it("sets the page title and description", () => {
    renderHome();

    expect(document.title).toBe(
      "EquiCrew | smarte energie – fair verteilte KI",
    );
    expect(
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content"),
    ).toBe(
      "smarte energie - fair verteilte KI: EquiCrew entwickelt nachhaltige Energie- und KI-Lösungen. Entdecke den EquiCube für Einfamilienhäuser.",
    );
  });
});
