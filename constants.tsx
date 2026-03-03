
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
    isMegaMenu: true,
    submenu: [
      { label: 'Om oss', href: '#', icon: 'building', iconBg: '#3B82F6', description: 'Historien og visjonen vår' },
      { label: 'Nyheter', href: '#', icon: 'newspaper', iconBg: '#10B981', description: 'Siste nytt fra klubben' },
      { label: 'Medlemskap', href: '#', icon: 'users', iconBg: '#8B5CF6', description: 'Bli en del av fellesskapet' },
      { label: 'Styret', href: '#', icon: 'briefcase', iconBg: '#F97316', description: 'Ledelse og organisasjon' },
      { label: 'Anlegg', href: '#', icon: 'mapPin', iconBg: '#F59E0B', description: 'Baner og fasiliteter' },
      { label: 'Dokumenter', href: '#', icon: 'document', iconBg: '#14B8A6', description: 'Referater og protokoller' },
      { label: 'Arrangementer', href: '#', icon: 'ticket', iconBg: '#EC4899', description: 'Cuper, turneringer og events' },
      { label: 'Kamper & resultater', href: '#', icon: 'calendar', iconBg: '#EF4444', description: 'Kommende og spilte kamper' },
    ]
  },
  { 
    label: 'Sport', 
    href: '#', 
    hasSubmenu: true,
    isMegaMenu: true,
    submenu: [
      { 
        label: 'Fotball', 
        href: '#',
        icon: 'football',
        iconSrc: '/icons/fotball.svg',
        iconBg: '#22C55E',
        description: 'Lag, kamper og treningstider',
        hasNested: true,
        items: [
          { label: 'Lagsoversikt', href: '#', icon: 'list', iconBg: '#E0F2FE' },
          { label: 'Treningstider', href: '#', icon: 'clock', iconBg: '#FEF3C7' },
          { label: 'Sportsplan', href: '#', icon: 'clipboard', iconBg: '#F3E8FF' },
        ]
      },
      { 
        label: 'Håndball', 
        href: '#',
        icon: 'handball',
        iconSrc: '/icons/haandball.svg',
        iconBg: '#F97316',
        description: 'Lag, kamper og treningstider',
        hasNested: true,
        items: [
          { label: 'Lagsoversikt', href: '#', icon: 'list', iconBg: '#E0F2FE' },
          { label: 'Treningstider', href: '#', icon: 'clock', iconBg: '#FEF3C7' },
          { label: 'Sportsplan', href: '#', icon: 'clipboard', iconBg: '#F3E8FF' },
        ]
      },
      { 
        label: 'Ski', 
        href: '#',
        icon: 'ski',
        iconSrc: '/icons/ski.svg',
        iconBg: '#3B82F6',
        description: 'Langrenn og alpint',
        hasNested: true,
        items: [
          { label: 'Lagsoversikt', href: '#', icon: 'list', iconBg: '#E0F2FE' },
          { label: 'Treningstider', href: '#', icon: 'clock', iconBg: '#FEF3C7' },
          { label: 'Sportsplan', href: '#', icon: 'clipboard', iconBg: '#F3E8FF' },
        ]
      },
      { 
        label: 'Allidrett', 
        href: '#',
        icon: 'running',
        iconSrc: '/icons/allidrett.svg',
        iconBg: '#A855F7',
        description: 'Aktiviteter for alle aldersgrupper',
        hasNested: true,
        items: [
          { label: 'Lagsoversikt', href: '#', icon: 'list', iconBg: '#E0F2FE' },
          { label: 'Treningstider', href: '#', icon: 'clock', iconBg: '#FEF3C7' },
          { label: 'Sportsplan', href: '#', icon: 'clipboard', iconBg: '#F3E8FF' },
        ]
      },
    ]
  },
  { 
    label: 'Sponsor', 
    href: '#', 
    hasSubmenu: true,
    isMegaMenu: true,
    submenu: [
      { label: 'Sponsorinfo', href: '#', icon: 'handshake', iconBg: '#EC4899', description: 'Våre samarbeidspartnere' },
      { label: 'Bli sponsor', href: '#', icon: 'star', iconBg: '#F59E0B', description: 'Støtt klubben og bli synlig' },
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
