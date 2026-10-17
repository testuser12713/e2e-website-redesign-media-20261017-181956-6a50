import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";

interface PageExpectation {
  path: string;
  title: string;
  description: string;
}

const pages: PageExpectation[] = [
  {
    path: "/",
    title: "EquiCrew | smarte energie – fair verteilte KI",
    description:
      "smarte energie - fair verteilte KI: EquiCrew entwickelt nachhaltige Energie- und KI-Lösungen. Entdecke den EquiCube für Einfamilienhäuser.",
  },
  {
    path: "/equicube",
    title: "EquiCube | equicrew",
    description:
      "Der EquiCube vereint Wärmepumpe, Batterie, Pufferspeicher und KI-Recheneinheit in einem System – die Heiztechnikanlage für Einfamilienhäuser.",
  },
  {
    path: "/ueber-uns",
    title: "Über uns | equicrew",
    description:
      "Die Crew hinter EquiCrew: Michael Hochstöger, Christian Hinterdorfer und Christian Hinterreiter. Lerne das Team und die Mission kennen.",
  },
  {
    path: "/kontakt",
    title: "Kontakt | equicrew",
    description:
      "Sprich mit EquiCrew in Mauthausen – per Telefon, E-Mail oder Kontaktformular. Wir freuen uns auf deine Nachricht.",
  },
  {
    path: "/impressum",
    title: "Impressum | equicrew",
    description:
      "Impressum der EquiCrew FlexCo, Marktplatz 14, 4310 Mauthausen, Österreich. Firmenbuch, UID-Nummer und Geschäftsführung.",
  },
];

const SITE_URL = "https://www.equicrew.com";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

function metaContent(attribute: "name" | "property", key: string): string | null {
  const element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );

  return element?.getAttribute("content") ?? null;
}

describe("App routing", () => {
  it.each(pages)(
    "renders $path inside the layout frame with its own metadata",
    async ({ path, title, description }) => {
      renderAt(path);

      await waitFor(() => expect(document.title).toBe(title));

      expect(screen.getByRole("main")).toBeInTheDocument();
      expect(document.querySelector("header.site-header")).toBeInTheDocument();
      expect(document.querySelector("footer.site-footer")).toBeInTheDocument();
      expect(metaContent("name", "description")).toBe(description);
      expect(metaContent("property", "og:title")).toBe(title);
      expect(metaContent("property", "og:description")).toBe(description);
      expect(metaContent("property", "og:url")).toBe(`${SITE_URL}${path}`);
      expect(metaContent("property", "og:image")).toMatch(
        new RegExp(`^${SITE_URL}/`),
      );
    },
  );

  it("redirects an unknown path to the home page", async () => {
    renderAt("/diese-seite-gibt-es-nicht");

    await waitFor(() =>
      expect(document.title).toBe(
        "EquiCrew | smarte energie – fair verteilte KI",
      ),
    );
    expect(document.querySelector("main")).toBeInTheDocument();
  });
});
