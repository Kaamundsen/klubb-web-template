# Designmal V2 - Omstruktureringsplan

## 📁 Foreslått Filstruktur

```
Klubb-web-template/
├── src/
│   ├── config/
│   │   ├── clubConfig.ts          # Sentral klubbkonfigurasjon (farger, logoer)
│   │   └── clubThemes.ts          # Predefinerte temaer for test-klubber
│   ├── hooks/
│   │   ├── useClubTheme.ts        # Hook for å hente aktiv klubb-tema
│   │   └── useThemeInjector.ts    # Hook for å injisere CSS-variabler
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopNav.tsx         # Oppgradert med 3-nivå navigasjon
│   │   │   └── ClubSwitcher.tsx  # Dev-only komponent for å bytte klubb
│   │   ├── content/
│   │   │   ├── Hero.tsx           # Oppdatert med CSS-variabler
│   │   │   ├── NewsGrid.tsx       # Sikret aspect-ratio på bilder
│   │   │   └── RightSidebar.tsx   # Sticky behavior + modulær
│   │   └── shared/
│   │       └── Logo.tsx           # Dynamisk logo-komponent
│   ├── styles/
│   │   ├── theme.css              # CSS-variabler definert her
│   │   └── globals.css             # Global styling
│   ├── utils/
│   │   └── themeUtils.ts          # Hjelpefunksjoner for tema-håndtering
│   ├── App.tsx
│   └── index.tsx
├── public/
│   └── logos/                      # Logoer for ulike klubber
│       ├── club-1-horizontal.svg
│       ├── club-1-vertical.svg
│       ├── club-2-horizontal.svg
│       └── club-2-vertical.svg
└── package.json
```

## 🎨 Implementasjonsplan

### Fase 1: Global Theme Engine
1. **clubConfig.ts** - Sentral konfigurasjonsfil
   - Struktur for klubb-ID, farger, logo-stier
   - Støtte for multiple klubber
   - TypeScript interfaces

2. **CSS-variabler** - Erstatte hardkodede farger
   - `--color-primary` (erstatter brand-blue)
   - `--color-accent` (erstatter brand-red)
   - `--color-dark` (erstatter brand-dark)
   - `--color-navy` (erstatter brand-navy)
   - Dynamisk injeksjon basert på aktiv klubb

3. **useThemeInjector hook**
   - Injiserer CSS-variabler på :root ved klubb-bytt
   - Oppdaterer Tailwind config dynamisk

### Fase 2: Navigasjonshierarki (V2)
1. **TopNav.tsx** - Tre-nivå struktur
   - Nivå 1: Hovedmeny (Hjem, Klubben, Sport, Sponsor, Kontakt)
   - Nivå 2: Idrettsgrener (Fotball, Håndball, Turn, Allidrett)
   - Nivå 3: Lag/Undersider (A-lag, G16, Treningstider, etc.)
   - Hover fly-out med smooth animations
   - Sticky behavior med glassmorphism

### Fase 3: Robust Innholdshåndtering
1. **NewsGrid.tsx**
   - Sikre `aspect-ratio` på alle bilder
   - `object-fit: cover` for konsistent visning
   - 6 nyheter i responsivt grid (2 per rad desktop)
   - Fallback for manglende bilder

2. **Hero.tsx**
   - Dynamisk bakgrunnsbilde med aspect-ratio
   - CSS-variabler for farger
   - Responsiv tekststørrelse

### Fase 4: Modulær Sidebar
1. **RightSidebar.tsx**
   - Sticky positioning som følger scroll
   - Modulær struktur klar for admin-panel integrasjon
   - Dynamiske farger basert på tema

### Fase 5: Dark/Light Mode
1. **Integrasjon med Tailwind dark:**
   - CSS-variabler fungerer i både light og dark mode
   - Klubbens fargeidentitet bevares
   - Smooth transitions

### Fase 6: Developer Experience
1. **ClubSwitcher.tsx**
   - Kun synlig i dev-miljø (process.env.NODE_ENV === 'development')
   - Dropdown for å bytte mellom test-klubber
   - Visuell bekrefte av tema-endringer

## 🔧 Tekniske Detaljer

### CSS-variabler struktur:
```css
:root {
  --color-primary: #092c5c;
  --color-accent: #e5003c;
  --color-dark: #0b0e14;
  --color-navy: #0f2e58;
  --color-primary-light: #ff1a57;
}
```

### ClubConfig struktur:
```typescript
interface ClubConfig {
  id: string;
  name: string;
  colors: {
    primary: string;
    accent: string;
    dark: string;
    navy: string;
  };
  logos: {
    horizontal: string;
    vertical: string;
  };
}
```

## ✅ Krav og Begrensninger

- ✅ All eksisterende artikkelstruktur beholdes
- ✅ Admin-data strukturer uendret
- ✅ Kun visuell og strukturell endring
- ✅ Backward compatible med eksisterende data
- ✅ Performance-optimalisert (minimal re-rendering)

## 📝 Neste Steg

1. Opprett filstruktur
2. Implementer clubConfig.ts med test-data
3. Bygg CSS-variabel system
4. Oppdater alle komponenter til å bruke CSS-variabler
5. Forbedre TopNav med 3-nivå navigasjon
6. Sikre bildhåndtering i NewsGrid
7. Implementer ClubSwitcher
8. Test med flere klubb-konfigurasjoner
