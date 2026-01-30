import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { ClubConfig, generateCSSVariables, MASTER_CONFIG } from '../config/clubConfig';
import { getClubById, SANDBOX_CLUBS } from '../config/clubSandbox';
import { ClubContent, getClubContent } from '../config/clubContent';

export type TemplateVersion = 'v1' | 'v2';
export type NewsViewMode = 'mosaic' | 'grid' | 'list';
export type NewsLayout = 'mosaic' | 'featured' | 'twoCol' | 'threeCol' | 'list';
export type FontFamily = 'inter' | 'roboto' | 'poppins' | 'montserrat' | 'opensans' | 'lato' | 'nunito' | 'raleway';
export type FontWeight = 300 | 400 | 500 | 600 | 700 | 800 | 900;

// Stil-innstillinger
export type SectionTopStyle = 'flat' | 'rounded' | 'wave' | 'angle';

export interface StyleSettings {
  // Border radius (0-48px)
  cardRadius: number;
  buttonRadius: number;
  moduleRadius: number;
  
  // Seksjon-topp stil
  sectionTopStyle: SectionTopStyle;
  
  // Hovedfarger (beholdes i begge modi)
  primary1: string;
  primary2: string;
  accent1: string;
  accent2: string;
  
  // Lysmodus bakgrunner
  lightPageBackground: string;
  lightNewsBackground: string;
  lightModuleBackground: string;
  lightCardBackground: string;
  
  // Mørkmodus bakgrunner
  darkPageBackground: string;
  darkNewsBackground: string;
  darkModuleBackground: string;
  darkCardBackground: string;
  
  // Seksjon-bakgrunn (området mellom hero og innhold)
  lightSectionBackground: string;
  darkSectionBackground: string;
  
  // Tekstfarger
  lightTextColor: string;
  darkTextColor: string;
  
  // Border-innstillinger
  borderColor: string;
  borderOpacity: number; // 0-100
  cardBorderOpacity: number;
  moduleBorderOpacity: number;
  
  // Modul-titler
  moduleHeadingColor: string;
  moduleHeadingSize: 'xs' | 'sm' | 'md' | 'lg';
  moduleHeadingWeight: FontWeight;
  moduleHeadingFont: FontFamily;
  
  // Fonter
  headingFont: FontFamily;
  headingWeight: FontWeight;
  bodyFont: FontFamily;
  bodyWeight: FontWeight;
}

interface ThemeContextType {
  // Klubb-konfigurasjon
  club: ClubConfig;
  setClub: (clubId: string) => void;
  availableClubs: ClubConfig[];
  
  // Klubb-spesifikt innhold
  clubContent: ClubContent;
  
  // Mal-valg
  template: TemplateVersion;
  setTemplate: (template: TemplateVersion) => void;
  
  // NewsGrid visning
  newsViewMode: NewsViewMode;
  setNewsViewMode: (mode: NewsViewMode) => void;
  
  // News layout (admin-kontrollert)
  newsLayout: NewsLayout;
  setNewsLayout: (layout: NewsLayout) => void;
  
  // Stil-innstillinger
  styleSettings: StyleSettings;
  updateStyleSettings: (settings: Partial<StyleSettings>) => void;
  
  // Lagring
  saveSettings: () => void;
  loadSettings: () => void;
  exportSettings: () => string;
  
  // Dark mode
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  // Farge-bytte (primary <-> accent)
  swapColors: () => void;
  isColorsSwapped: boolean;
  
  // Scraped content (live preview)
  scrapedContent: ScrapedContent | null;
  setScrapedContent: (content: ScrapedContent | null) => void;
  isLoadingContent: boolean;
  setIsLoadingContent: (loading: boolean) => void;
}

export interface ScrapedContent {
  logo?: {
    horizontal?: string;
    vertical?: string;
  };
  heroNews?: {
    image: string;
    title: string;
  };
  articles?: Array<{
    id: string;
    image: string;
    title: string;
    category: string;
    date?: string;
  }>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Hent initial klubb fra URL-parameter eller bruk master
  const getInitialClub = (): ClubConfig => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const clubId = params.get('club');
      if (clubId) {
        return getClubById(clubId);
      }
    }
    return MASTER_CONFIG;
  };

  const [club, setClubState] = useState<ClubConfig>(getInitialClub);
  const [clubContent, setClubContent] = useState<ClubContent>(() => getClubContent(getInitialClub().id));
  const [template, setTemplateState] = useState<TemplateVersion>('v2');
  const [newsViewMode, setNewsViewMode] = useState<NewsViewMode>('mosaic');
  
  // Last newsLayout fra localStorage ved oppstart
  const [newsLayout, setNewsLayout] = useState<NewsLayout>(() => {
    const initialClub = getInitialClub();
    const savedKey = `klubb-settings-${initialClub.id}`;
    const saved = typeof window !== 'undefined' ? localStorage.getItem(savedKey) : null;
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.newsLayout) return data.newsLayout;
      } catch (e) { /* ignorer */ }
    }
    return 'mosaic';
  });
  
  // Last isDarkMode fra localStorage ved oppstart
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const initialClub = getInitialClub();
    const savedKey = `klubb-settings-${initialClub.id}`;
    const saved = typeof window !== 'undefined' ? localStorage.getItem(savedKey) : null;
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (typeof data.isDarkMode === 'boolean') return data.isDarkMode;
      } catch (e) { /* ignorer */ }
    }
    return true; // Standard: dark mode
  });
  const [isColorsSwapped, setIsColorsSwapped] = useState(false);
  const [scrapedContent, setScrapedContent] = useState<ScrapedContent | null>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  
  // Stil-innstillinger med standardverdier (laster fra localStorage om tilgjengelig)
  const [styleSettings, setStyleSettings] = useState<StyleSettings>(() => {
    const initialClub = getInitialClub();
    
    // Sjekk om det finnes lagrede innstillinger for denne klubben
    const savedKey = `klubb-settings-${initialClub.id}`;
    const saved = typeof window !== 'undefined' ? localStorage.getItem(savedKey) : null;
    
    const defaultSettings: StyleSettings = {
      cardRadius: 16,
      buttonRadius: 12,
      moduleRadius: 24,
      // Seksjon-topp stil
      sectionTopStyle: 'flat' as SectionTopStyle,
      // Hovedfarger
      primary1: initialClub.colors.primary,
      primary2: initialClub.colors.dark || '#1a1a1a',
      accent1: initialClub.colors.accent,
      accent2: initialClub.colors.accentLight || initialClub.colors.accent,
      // Lysmodus bakgrunner
      lightPageBackground: '#ffffff',
      lightNewsBackground: '#ffffff',
      lightModuleBackground: '#f9fafb',
      lightCardBackground: '#ffffff',
      // Mørkmodus bakgrunner
      darkPageBackground: '#0b0e14',
      darkNewsBackground: '#111827',
      darkModuleBackground: '#1f2937',
      darkCardBackground: '#1f2937',
      // Seksjon-bakgrunn
      lightSectionBackground: '#ffffff',
      darkSectionBackground: '#0b0e14',
      // Tekstfarger
      lightTextColor: '#111827',
      darkTextColor: '#f9fafb',
      // Border-innstillinger
      borderColor: '#e5e7eb',
      borderOpacity: 100,
      cardBorderOpacity: 40,
      moduleBorderOpacity: 40,
      // Modul-titler
      moduleHeadingColor: initialClub.colors.primary,
      moduleHeadingSize: 'xs',
      moduleHeadingWeight: 900,
      moduleHeadingFont: 'inter',
      // Fonter
      headingFont: 'inter',
      headingWeight: 900,
      bodyFont: 'inter',
      bodyWeight: 400,
    };
    
    // Hvis det finnes lagrede innstillinger, merg dem med standardverdier
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.styleSettings) {
          return { ...defaultSettings, ...data.styleSettings };
        }
      } catch (e) {
        console.error('Kunne ikke laste lagrede innstillinger:', e);
      }
    }
    
    return defaultSettings;
  });
  
  const updateStyleSettings = useCallback((newSettings: Partial<StyleSettings>) => {
    setStyleSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Lagre innstillinger for gjeldende klubb
  const saveSettings = useCallback(() => {
    const key = `klubb-settings-${club.id}`;
    const data = {
      styleSettings,
      newsLayout,
      isDarkMode,
    };
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`Innstillinger lagret for ${club.name}`);
  }, [club.id, club.name, styleSettings, newsLayout, isDarkMode]);

  // Last innstillinger for gjeldende klubb
  const loadSettings = useCallback(() => {
    const key = `klubb-settings-${club.id}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.styleSettings) setStyleSettings(prev => ({ ...prev, ...data.styleSettings }));
        if (data.newsLayout) setNewsLayout(data.newsLayout);
        if (typeof data.isDarkMode === 'boolean') setIsDarkMode(data.isDarkMode);
        console.log(`Innstillinger lastet for ${club.name}`);
      } catch (e) {
        console.error('Kunne ikke laste innstillinger:', e);
      }
    }
  }, [club.id, club.name]);

  // Eksporter innstillinger som JSON (for å legge i kode)
  const exportSettings = useCallback(() => {
    const data = {
      clubId: club.id,
      styleSettings,
      newsLayout,
    };
    return JSON.stringify(data, null, 2);
  }, [club.id, styleSettings, newsLayout]);

  // Font family mapping
  const fontFamilyMap: Record<FontFamily, string> = {
    inter: "'Inter', sans-serif",
    roboto: "'Roboto', sans-serif",
    poppins: "'Poppins', sans-serif",
    montserrat: "'Montserrat', sans-serif",
    opensans: "'Open Sans', sans-serif",
    lato: "'Lato', sans-serif",
    nunito: "'Nunito', sans-serif",
    raleway: "'Raleway', sans-serif",
  };

  // Module heading size mapping
  const moduleHeadingSizeMap: Record<string, string> = {
    xs: '10px',
    sm: '12px',
    md: '14px',
    lg: '16px',
  };

  // Injiser CSS-variabler når klubb, swap eller stil endres
  const injectThemeVariables = useCallback((clubConfig: ClubConfig, swapped: boolean, styles: StyleSettings, darkMode: boolean) => {
    const root = document.documentElement;
    
    // Bruk stil-innstillinger for hovedfarger
    const primary = swapped ? styles.accent1 : styles.primary1;
    const accent = swapped ? styles.primary1 : styles.accent1;
    
    // Lag fargevariabler basert på nye innstillinger
    const colors = {
      ...clubConfig.colors,
      primary: primary,
      accent: accent,
      accentLight: swapped ? styles.primary2 : styles.accent2,
      dark: styles.primary2,
    };
    
    const cssVars = generateCSSVariables(colors);
    
    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Hovedfarger som egne variabler
    root.style.setProperty('--color-primary-1', styles.primary1);
    root.style.setProperty('--color-primary-2', styles.primary2);
    root.style.setProperty('--color-accent-1', styles.accent1);
    root.style.setProperty('--color-accent-2', styles.accent2);
    
    // Oppdater også Tailwind-vennlige custom properties
    root.style.setProperty('--tw-color-primary', primary);
    root.style.setProperty('--tw-color-accent', accent);
    
    // Border radius variabler (px verdier)
    root.style.setProperty('--radius-card', `${styles.cardRadius}px`);
    root.style.setProperty('--radius-button', `${styles.buttonRadius}px`);
    root.style.setProperty('--radius-module', `${styles.moduleRadius}px`);
    
    // Bakgrunnsfarger basert på modus
    if (darkMode) {
      root.style.setProperty('--page-background', styles.darkPageBackground);
      root.style.setProperty('--news-background', styles.darkNewsBackground);
      root.style.setProperty('--module-background', styles.darkModuleBackground);
      root.style.setProperty('--card-background', styles.darkCardBackground);
    } else {
      root.style.setProperty('--page-background', styles.lightPageBackground);
      root.style.setProperty('--news-background', styles.lightNewsBackground);
      root.style.setProperty('--module-background', styles.lightModuleBackground);
      root.style.setProperty('--card-background', styles.lightCardBackground);
    }
    
    // Border-farger med opacity
    const borderOpacity = styles.borderOpacity / 100;
    const cardBorderOpacity = styles.cardBorderOpacity / 100;
    const moduleBorderOpacity = styles.moduleBorderOpacity / 100;
    
    // Parse border color og legg til opacity
    root.style.setProperty('--border-color', styles.borderColor);
    root.style.setProperty('--border-opacity', String(borderOpacity));
    root.style.setProperty('--card-border', `color-mix(in srgb, ${styles.borderColor} ${styles.cardBorderOpacity}%, transparent)`);
    root.style.setProperty('--module-border', `color-mix(in srgb, ${styles.borderColor} ${styles.moduleBorderOpacity}%, transparent)`);
    
    // Modul-styling
    root.style.setProperty('--module-heading-color', styles.moduleHeadingColor);
    root.style.setProperty('--module-heading-size', moduleHeadingSizeMap[styles.moduleHeadingSize]);
    root.style.setProperty('--module-heading-weight', String(styles.moduleHeadingWeight));
    root.style.setProperty('--module-heading-font', fontFamilyMap[styles.moduleHeadingFont]);
    
    // Fonter
    root.style.setProperty('--font-heading', fontFamilyMap[styles.headingFont]);
    root.style.setProperty('--font-heading-weight', String(styles.headingWeight));
    root.style.setProperty('--font-body', fontFamilyMap[styles.bodyFont]);
    root.style.setProperty('--font-body-weight', String(styles.bodyWeight));
    
    // Seksjon-topp stil og radius
    const sectionTopRadius = styles.sectionTopStyle === 'rounded' ? '4rem' : '0';
    root.style.setProperty('--section-top-style', styles.sectionTopStyle || 'flat');
    root.style.setProperty('--section-top-radius', sectionTopRadius);
    
    // Seksjon-bakgrunn
    root.style.setProperty('--section-background', darkMode ? styles.darkSectionBackground : styles.lightSectionBackground);
    
    // Tekstfarge
    root.style.setProperty('--color-text', darkMode ? styles.darkTextColor : styles.lightTextColor);
  }, []);

  // Effekt for å injisere tema ved oppstart og endring
  useEffect(() => {
    injectThemeVariables(club, isColorsSwapped, styleSettings, isDarkMode);
  }, [club, isColorsSwapped, styleSettings, isDarkMode, injectThemeVariables]);
  
  // Merk: Stil-innstillinger oppdateres nå i setClub-funksjonen
  // for å unngå at lagrede innstillinger overskrives
  
  // Funksjon for å bytte farger
  const swapColors = useCallback(() => {
    setIsColorsSwapped(prev => !prev);
  }, []);

  // Effekt for dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Oppdater URL når klubb endres (for deling)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (club.id === 'master') {
        // Fjern club-parameter for master
        url.searchParams.delete('club');
      } else {
        url.searchParams.set('club', club.id);
      }
      window.history.replaceState({}, '', url.toString());
    }
  }, [club.id]);

  const setClub = useCallback((clubId: string) => {
    // Lagre innstillinger for gjeldende klubb FØR vi bytter
    const currentKey = `klubb-settings-${club.id}`;
    const currentData = {
      styleSettings,
      newsLayout,
      isDarkMode,
    };
    localStorage.setItem(currentKey, JSON.stringify(currentData));
    
    // Bytt til ny klubb
    const newClub = getClubById(clubId);
    setClubState(newClub);
    setClubContent(getClubContent(clubId));
    setTemplateState(newClub.template);
    
    // Last innstillinger for den nye klubben
    const newKey = `klubb-settings-${clubId}`;
    const saved = localStorage.getItem(newKey);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.styleSettings) {
          setStyleSettings(prev => ({ ...prev, ...data.styleSettings }));
        }
        if (data.newsLayout) setNewsLayout(data.newsLayout);
        if (typeof data.isDarkMode === 'boolean') setIsDarkMode(data.isDarkMode);
      } catch (e) {
        console.error('Kunne ikke laste innstillinger:', e);
      }
    } else {
      // Ingen lagrede innstillinger - bruk klubbens standard farger
      setStyleSettings(prev => ({
        ...prev,
        primary1: newClub.colors.primary,
        primary2: newClub.colors.dark || '#1a1a1a',
        accent1: newClub.colors.accent,
        accent2: newClub.colors.accentLight || newClub.colors.accent,
        moduleHeadingColor: newClub.colors.primary,
      }));
    }
  }, [club.id, styleSettings, newsLayout, isDarkMode]);

  const setTemplate = useCallback((newTemplate: TemplateVersion) => {
    setTemplateState(newTemplate);
    // Oppdater også klubbens konfigurasjon
    setClubState(prev => ({ ...prev, template: newTemplate }));
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const value: ThemeContextType = {
    club,
    setClub,
    availableClubs: SANDBOX_CLUBS,
    clubContent,
    template,
    setTemplate,
    newsViewMode,
    setNewsViewMode,
    newsLayout,
    setNewsLayout,
    styleSettings,
    updateStyleSettings,
    saveSettings,
    loadSettings,
    exportSettings,
    isDarkMode,
    toggleDarkMode,
    swapColors,
    isColorsSwapped,
    scrapedContent,
    setScrapedContent,
    isLoadingContent,
    setIsLoadingContent,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext };
export default ThemeContext;
