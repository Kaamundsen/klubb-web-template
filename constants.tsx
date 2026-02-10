
import { NavItem, Sponsor, ClubTheme } from './types';

// Re-export NewsItem for convenience
export interface NewsItem {
  id: string;
  title: string;
  image: string;
  categories: string[];
  date?: string;
}

export const THEMES: Record<string, ClubTheme> = {
  default: {
    primary: '#003366',
    accent: '#e31b23',
    sidebar: '#002244',
  }
};

export const NAV_ITEMS: any[] = [
  { label: 'Hjem', href: '#' },
  { 
    label: 'Klubben', 
    href: '#', 
    hasSubmenu: true,
    submenu: [
      { label: 'Om oss', href: '#' },
      { label: 'Medlemskap', href: '#' },
      { label: 'Styret', href: '#' },
      { label: 'Anlegg', href: '#' },
      { label: 'Dokumenter', href: '#' },
    ]
  },
  { 
    label: 'Sport', 
    href: '#', 
    hasSubmenu: true,
    submenu: [
      { 
        label: 'Fotball', 
        href: '#',
        hasNested: true,
        items: [
          { label: 'Lagsoversikt', href: '#' },
          { label: 'Treningstider', href: '#' },
          { label: 'Sportslig plan', href: '#' },
        ]
      },
      { 
        label: 'Håndball', 
        href: '#',
        hasNested: true,
        items: [
          { label: 'Lagsoversikt', href: '#' },
          { label: 'Treningstider', href: '#' },
          { label: 'Sportslig plan', href: '#' },
        ]
      },
      { 
        label: 'Ski', 
        href: '#',
        hasNested: true,
        items: [
          { label: 'Lagsoversikt', href: '#' },
          { label: 'Treningstider', href: '#' },
          { label: 'Sportslig plan', href: '#' },
        ]
      },
      { 
        label: 'Allidrett', 
        href: '#',
        hasNested: true,
        items: [
          { label: 'Lagsoversikt', href: '#' },
          { label: 'Treningstider', href: '#' },
          { label: 'Sportslig plan', href: '#' },
        ]
      },
    ]
  },
  { 
    label: 'Sponsor', 
    href: '#', 
    hasSubmenu: true,
    submenu: [
      { label: 'Sponsorinfo', href: '#' },
    ]
  },
  { label: 'Kontakt', href: '#' },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: '1',
    title: 'Nyhet med video',
    image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=800',
    categories: ['Klubben', 'Video']
  },
  {
    id: '2',
    title: 'Ola Nordmann er månedens ildsjel',
    image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=800',
    categories: ['Klubben', 'Fremsnakk']
  },
  {
    id: '3',
    title: 'Innkalling til ordinært årsmøte',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    categories: ['Klubben', 'Turnering']
  },
  {
    id: '4',
    title: 'Fotballskolen er i gang',
    image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?auto=format&fit=crop&q=80&w=800',
    categories: ['Gruppeside en', 'Årsmøte']
  }
];

export const SPONSORS: Sponsor[] = [
  { name: 'SpareBank 1', logo: 'https://seeklogo.com/images/S/sparebank-1-logo-877B6347A4-seeklogo.com.png', type: 'main' }
];
