// Klubb-konfigurasjon interface og typer

export interface ClubColors {
  primary: string;      // Hovedfarge (meny-bakgrunn, overskrifter)
  accent: string;       // Aksentfarge (CTA-knapper, highlights)
  accentLight?: string; // Lysere variant av aksentfarge
  dark?: string;        // Mørk bakgrunn for dark mode
  navy?: string;        // Sekundær mørk farge
  text?: string;        // Tekstfarge for overskrifter (standard: primary)
  textOnPrimary?: string; // Tekstfarge på primary-bakgrunn (hvit eller sort)
  textOnAccent?: string;  // Tekstfarge på accent-bakgrunn (f.eks. grønn på gul)
}

export interface ClubLogos {
  horizontal: string;   // Bred logo for navbar
  vertical: string;     // Høy logo for hero/footer
}

export interface ClubConfig {
  id: string;
  name: string;
  domain: string;
  template: 'v1' | 'v2';
  colors: ClubColors;
  logos: ClubLogos;
}

// Master-mal farger (klubbnettside.no) - brukes som fallback
export const MASTER_COLORS: ClubColors = {
  primary: '#092c5c',
  accent: '#e5003c',
  accentLight: '#ff1a57',
  dark: '#0b0e14',
  navy: '#0f2e58',
};

// Master-mal konfigurasjon
export const MASTER_CONFIG: ClubConfig = {
  id: 'master',
  name: 'Klubbnettside',
  domain: 'klubbnettside.no',
  template: 'v2',
  colors: MASTER_COLORS,
  logos: {
    horizontal: '/clubs/master/logo-white.svg',
    vertical: '/clubs/master/logo-white.svg',
  },
};

// Hjelpefunksjon for å generere CSS-variabler fra klubbfarger
export function generateCSSVariables(colors: ClubColors): Record<string, string> {
  // Beregn tekstfarge på bakgrunner automatisk hvis ikke spesifisert
  const textOnPrimary = colors.textOnPrimary || getContrastColor(colors.primary);
  const textOnAccent = colors.textOnAccent || getContrastColor(colors.accent);
  
  return {
    '--color-primary': colors.primary,
    '--color-accent': colors.accent,
    '--color-accent-light': colors.accentLight || colors.accent,
    '--color-dark': colors.dark || '#0b0e14',
    '--color-navy': colors.navy || colors.primary,
    '--color-text': colors.text || colors.primary, // Standard: bruk primary som tekstfarge
    '--color-text-on-primary': textOnPrimary,
    '--color-text-on-accent': textOnAccent,
  };
}

// Hjelpefunksjon for å beregne kontrast (lys/mørk tekst)
export function getContrastColor(hexColor: string): 'white' | 'black' {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? 'black' : 'white';
}
