import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { ImprintPage } from "./ImprintPage";
import { imprint } from "../content/imprint";

function renderPage() {
  return render(
    <MemoryRouter>
      <ImprintPage />
    </MemoryRouter>,
  );
}

describe("ImprintPage", () => {
  it("renders the company and full postal address", () => {
    renderPage();

    expect(screen.getByRole("heading", { level: 1, name: "Impressum" })).toBeInTheDocument();
    expect(screen.getAllByText(imprint.companyName).length).toBeGreaterThan(0);

    const address = document.querySelector("address");
    expect(address).not.toBeNull();
    expect(address?.textContent).toContain("Marktplatz 14,");
    expect(address?.textContent).toContain("4310 Mauthausen,");
    expect(address?.textContent).toContain("Österreich");
  });

  it("renders contact details as working tel and mailto links", () => {
    renderPage();

    expect(screen.getByRole("link", { name: imprint.phone })).toHaveAttribute(
      "href",
      imprint.phoneHref,
    );
    expect(screen.getByRole("link", { name: imprint.email })).toHaveAttribute(
      "href",
      imprint.emailHref,
    );
  });

  it("renders the company register and representation details", () => {
    renderPage();

    expect(screen.getByText("FN 648043 f")).toBeInTheDocument();
    expect(screen.getByText("Wien")).toBeInTheDocument();
    expect(
      screen.getByText("Entwicklung von innovativen und nachhaltigen Produkten."),
    ).toBeInTheDocument();
    expect(screen.getByText("ATU82132979")).toBeInTheDocument();

    expect(screen.getByText(/Hochstöger Michael/)).toBeInTheDocument();
    expect(screen.getByText(/Hinterdorfer Christian/)).toBeInTheDocument();
    expect(screen.getByText(/Hinterreiter Christian/)).toBeInTheDocument();
  });

  it("sets the page title, meta description and Open-Graph data", () => {
    renderPage();

    expect(document.title).toBe("Impressum | equicrew");
    expect(
      document.head.querySelector('meta[name="description"]')?.getAttribute("content"),
    ).toContain("EquiCrew FlexCo");
    expect(
      document.head.querySelector('meta[property="og:url"]')?.getAttribute("content"),
    ).toBe("https://www.equicrew.com/impressum");
    expect(
      document.head.querySelector('meta[property="og:image"]')?.getAttribute("content"),
    ).toBeTruthy();
  });

  it("links to the contact page from the representation block", () => {
    renderPage();

    expect(screen.getByRole("link", { name: "Kontakt aufnehmen" })).toHaveAttribute(
      "href",
      "/kontakt",
    );
  });
});
