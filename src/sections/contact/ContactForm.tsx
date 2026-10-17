import { useEffect, useRef, useState, type FormEvent } from "react";
import { Reveal } from "../../components/Reveal";
import { site } from "../../content/site";

type FieldName = "vorname" | "nachname" | "email" | "nachricht";

type FormValues = Record<FieldName, string>;

const EMPTY_VALUES: FormValues = {
  vorname: "",
  nachname: "",
  email: "",
  nachricht: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateField(name: FieldName, value: string): string {
  const trimmed = value.trim();

  if (name === "email") {
    if (!trimmed) {
      return "Bitte gib deine E-Mail-Adresse ein.";
    }

    if (!EMAIL_PATTERN.test(trimmed)) {
      return "Bitte gib eine gültige E-Mail-Adresse ein, z. B. name@beispiel.at.";
    }

    return "";
  }

  if (!trimmed) {
    if (name === "nachricht") {
      return "Bitte schreib uns eine Nachricht.";
    }

    return name === "vorname"
      ? "Bitte gib deinen Vornamen ein."
      : "Bitte gib deinen Nachnamen ein.";
  }

  return "";
}

function buildMailtoHref(values: FormValues): string {
  const fullName = `${values.vorname.trim()} ${values.nachname.trim()}`;
  const subject = `Anfrage über equicrew.com – ${fullName}`;
  const body =
    `Hallo EquiCrew,\n\n` +
    `mein Name ist ${fullName}.\n` +
    `E-Mail: ${values.email.trim()}\n\n` +
    `${values.nachricht.trim()}\n\n` +
    `Viele Grüße\n${fullName}`;

  return `${site.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [touched, setTouched] = useState<Record<FieldName, boolean>>({
    vorname: false,
    nachname: false,
    email: false,
    nachricht: false,
  });
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [opened, setOpened] = useState(false);
  const [status, setStatus] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  const errors: Record<FieldName, string> = {
    vorname: validateField("vorname", values.vorname),
    nachname: validateField("nachname", values.nachname),
    email: validateField("email", values.email),
    nachricht: validateField("nachricht", values.nachricht),
  };

  const visibleError = (name: FieldName): string =>
    touched[name] || submitAttempted ? errors[name] : "";

  useEffect(() => {
    if (opened) {
      successRef.current?.focus();
    }
  }, [opened]);

  const handleChange = (name: FieldName, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    setTouched((current) => ({ ...current, [name]: true }));
    setStatus("");
    setOpened(false);
  };

  const openMailClient = (href: string) => {
    const link = document.createElement("a");
    link.href = href;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);
    setOpened(false);

    const invalidField = (Object.keys(errors) as FieldName[]).find((name) => errors[name]);

    if (invalidField) {
      setStatus("Bitte prüfe die markierten Felder.");
      const input = document.getElementById(`contact-${invalidField}`);
      input?.focus();
      return;
    }

    setStatus("");
    openMailClient(buildMailtoHref(values));
    setOpened(true);
  };

  const fieldError = (name: FieldName) => visibleError(name);

  return (
    <Reveal className="form-card" delay={80}>
      <section aria-labelledby="contact-form-title" data-od-id="contact-form">
        <div className="form-card__head">
          <p className="eyebrow">Kontaktformular</p>
          <h2 id="contact-form-title">Schreib uns.</h2>
          <p>
            Alle Felder sind Pflichtfelder. Beim Absenden öffnet sich dein E-Mail-Programm mit
            der vorbereiteten Nachricht.
          </p>
        </div>
        <form data-contact-form noValidate onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field">
              <label className="field__label" htmlFor="contact-vorname">
                Vorname
              </label>
              <input
                className="field__control"
                id="contact-vorname"
                name="vorname"
                type="text"
                autoComplete="given-name"
                required
                value={values.vorname}
                onChange={(event) => handleChange("vorname", event.target.value)}
                aria-invalid={fieldError("vorname") ? "true" : undefined}
                aria-describedby="error-vorname"
              />
              <p className="field__error" id="error-vorname" hidden={!fieldError("vorname")}>
                {fieldError("vorname")}
              </p>
            </div>

            <div className="field">
              <label className="field__label" htmlFor="contact-nachname">
                Nachname
              </label>
              <input
                className="field__control"
                id="contact-nachname"
                name="nachname"
                type="text"
                autoComplete="family-name"
                required
                value={values.nachname}
                onChange={(event) => handleChange("nachname", event.target.value)}
                aria-invalid={fieldError("nachname") ? "true" : undefined}
                aria-describedby="error-nachname"
              />
              <p className="field__error" id="error-nachname" hidden={!fieldError("nachname")}>
                {fieldError("nachname")}
              </p>
            </div>

            <div className="field field--full">
              <label className="field__label" htmlFor="contact-email">
                Email
              </label>
              <input
                className="field__control"
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                value={values.email}
                onChange={(event) => handleChange("email", event.target.value)}
                aria-invalid={fieldError("email") ? "true" : undefined}
                aria-describedby="error-email"
              />
              <p className="field__error" id="error-email" hidden={!fieldError("email")}>
                {fieldError("email")}
              </p>
            </div>

            <div className="field field--full">
              <label className="field__label" htmlFor="contact-nachricht">
                Deine Nachricht
              </label>
              <textarea
                className="field__control"
                id="contact-nachricht"
                name="nachricht"
                rows={6}
                required
                value={values.nachricht}
                onChange={(event) => handleChange("nachricht", event.target.value)}
                aria-invalid={fieldError("nachricht") ? "true" : undefined}
                aria-describedby="error-nachricht"
              />
              <p className="field__error" id="error-nachricht" hidden={!fieldError("nachricht")}>
                {fieldError("nachricht")}
              </p>
            </div>
          </div>

          <p className="form-status" role="status" aria-live="polite">
            {status}
          </p>

          <div className="form-footer">
            <p className="form-note">
              Beim Absenden öffnet sich dein E-Mail-Programm. Es wird kein Versand und keine
              Speicherung auf dieser Website vorgenommen.
            </p>
            <button className="btn btn--primary" type="submit" data-od-id="contact-submit">
              Senden
              <svg
                className="btn__icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>

          <div
            className="form-success"
            role="status"
            aria-live="polite"
            tabIndex={-1}
            ref={successRef}
            hidden={!opened}
          >
            <h3>E-Mail-Programm geöffnet</h3>
            <p>
              Dein E-Mail-Programm wurde mit der vorbereiteten Nachricht an {site.email} geöffnet.
              Es wurde noch nichts versendet oder gespeichert.
            </p>
          </div>
        </form>
      </section>
    </Reveal>
  );
}

export default ContactForm;
