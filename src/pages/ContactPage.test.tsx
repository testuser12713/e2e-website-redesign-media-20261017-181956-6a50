import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { ContactPage } from "./ContactPage";

function renderPage() {
  return render(
    <MemoryRouter initialEntries={["/kontakt"]}>
      <ContactPage />
    </MemoryRouter>,
  );
}

describe("ContactPage", () => {
  it("shows the page title and intro", () => {
    renderPage();

    expect(screen.getByRole("heading", { level: 1, name: "Kontakt" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "Schreib uns - wir erzählen dir gerne mehr über den EquiCube und deine Möglichkeiten.",
      ),
    ).toBeInTheDocument();
  });

  it("shows the contact details with address, phone and e-mail", () => {
    renderPage();

    expect(screen.getByText("So erreichst du uns!")).toBeInTheDocument();
    expect(screen.getByText("Marktplatz 14")).toBeInTheDocument();
    expect(screen.getByText("4310 Mauthausen")).toBeInTheDocument();
    expect(screen.getByText("Österreich")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "+43 650 4593 129" })).toHaveAttribute(
      "href",
      "tel:+436504593129",
    );

    const mailLinks = screen.getAllByRole("link", { name: "office@equicrew.com" });

    expect(mailLinks.length).toBeGreaterThanOrEqual(1);
    for (const link of mailLinks) {
      expect(link).toHaveAttribute("href", "mailto:office@equicrew.com");
    }
  });

  it("links the LinkedIn and Instagram profiles", () => {
    renderPage();

    expect(
      screen.getByRole("link", { name: "EquiCrew auf LinkedIn" }),
    ).toHaveAttribute("href", "https://www.linkedin.com/company/equicrew/");
    expect(
      screen.getByRole("link", { name: "EquiCrew auf Instagram" }),
    ).toHaveAttribute("href", "https://www.instagram.com/equicrew/");
  });

  it("shows the form with all four fields", () => {
    renderPage();

    expect(screen.getByLabelText("Vorname")).toBeInTheDocument();
    expect(screen.getByLabelText("Nachname")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Deine Nachricht")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Senden/i })).toBeInTheDocument();
    expect(screen.queryByText(/Bitte gib/i)).not.toBeInTheDocument();
  });
});
