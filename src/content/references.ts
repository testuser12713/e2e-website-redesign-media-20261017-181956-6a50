import type { Reference } from "./types";
import { references as referenceImages } from "../assets/images";

const [neubauImage, sanierungImage, pvImage] = referenceImages;

export const references: Reference[] = [
  {
    id: "neubau",
    title: "Einfamilienhaus-Neubau",
    badge: "Neubau",
    image: neubauImage,
    specs: [
      { label: "Gebäudetyp", value: "Einfamilienhaus" },
      { label: "Heizungsart", value: "Fußbodenheizung" },
      { label: "Heizleistung", value: "bis 40 kW" },
    ],
  },
  {
    id: "sanierung",
    title: "Sanierung mit Radiatorheizung",
    badge: "Sanierung",
    image: sanierungImage,
    specs: [
      { label: "Gebäudetyp", value: "Einfamilienhaus" },
      { label: "Heizungsart", value: "Radiatorheizung" },
      { label: "Heizleistung", value: "bis 40 kW" },
    ],
  },
  {
    id: "pv-einbindung",
    title: "Objekt mit PV-Einbindung",
    badge: "PV-Einbindung",
    image: pvImage,
    specs: [
      { label: "Gebäudetyp", value: "Einfamilienhaus" },
      { label: "Heizungsart", value: "Fußbodenheizung" },
      { label: "Heizleistung", value: "bis 40 kW" },
    ],
  },
];
