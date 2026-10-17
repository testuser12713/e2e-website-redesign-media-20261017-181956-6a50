import type { JSX } from "react";
import { Link } from "react-router-dom";
import { site } from "../content/site";

interface FooterProps {
  contactTitleId?: string;
}

function SocialIcon({ label }: { label: string }) {
  if (label === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.96 1.96 0 1 0 5.25 6.92 1.96 1.96 0 0 0 5.25 3ZM20.44 13.32c0-3.29-1.76-4.82-4.1-4.82-1.89 0-2.74 1.04-3.21 1.77V8.5H9.75V20h3.38v-6.42c0-1.69.32-3.33 2.42-3.33 2.07 0 2.1 1.94 2.1 3.44V20h3.38v-6.68h-.59Z" />
      </svg>
    );
  }

  if (label === "Instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="btn__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function Footer({
  contactTitleId = "footer-contact-title",
}: FooterProps): JSX.Element {
  return (
    <footer className="site-footer" data-site-footer data-od-id="site-footer">
      <section className="contact-band" aria-labelledby={contactTitleId}>
        <div className="container contact-band__inner">
          <div className="contact-band__copy">
            <p className="eyebrow eyebrow--light">Kontakt</p>
            <h2 className="contact-band__title" id={contactTitleId}>
              Neugierig geworden?
              <br />
              <span>Schreib uns.</span>
            </h2>
            <p className="contact-band__lead">
              Schreib uns - wir erzählen dir gerne mehr!
            </p>
            <Link
              className="btn btn--primary"
              to="/kontakt"
              data-od-id="footer-contact-cta"
            >
              Kontakt aufnehmen
              <ArrowIcon />
            </Link>
          </div>
          <div className="contact-band__details">
            <address>{site.address}</address>
            <a href={site.phoneHref}>{site.phone}</a>
            <a href={site.emailHref}>{site.email}</a>
            <div className="contact-band__socials">
              {site.social.map((social) => (
                <a
                  key={social.href}
                  className="social-link"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`EquiCrew auf ${social.label}`}
                >
                  <SocialIcon label={social.label} />
                </a>
              ))}
            </div>
            <p className="contact-band__links">
              <Link to="/kontakt">Kontakt</Link>
              <span aria-hidden="true">·</span>
              <Link to={site.imprintPath}>Impressum</Link>
            </p>
          </div>
        </div>
      </section>
      <div className="container footer-bottom">
        <Link
          className="footer-bottom__brand"
          to="/"
          aria-label="equicrew – Startseite"
        >
          <img src="/favicon.svg" alt="" width={22} height={22} />
          <span>equicrew</span>
        </Link>
        <div className="footer-bottom__links">
          <Link to={site.imprintPath}>Impressum</Link>
          {site.social.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.label}
            </a>
          ))}
        </div>
        <p>{site.copyright}</p>
      </div>
    </footer>
  );
}

export default Footer;
