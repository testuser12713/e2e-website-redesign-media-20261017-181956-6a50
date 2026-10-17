import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { Footer } from "./Footer";

function renderFooter() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Footer />
    </MemoryRouter>,
  );
}

describe("Footer", () => {
  it("shows the contact band with address, phone and e-mail", () => {
    renderFooter();

    expect(
      screen.getByText("Marktplatz 14, 4310 Mauthausen, Österreich"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "+43 650 4593 129" }),
    ).toHaveAttribute("href", "tel:+436504593129");
    expect(
      screen.getByRole("link", { name: "office@equicrew.com" }),
    ).toHaveAttribute("href", "mailto:office@equicrew.com");
  });

  it("links the contact page and the imprint", () => {
    renderFooter();

    expect(screen.getByRole("link", { name: "Kontakt aufnehmen" })).toHaveAttribute(
      "href",
      "/kontakt",
    );
    expect(screen.getByRole("link", { name: "Kontakt" })).toHaveAttribute(
      "href",
      "/kontakt",
    );

    const imprintLinks = screen.getAllByRole("link", { name: "Impressum" });

    expect(imprintLinks.length).toBeGreaterThanOrEqual(1);
    for (const link of imprintLinks) {
      expect(link).toHaveAttribute("href", "/impressum");
    }
  });

  it("links the LinkedIn and Instagram profiles", () => {
    renderFooter();

    const linkedInLinks = screen.getAllByRole("link", { name: /LinkedIn/i });
    const instagramLinks = screen.getAllByRole("link", { name: /Instagram/i });

    expect(linkedInLinks.length).toBeGreaterThanOrEqual(1);
    expect(instagramLinks.length).toBeGreaterThanOrEqual(1);

    for (const link of linkedInLinks) {
      expect(link).toHaveAttribute(
        "href",
        "https://www.linkedin.com/company/equicrew/",
      );
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }

    for (const link of instagramLinks) {
      expect(link).toHaveAttribute(
        "href",
        "https://www.instagram.com/equicrew/",
      );
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("shows the copyright", () => {
    renderFooter();

    expect(screen.getByText("© EquiCrew FlexCo 2025")).toBeInTheDocument();
  });
});
