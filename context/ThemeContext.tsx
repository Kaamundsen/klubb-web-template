import React, { createContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { ClubConfig, generateCSSVariables, MASTER_CONFIG } from '../config/clubConfig';
import { getClubById, SANDBOX_CLUBS } from '../config/clubSandbox';
import { ClubContent, getClubContent } from '../config/clubContent';

export type TemplateVersion = 'v1' | 'v2';
export type NewsViewMode = 'mosaic' | 'grid' | 'list';

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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isColorsSwapped, setIsColorsSwapped] = useState(false);
  const [scrapedContent, setScrapedContent] = useState<ScrapedContent | null>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);

  // Injiser CSS-variabler når klubb eller swap endres
  const injectThemeVariables = useCallback((clubConfig: ClubConfig, swapped: boolean) => {
    const root = document.documentElement;
    
    // Hvis swapped, bytt primary og accent
    const colors = swapped ? {
      ...clubConfig.colors,
      primary: clubConfig.colors.accent,
      accent: clubConfig.colors.primary,
      accentLight: clubConfig.colors.primary, // Bruk primary som light variant
    } : clubConfig.colors;
    
    const cssVars = generateCSSVariables(colors);
    
    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Oppdater også Tailwind-vennlige custom properties
    root.style.setProperty('--tw-color-primary', colors.primary);
    root.style.setProperty('--tw-color-accent', colors.accent);
  }, []);

  // Effekt for å injisere tema ved oppstart og endring
  useEffect(() => {
    injectThemeVariables(club, isColorsSwapped);
  }, [club, isColorsSwapped, injectThemeVariables]);
  
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
    if (typeof window !== 'undefined' && club.id !== 'master') {
      const url = new URL(window.location.href);
      url.searchParams.set('club', club.id);
      window.history.replaceState({}, '', url.toString());
    }
  }, [club.id]);

  const setClub = useCallback((clubId: string) => {
    const newClub = getClubById(clubId);
    setClubState(newClub);
    setClubContent(getClubContent(clubId));
    setTemplateState(newClub.template);
  }, []);

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
