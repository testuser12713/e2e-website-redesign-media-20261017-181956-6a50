import type { Advantage, Kpi } from "./types";

export const productDescription =
  "Der EquiCube ist eine innovative Heiztechnikanlage speziell entwickelt für Einfamilienhäuser. Er kombiniert Luft-Wasser-Wärmepumpen-Technik, Batterietechnik, PV-Technik, KI- und Server-Technik in einem einzigen, effizienten System.";

export const kpis: Kpi[] = [
  { id: "basis-cube", label: "Standardisierter Basis-Cube" },
  { id: "modular", label: "Modular anpassbar" },
  { id: "heizungsarten", label: "Für Fußboden- & Radiatorenheizung" },
  { id: "heizleistung", label: "Heizleistung: bis 40 kW" },
];

export interface KpiDetail {
  index: string;
  description: string;
}

export const kpiDetails: Record<string, KpiDetail> = {
  "basis-cube": {
    index: "01 / System",
    description: "Schluss mit hochkomplexen Heizungssystemen!",
  },
  modular: {
    index: "02 / Ausbau",
    description: "Spezielle Anforderungen? Trotzdem kein Problem!",
  },
  heizungsarten: {
    index: "03 / Heizung",
    description: "Der Cube passt - garantiert!",
  },
  heizleistung: {
    index: "04 / Leistung",
    description: "Dein EquiCube hält dich warm - versprochen.",
  },
};

export const advantages: Advantage[] = [
  {
    id: "schnelle-installation",
    title: "Schnelle Installation: >2h",
    description: "",
  },
  {
    id: "wartbarkeit",
    title: "Einfache Wartbarkeit",
    description: "",
  },
  {
    id: "inbetriebnahme",
    title: "Einfache Installation & Inbetriebnahme",
    description: "",
  },
  {
    id: "komponenten",
    title: "Abgestimmte Komponenten",
    description: "Heizungs & Energiespeichersystem aus einer Hand",
  },
  {
    id: "platzbedarf",
    title: "Minimierter Platzbedarf",
    description: "",
  },
];

export const advantagesIntro =
  "Das innovative Konzept hinter dem EquiCube vereint eine Vielzahl an Vorteilen, die konventionelle Heizungssysteme nicht bieten.";
