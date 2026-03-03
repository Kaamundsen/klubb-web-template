# Design System Analysis / Designsystem-analyse

**Date / Dato:** March 2026  
**Status:** Current documentation / Gjeldende dokumentasjon

---

## 1. COLOR SYSTEM / FARGESYSTEM

### 1.1 Club Colors / Klubbfarger

The club's identity is defined by two main colors plus up to 4 auto-generated support colors.

Klubbens identitet defineres av to hovedfarger pluss opptil 4 autogenererte støttefarger.

| Setting | CSS Variable | Purpose / Bruk |
|---------|-------------|----------------|
| Primary / Primær | `--color-primary` | Main club color (headings, accents) / Hovedfarge |
| Secondary / Sekundær | `--color-accent` | Second club color (buttons, highlights) / Sekundærfarge |
| Support 1–4 / Støtte 1–4 | `--color-support-1` … `--color-support-4` | Derived helper colors / Utledede hjelpefarger |

### 1.2 Mode-dependent Colors / Modusavhengige farger

These change automatically between light and dark mode:

| CSS Variable | Purpose / Bruk |
|-------------|----------------|
| `--page-background` | Page background / Sidebakgrunn |
| `--section-background` | Section between hero and content / Seksjonsbakgrunn |
| `--news-background` | News section / Nyhetsseksjon |
| `--card-background` | Cards / Kort |
| `--module-background` | Sidebar modules / Sidebarmoduler |
| `--menu-background` | Navigation menu / Meny |
| `--footer-background` | Footer / Bunntekst |
| `--color-text` | Main text color / Hovedtekstfarge |
| `--color-text-light` | Light mode text / Tekst i lysmodus |
| `--color-text-dark` | Dark mode text / Tekst i mørk modus |

### 1.3 Auto-calculated Colors / Autoberegnede farger

| CSS Variable | Purpose / Bruk |
|-------------|----------------|
| `--color-text-on-primary` | Contrast text on primary / Kontrasttekst på primær |
| `--color-text-on-accent` | Contrast text on accent / Kontrasttekst på aksent |

---

## 2. HOW COLORS ARE USED / HVORDAN FARGENE BRUKES

### TopNav / Toppmeny
```
Navigation bar:
├── Background: --menu-background
├── "Bli medlem" button: accent gradient, --radius-button
├── Dropdown menu: --card-background, --card-border
├── Dropdown hover: --color-accent with --color-text-on-accent
├── Sport icons: Fotball, Håndball, Ski, Allidrett
└── Mega menu: simple / megabox / megafull styles
```

### Hero Section / Hero-seksjon
```
Hero area:
├── Image filter: heroOverlayColor (primary/accent/none) + heroOverlayOpacity
├── Floating logo: toggleable
├── Section top: flat / rounded
├── Headline line 1: heroLine1Color + optional background
├── Headline line 2: heroLine2Color + optional background
├── CTA buttons: toggleable, accent gradient
├── Quick links: toggleable, left/center/right alignment
└── Content alignment: left/center/right
```

### News Grid / Nyhetsgrid
```
News section:
├── Layout: mosaic (1+5), featured (2+4), twoCol (2x3), threeCol (3x2), list
├── Section bg: --news-background
├── Cards: --card-background, --card-border, --radius-card
├── Tags: configurable bg + text color
└── Heading bar: configurable color
```

### Right Sidebar / Høyre sidebar
```
6 reorderable modules:
├── Neste kamp / Next match
├── Snarveier / Shortcuts
├── Aktiviteter / Activities
├── Grasrotandelen
├── Sponsorer / Sponsors
└── Følg oss / Follow us
Each module: independent bg + text color per light/dark mode
```

### Dynamic Sections / Dynamiske seksjoner
```
6 reorderable sections:
├── Klubbkolleksjon (flippable layout)
├── Grasrotandelen (flippable layout)
├── Bli med / Join us
├── Sponsorer / Sponsors (heading style: full/module/hidden, logo border)
├── Sponsor-CTA (gradient box with configurable colors + angle)
└── Kontakt / Contact
Each section: independent bg + text + heading line colors per light/dark mode
```

---

## 3. CSS VARIABLES REFERENCE / CSS-VARIABLER

### 3.1 Colors / Farger
```css
--color-primary            /* Club primary / Primærfarge */
--color-accent             /* Club secondary / Sekundærfarge */
--color-support-1 … 4     /* Support colors / Støttefarger */
--color-text               /* Text (mode-dependent) / Tekst */
--color-text-light         /* Light mode text / Lys tekst */
--color-text-dark          /* Dark mode text / Mørk tekst */
--color-text-on-primary    /* Auto contrast on primary */
--color-text-on-accent     /* Auto contrast on accent */
```

### 3.2 Border Radius / Avrunding
```css
--radius-card              /* Card radius / Kortavrunding */
--radius-button            /* Button radius / Knappavrunding */
--radius-module            /* Module radius / Modulavrunding */
```

### 3.3 Backgrounds / Bakgrunner (mode-dependent)
```css
--page-background          /* Page / Side */
--section-background       /* Section / Seksjon */
--news-background          /* News / Nyheter */
--card-background          /* Cards / Kort */
--module-background        /* Modules / Moduler */
--menu-background          /* Menu / Meny */
--footer-background        /* Footer / Bunn */
```

### 3.4 Borders
```css
--border-color             /* Border color / Kantfarge */
--border-opacity           /* Border opacity */
--card-border              /* Card border (color-mix) */
--module-border            /* Module border (color-mix) */
```

### 3.5 Typography / Typografi
```css
--font-heading             /* Heading font / Overskriftsfont */
--font-heading-weight      /* Heading weight / Overskriftsvekt */
--font-body                /* Body font / Brødtekstfont */
--font-body-weight         /* Body weight / Brødtekstvekt */
--module-heading-font      /* Module heading font */
--module-heading-size      /* Module heading size (xs/sm/md/lg) */
--module-heading-weight    /* Module heading weight */
--module-heading-color     /* Module heading color */
```

---

## 4. ADMIN CONSOLE STRUCTURE / ADMIN-KONSOLL

The DevToolbar has 9 tabs:

| # | Tab (NO) | Tab (EN) | Content |
|---|----------|----------|---------|
| 1 | Klubb | Club | Logos (horizontal, vertical, favicon, SoMe), primary + secondary color, support colors 1–4 with auto-generate, motto text + visibility + color |
| 2 | Layout | Layout | Page width (full/1920/1490/1248), outer background, section gap, news grid layout, card/button/module radius, CTA button color + gradient + text, heading bar color, tag colors |
| 3 | Meny | Menu | Dropdown style: simple / megabox / megafull |
| 4 | Hero | Hero | Floating logo, section top style, line 1/2 colors + backgrounds, image overlay color + opacity, CTA toggle, quick links toggle + alignment, content alignment |
| 5 | Bakgrunn | Background | Light/dark edit mode, text colors, per-element backgrounds (section/news/card/module/menu/footer), module heading color, logo for light backgrounds |
| 6 | Tekst | Text | Heading font + weight, body font + weight, module heading font + size + weight |
| 7 | Modul | Module | Reorder sidebar modules (up/down), enable/disable, per-module bg + text color per mode |
| 8 | Seksjoner | Sections | Reorder sections, enable/disable, flip layout, per-section bg + text + heading colors, sponsor heading style, sponsor logo border, sponsor-CTA gradient |
| 9 | Import | Import | Fetch content from URL (scraping), hero image upload, image path mappings |

---

## 5. FILE STRUCTURE / FILSTRUKTUR

```
/context/
  ThemeContext.tsx          # Central state + CSS variable injection

/components/
  DevToolbar.tsx            # Admin console (9 tabs)
  DocsModal.tsx             # Built-in documentation modal
  TopNav.tsx                # Top navigation with mega menu
  Hero.tsx                  # Hero section
  NewsGrid.tsx              # News grid (5 layouts)
  RightSidebar.tsx          # Right sidebar (6 modules)
  DynamicSections.tsx       # Dynamic page sections (6 sections)
  CTASection.tsx            # CTA section
  ClubLogos.tsx             # Club logo display
  RoleSection.tsx           # Role section
  StatsSection.tsx          # Statistics section

/config/
  clubConfig.ts             # ClubConfig interface, MASTER_CONFIG
  clubSandbox.ts            # Sandbox clubs (6 clubs)
  clubContent.ts            # Per-club content (news, hero)

/hooks/
  useTheme.ts               # useTheme, useClubColors, useDevMode

/utils/
  colorUtils.ts             # HSL/HEX/RGB conversions, contrast
  contentScraper.ts         # URL scraping for club content

/public/clubs/
  master/                   # Klubbnettside.no (default)
  msfotball/                # MS Fotball
  dfi/                      # DFI
  kolbotn/                  # Kolbotn IL
  honefoss/                 # Hønefoss BK
  ulkisa/                   # Ullensaker/Kisa IL
```

---

## 6. PERSISTENCE / LAGRING

| Key | Content |
|-----|---------|
| `klubb-settings-{clubId}` | All style settings (colors, layout, fonts, etc.) |
| `klubb-scraped-{clubId}` | Scraped/imported content |
| Export JSON | Contains `clubId`, `styleSettings`, `newsLayout` |

---

*This document reflects the current state of the system as of March 2026.*
*Dette dokumentet gjenspeiler systemets nåværende tilstand per mars 2026.*
