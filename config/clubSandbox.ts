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
      horizontal: '/assets/msfotball-logo.svg',
      vertical: '/assets/msfotball-logo.svg',
    },
  },

  // DFI - Drammen Fotballklubb International
  {
    id: 'dfi',
    name: 'DFI',
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
      horizontal: 'https://dfi.no/media/logo/dfi-logo.png',
      vertical: 'https://dfi.no/media/logo/dfi-logo.png',
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
      horizontal: 'https://kolbotnil.no/media/logo/kolbotn-logo.png',
      vertical: 'https://kolbotnil.no/media/logo/kolbotn-logo.png',
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
      horizontal: 'https://honefossbk.no/media/logo/hbk-logo.png',
      vertical: 'https://honefossbk.no/media/logo/hbk-logo.png',
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
      horizontal: 'https://ulkisa.no/media/logo/ulkisa-logo.png',
      vertical: 'https://ulkisa.no/media/logo/ulkisa-logo.png',
    },
  },
];

// Hent klubb basert på ID
export function getClubById(id: string): ClubConfig {
  return SANDBOX_CLUBS.find(club => club.id === id) || MASTER_CONFIG;
}

// Hent klubb basert på domene
export function getClubByDomain(domain: string): ClubConfig {
  return SANDBOX_CLUBS.find(club => club.domain === domain) || MASTER_CONFIG;
}

// Liste over alle tilgjengelige klubb-IDer
export function getAvailableClubIds(): string[] {
  return SANDBOX_CLUBS.map(club => club.id);
}
