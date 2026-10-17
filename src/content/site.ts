import type { NavItem, SiteContact } from "./types";

export const navItems: NavItem[] = [
  { label: "Start", to: "/" },
  { label: "EquiCube", to: "/equicube" },
  { label: "Über uns", to: "/ueber-uns" },
  { label: "Kontakt", to: "/kontakt" },
];

export const site: SiteContact = {
  companyName: "EquiCrew FlexCo",
  address: "Marktplatz 14, 4310 Mauthausen, Österreich",
  phone: "+43 650 4593 129",
  phoneHref: "tel:+436504593129",
  email: "office@equicrew.com",
  emailHref: "mailto:office@equicrew.com",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/equicrew/" },
    { label: "Instagram", href: "https://www.instagram.com/equicrew/" },
  ],
  imprintPath: "/impressum",
  copyright: "© EquiCrew FlexCo 2025",
};
