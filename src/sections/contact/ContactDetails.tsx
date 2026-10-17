import { Reveal } from "../../components/Reveal";
import { site } from "../../content/site";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.96 1.96 0 1 0 5.25 6.92 1.96 1.96 0 0 0 5.25 3ZM20.44 13.32c0-3.29-1.76-4.82-4.1-4.82-1.89 0-2.74 1.04-3.21 1.77V8.5H9.75V20h3.38v-6.42c0-1.69.32-3.33 2.42-3.33 2.07 0 2.1 1.94 2.1 3.44V20h3.38v-6.68h-.59Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SocialIcon({ label }: { label: string }) {
  if (label === "LinkedIn") {
    return <LinkedInIcon />;
  }

  if (label === "Instagram") {
    return <InstagramIcon />;
  }

  return <span aria-hidden="true">{label.slice(0, 1)}</span>;
}

export function ContactDetails() {
  const addressLines = site.address.split(",").map((line) => line.trim());

  return (
    <Reveal className="contact-panel">
      <section aria-labelledby="contact-details-title" data-od-id="contact-details">
        <p className="contact-panel__label">Direkter Draht</p>
        <h2 id="contact-details-title">So erreichst du uns!</h2>

        <div className="contact-detail">
          <span className="contact-detail__label">Adresse</span>
          <p className="contact-detail__value">
            {addressLines.map((line, index) => (
              <span key={line}>
                {line}
                {index < addressLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
        </div>

        <div className="contact-detail">
          <span className="contact-detail__label">Telefonnummer</span>
          <p className="contact-detail__value">
            <a href={site.phoneHref}>{site.phone}</a>
          </p>
        </div>

        <div className="contact-detail">
          <span className="contact-detail__label">Email</span>
          <p className="contact-detail__value">
            <a href={site.emailHref}>{site.email}</a>
          </p>
        </div>

        <div className="contact-detail">
          <span className="contact-detail__label">Social Media</span>
          <div className="social-row">
            {site.social.map((social) => (
              <a
                key={social.label}
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
        </div>
      </section>
    </Reveal>
  );
}

export default ContactDetails;
