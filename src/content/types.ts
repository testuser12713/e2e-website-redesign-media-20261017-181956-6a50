export interface NavItem {
  label: string;
  to: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface SiteContact {
  companyName: string;
  address: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  social: SocialLink[];
  imprintPath: string;
  copyright: string;
}

export interface ImageAsset {
  avif: string;
  webp: string;
  fallback: string;
  width: number;
  height: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  portrait: ImageAsset;
}

export interface Advantage {
  id: string;
  title: string;
  description: string;
}

export interface Kpi {
  id: string;
  label: string;
  value?: string;
}

export interface CubePart {
  id: string;
  name: string;
  description: string;
}

export interface Reference {
  id: string;
  title: string;
  image: ImageAsset;
  badge?: string;
  specs: { label: string; value: string }[];
}
