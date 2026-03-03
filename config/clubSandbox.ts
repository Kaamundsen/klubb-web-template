// Test-klubber for utvikling og validering av designet
// Legg til flere klubber her for å teste ulike fargepaletter
// VIKTIG: Bruk faktiske farger fra klubbenes nettsider på msfotball.no-plattformen

import { ClubConfig, MASTER_CONFIG } from './clubConfig';

export const SANDBOX_CLUBS: ClubConfig[] = [
  // Master-mal (klubbnettside.no) - alltid først
  MASTER_CONFIG,

  // MS Fotball (Manglerud Star) - hovedplattform
  // Farger hentet fra faktisk klubbnettside-konfigurasjon
  {
    id: 'msfotball',
    name: 'MS Fotball',
    domain: 'msfotball.no',
    template: 'v2',
    colors: {
      primary: '#007935',      // Grønn - overskrifter, tekst, meny
      accent: '#F9ED25',       // Gul - knapper, CTA, highlights
      accentLight: '#FFFF66',  // Lysere gul for hover
      dark: '#1a1a1a',         // Mørk bakgrunn for dark mode
      navy: '#006629',         // Mørkere grønn
      text: '#007935',         // Grønn - overskrifter (spenstig!)
      textOnPrimary: '#ffffff', // Hvit tekst på grønn bakgrunn
      textOnAccent: '#007935', // Grønn tekst på gul bakgrunn
    },
    logos: {
      horizontal: '/clubs/msfotball/logo.svg',
      vertical: '/clubs/msfotball/logo.svg',
    },
  },

  // DFI - Drammen Fotballklubb International
  {
    id: 'dfi',
    name: 'Drøbak Frogn IL',
    domain: 'dfi.no',
    template: 'v2',
    colors: {
      primary: '#003087',      // DFI blå
      accent: '#ffd700',       // DFI gul
      accentLight: '#ffe44d',
      dark: '#001a4d',
      navy: '#002266',
    },
    logos: {
      horizontal: '/clubs/dfi/DFI_Logo-horisontal.png',
      vertical: '/clubs/dfi/DFI_Logo-vertikal.png',
    },
  },

  // Kolbotn IL
  {
    id: 'kolbotn',
    name: 'Kolbotn IL',
    domain: 'kolbotnil.no',
    template: 'v2',
    colors: {
      primary: '#006633',      // Kolbotn grønn
      accent: '#ffffff',       // Hvit
      accentLight: '#e6f5ec',
      dark: '#003d1f',
      navy: '#004d26',
    },
    logos: {
      horizontal: '/clubs/kolbotn/Kolbotn-Logo.png',
      vertical: '/clubs/kolbotn/Kolbotn-Logo.png',
    },
  },

  // Hønefoss BK
  {
    id: 'honefoss',
    name: 'Hønefoss BK',
    domain: 'honefossbk.no',
    template: 'v2',
    colors: {
      primary: '#cc0000',      // HBK rød
      accent: '#000000',       // Sort
      accentLight: '#ff3333',
      dark: '#1a0000',
      navy: '#990000',
    },
    logos: {
      horizontal: '/clubs/honefoss/logo-2.png',
      vertical: '/clubs/honefoss/logo-2.png',
    },
  },

  // Ullensaker/Kisa IL
  {
    id: 'ulkisa',
    name: 'Ullensaker/Kisa IL',
    domain: 'ulkisa.no',
    template: 'v2',
    colors: {
      primary: '#ffd700',      // Gul
      accent: '#000080',       // Mørk blå
      accentLight: '#ffe44d',
      dark: '#1a1a00',
      navy: '#000066',
    },
    logos: {
      horizontal: '/clubs/ulkisa/Ullkisa-Logo.png',
      vertical: '/clubs/ulkisa/Ullkisa-Logo.png',
    },
  },
];

const CUSTOM_CLUBS_KEY = 'klubb-custom-clubs';

export function getCustomClubs(): ClubConfig[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(CUSTOM_CLUBS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}

export function saveCustomClub(club: ClubConfig): void {
  const existing = getCustomClubs();
  const idx = existing.findIndex(c => c.id === club.id);
  if (idx >= 0) {
    existing[idx] = club;
  } else {
    existing.push(club);
  }
  localStorage.setItem(CUSTOM_CLUBS_KEY, JSON.stringify(existing));
}

export function removeCustomClub(clubId: string): void {
  const existing = getCustomClubs().filter(c => c.id !== clubId);
  localStorage.setItem(CUSTOM_CLUBS_KEY, JSON.stringify(existing));
}

function getAllClubs(): ClubConfig[] {
  return [...SANDBOX_CLUBS, ...getCustomClubs()];
}

export function getClubById(id: string): ClubConfig {
  return getAllClubs().find(club => club.id === id) || MASTER_CONFIG;
}

export function getClubByDomain(domain: string): ClubConfig {
  return getAllClubs().find(club => club.domain === domain) || MASTER_CONFIG;
}

export function getAvailableClubIds(): string[] {
  return getAllClubs().map(club => club.id);
}
