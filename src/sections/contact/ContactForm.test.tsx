import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "./ContactForm";

function getFields() {
  return {
    vorname: screen.getByLabelText("Vorname"),
    nachname: screen.getByLabelText("Nachname"),
    email: screen.getByLabelText("Email"),
    nachricht: screen.getByLabelText("Deine Nachricht"),
  };
}

async function fillValidForm() {
  const fields = getFields();
  const user = userEvent.setup();

  await user.type(fields.vorname, "Max");
  await user.type(fields.nachname, "Mustermann");
  await user.type(fields.email, "max@beispiel.at");
  await user.type(fields.nachricht, "Ich interessiere mich für den EquiCube.");

  return user;
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ContactForm", () => {
  it("starts neutral without any error messages", () => {
    render(<ContactForm />);

    expect(screen.queryByText(/Bitte gib/i)).not.toBeInTheDocument();
    expect(screen.getByText("E-Mail-Programm geöffnet")).not.toBeVisible();
    expect(screen.getByLabelText("Vorname")).not.toHaveAttribute("aria-invalid", "true");
  });

  it("shows errors only after the user has typed or tried to submit", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const fields = getFields();

    await user.type(fields.vorname, "Max");
    expect(screen.queryByText("Bitte gib deinen Vornamen ein.")).not.toBeInTheDocument();

    await user.clear(fields.vorname);
    expect(screen.getByText("Bitte gib deinen Vornamen ein.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Senden/i }));
    expect(screen.getByText("Bitte gib deinen Nachnamen ein.")).toBeInTheDocument();
    expect(screen.getByText("Bitte schreib uns eine Nachricht.")).toBeInTheDocument();
    expect(screen.getByText("Bitte prüfe die markierten Felder.")).toBeInTheDocument();
  });

  it("names an invalid e-mail address directly at the field", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const { email } = getFields();

    await user.type(email, "max@");
    await user.tab();

    const message = screen.getByText(
      "Bitte gib eine gültige E-Mail-Adresse ein, z. B. name@beispiel.at.",
    );

    expect(message).toBeInTheDocument();
    expect(message).toHaveAttribute("id", "error-email");
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveAttribute("aria-describedby", "error-email");
  });

  it("builds the mailto target on a valid submit and shows the confirmation", async () => {
    let openedHref = "";
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (
      this: HTMLAnchorElement,
    ) {
      openedHref = this.getAttribute("href") ?? "";
    });

    render(<ContactForm />);
    const user = await fillValidForm();

    await user.click(screen.getByRole("button", { name: /Senden/i }));

    expect(openedHref.startsWith("mailto:office@equicrew.com?")).toBe(true);
    expect(openedHref).toContain(encodeURIComponent("Anfrage über equicrew.com – Max Mustermann"));
    expect(openedHref).toContain(encodeURIComponent("Max Mustermann"));
    expect(openedHref).toContain(
      encodeURIComponent("Ich interessiere mich für den EquiCube."),
    );
    expect(openedHref).not.toMatch(/Bitte prüfe/);

    expect(screen.getByText("E-Mail-Programm geöffnet")).toBeInTheDocument();
    expect(
      screen.getByText(/wurde mit der vorbereiteten Nachricht an office@equicrew\.com geöffnet/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Es wurde noch nichts versendet oder gespeichert\./i),
    ).toBeInTheDocument();
  });
});
