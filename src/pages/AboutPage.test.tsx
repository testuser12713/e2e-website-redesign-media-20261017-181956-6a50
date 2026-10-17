import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { team } from "../content/team";
import { AboutPage } from "./AboutPage";

function renderAboutPage() {
  return render(
    <MemoryRouter initialEntries={["/ueber-uns"]}>
      <AboutPage />
    </MemoryRouter>,
  );
}

describe("AboutPage", () => {
  it("quotes the mission text from the original page", () => {
    renderAboutPage();

    expect(
      screen.getByText(/Jedes Schiff braucht eine Crew/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Begleitet uns auf unserem Wellenritt/),
    ).toBeInTheDocument();
  });

  it("shows the team photo in large format with a descriptive alt text", () => {
    renderAboutPage();

    const photo = screen.getByAltText("Das Team von EquiCrew");

    expect(photo).toBeInTheDocument();
    expect(photo).toHaveAttribute("loading", "lazy");
  });

  it("offers the two hero calls to action", () => {
    renderAboutPage();

    expect(
      screen.getByRole("link", { name: "Kontakt aufnehmen" }),
    ).toHaveAttribute("href", "/kontakt");
    expect(screen.getByRole("link", { name: "EquiCube" })).toHaveAttribute(
      "href",
      "/equicube",
    );
  });

  it("shows a founder card for every crew member with role, name and mailto link", () => {
    renderAboutPage();

    expect(screen.getAllByText("Founder")).toHaveLength(3);

    for (const member of team) {
      expect(
        screen.getByRole("heading", { level: 3, name: member.name }),
      ).toBeInTheDocument();
      expect(
        screen.getByAltText(
          `Portrait von ${member.name}, ${member.role} bei EquiCrew`,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: member.email }),
      ).toHaveAttribute("href", `mailto:${member.email}`);
    }
  });
});
