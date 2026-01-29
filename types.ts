
export interface NewsItem {
  id: string;
  title: string;
  image: string;
  categories: string[];
  date?: string;
}

export interface NavItem {
  label: string;
  href: string;
  hasSubmenu?: boolean;
}

export interface Sponsor {
  name: string;
  logo: string;
  type: 'main' | 'regular';
}

export interface ClubTheme {
  primary: string;
  accent: string;
  sidebar: string;
}
