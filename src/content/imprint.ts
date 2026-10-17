export interface ImprintRegister {
  number: string;
  court: string;
  purpose: string;
  uid: string;
}

export interface ImprintContent {
  companyName: string;
  addressLines: string[];
  address: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  register: ImprintRegister;
  directorsLabel: string;
  directors: string;
  contactCta: string;
  contactPath: string;
}

export const imprint: ImprintContent = {
  companyName: "EquiCrew FlexCo",
  addressLines: ["Marktplatz 14,", "4310 Mauthausen,", "Österreich"],
  address: "Marktplatz 14, 4310 Mauthausen, Österreich",
  phone: "+43 650 4593 129",
  phoneHref: "tel:+436504593129",
  email: "office@equicrew.com",
  emailHref: "mailto:office@equicrew.com",
  register: {
    number: "FN 648043 f",
    court: "Wien",
    purpose: "Entwicklung von innovativen und nachhaltigen Produkten.",
    uid: "ATU82132979",
  },
  directorsLabel: "Geschäftsführer",
  directors:
    "Hochstöger Michael, Dipl. Ing. (FH) Hinterdorfer Christian, Hinterreiter Christian",
  contactCta: "Kontakt aufnehmen",
  contactPath: "/kontakt",
};
