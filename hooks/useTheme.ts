import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

/**
 * Hook for å få tilgang til tema-konteksten
 * 
 * Bruk:
 * ```tsx
 * const { club, template, setTemplate, isDarkMode } = useTheme();
 * ```
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme må brukes innenfor en ThemeProvider');
  }
  
  return context;
}

/**
 * Hook for å få klubbens farger som CSS-klasse-vennlige verdier
 * 
 * Bruk:
 * ```tsx
 * const { primaryClass, accentClass } = useClubColors();
 * return <div className={primaryClass}>...</div>;
 * ```
 */
export function useClubColors() {
  const { club } = useTheme();
  
  return {
    primary: club.colors.primary,
    accent: club.colors.accent,
    accentLight: club.colors.accentLight || club.colors.accent,
    dark: club.colors.dark || '#0b0e14',
    navy: club.colors.navy || club.colors.primary,
    
    // CSS variabel-referanser for inline styles
    primaryVar: 'var(--color-primary)',
    accentVar: 'var(--color-accent)',
    accentLightVar: 'var(--color-accent-light)',
    darkVar: 'var(--color-dark)',
    navyVar: 'var(--color-navy)',
  };
}

/**
 * Hook for å sjekke om vi er i dev-modus
 */
export function useDevMode() {
  return import.meta.env.DEV;
}

export default useTheme;
