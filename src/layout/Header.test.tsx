import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";

const navLabels = ["Start", "EquiCube", "Über uns", "Kontakt"];

function renderHeader(path = "/") {
  const view = render(
    <MemoryRouter initialEntries={[path]}>
      <Header />
    </MemoryRouter>,
  );

  const layer = view.container.querySelector<HTMLElement>(".menu-layer");

  if (!layer) {
    throw new Error("The navigation layer was not rendered");
  }

  return { ...view, layer };
}

async function openMenu() {
  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: "Menü öffnen" }));
  return user;
}

describe("Header", () => {
  it("opens the navigation panel with all four points", async () => {
    const { layer } = renderHeader();

    expect(layer).not.toHaveClass("is-open");

    await openMenu();

    expect(layer).toHaveClass("is-open");
    expect(layer).toHaveAttribute("id", "mobile-navigation");

    const dialog = screen.getByRole("dialog", { name: "Hauptnavigation" });

    for (const label of navLabels) {
      expect(within(dialog).getByRole("link", { name: label })).toBeInTheDocument();
    }

    expect(document.body).toHaveClass("menu-open");
  });

  it("closes the panel on Escape and returns focus to the menu button", async () => {
    const { layer } = renderHeader();
    const user = await openMenu();

    await user.keyboard("{Escape}");

    expect(layer).not.toHaveClass("is-open");
    expect(document.body).not.toHaveClass("menu-open");
    expect(
      screen.getByRole("button", { name: "Menü öffnen" }),
    ).toHaveFocus();
  });

  it("closes the panel on a click beside it", async () => {
    const { layer } = renderHeader();
    const user = await openMenu();

    const scrim = layer.querySelector<HTMLElement>(".menu-scrim");

    if (!scrim) {
      throw new Error("The menu scrim was not rendered");
    }

    await user.click(scrim);

    expect(layer).not.toHaveClass("is-open");
    expect(document.body).not.toHaveClass("menu-open");
  });

  it("closes the panel and opens the chosen page on a selection", async () => {
    const { layer } = renderHeader();
    const user = await openMenu();

    const dialog = screen.getByRole("dialog", { name: "Hauptnavigation" });

    await user.click(within(dialog).getByRole("link", { name: "Kontakt" }));

    expect(layer).not.toHaveClass("is-open");

    const desktopNav = screen.getByRole("navigation", {
      name: "Hauptnavigation",
    });

    expect(
      within(desktopNav).getByRole("link", { name: "Kontakt" }),
    ).toHaveAttribute("aria-current", "page");
  });

  it("marks the active navigation point of the open page", () => {
    renderHeader("/equicube");

    const desktopNav = screen.getByRole("navigation", {
      name: "Hauptnavigation",
    });

    expect(
      within(desktopNav).getByRole("link", { name: "EquiCube" }),
    ).toHaveAttribute("aria-current", "page");
    expect(
      within(desktopNav).getByRole("link", { name: "Start" }),
    ).not.toHaveAttribute("aria-current");
  });

  it("only marks Start as active on the home page", () => {
    renderHeader("/");

    const desktopNav = screen.getByRole("navigation", {
      name: "Hauptnavigation",
    });

    expect(
      within(desktopNav).getByRole("link", { name: "Start" }),
    ).toHaveAttribute("aria-current", "page");
    expect(
      within(desktopNav).getByRole("link", { name: "EquiCube" }),
    ).not.toHaveAttribute("aria-current");
  });
});
