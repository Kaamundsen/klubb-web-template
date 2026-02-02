# Designmal V2 - Systemanalyse og Dokumentasjon

**Dato:** Januar 2026  
**Status:** Arbeidsdokument for refaktorering

---

## 1. NÅVÆRENDE SYSTEMSTRUKTUR

### 1.1 Fargekonfigurasjonen (StyleSettings)

Systemet har følgende fargevariabler:

| Variabel | Kode-navn | CSS-variabel | Faktisk bruk |
|----------|-----------|--------------|--------------|
| primary1 | `styleSettings.primary1` | `--color-primary` | Klubbens hovedfarge (tekst, titler, hover) |
| primary2 | `styleSettings.primary2` | `--color-dark` | Mørk bakgrunnsfarge (dark mode bakgrunn) |
| accent1 | `styleSettings.accent1` | `--color-accent` | Aksentfarge (knapper, highlights) |
| accent2 | `styleSettings.accent2` | `--color-accent-light` | Lysere variant av aksent (knapp hover, gradienter) |

**PROBLEM:** Navngivningen er forvirrende:
- "Hovedfarge 1 & 2" antyder to klubbfarger som jobber sammen
- Men "Hovedfarge 2" (primary2) brukes som mørk bakgrunnsfarge, ikke som klubbfarge
- "Støttefarge 1" (accent1) er egentlig klubbens andre hovedfarge
- "Støttefarge 2" (accent2) brukes på knappers gradient-effekt

### 1.2 Hvordan fargene brukes i layouten

#### TOPPMENY (TopNav.tsx)
```
"Bli medlem" knapp:
├── Bakgrunn: gradient fra accent1 til accent2
├── Tekst: --color-text-on-accent (automatisk beregnet)
└── Border-radius: var(--radius-button)

Dropdown meny:
├── Bakgrunn: var(--card-background)
├── Border: var(--card-border)
├── Hover: var(--color-accent) med --color-text-on-accent
└── Border-radius: var(--radius-card)
```

#### HERO-SEKSJON (Hero.tsx)
```
Farget filter på bilde:
├── Styres av: heroOverlayColor (primary/accent/none)
├── Styrke: heroOverlayOpacity (0-100)
└── CSS: color-mix(in srgb, var(--color-[valg]) [%], transparent)

Overskrift linje 1:
├── Styres av: heroLine1Color (white/primary/accent)
└── Fargeverdier: #ffffff / var(--color-primary) / var(--color-accent)

Overskrift linje 2:
├── Styres av: heroLine2Color (white/primary/accent)  
└── Fargeverdier: #ffffff / var(--color-primary) / var(--color-accent)

Knapper:
├── Primær: accent1 gradient, --radius-button
└── Sekundær: hvit/transparent med border
```

#### NYHETER (NewsGrid.tsx)
```
Nyhetsseksjon:
├── Bakgrunn: var(--news-background) [modus-avhengig]
├── Border: var(--module-border)
└── Border-radius: var(--radius-module)

Nyhetskort:
├── Bakgrunn: var(--card-background) [modus-avhengig]
├── Border: var(--card-border)
└── Border-radius: var(--radius-card)

Tags på nyheter:
├── Bakgrunn: var(--color-accent)
├── Tekst: var(--color-text-on-accent)
└── Høyde: 24px, font 10px
```

#### SIDEBAR-MODULER (RightSidebar.tsx)
```
Modulfarge og stil:
├── Bakgrunn: var(--module-background)
├── Border: var(--module-border)
├── Border-radius: var(--radius-module)
└── Tittel-farge: var(--module-heading-color)
```

### 1.3 Admin-konsollen (DevToolbar.tsx)

#### Tab: STIL
```
Layout:          [1+5] [2+4] [2x3] [3x2] [Liste]
Avrunding:       Kort [slider]px | Knapp [slider]px | Modul [slider]px
Topp:            [Rett ▼] / [Avrundet]
Linje 1:         [Hvit ▼] / [Hovedfarge] / [Støttefarge]
Linje 2:         [Hvit ▼] / [Hovedfarge] / [Støttefarge]
Filter:          [Hovedfarge ▼] / [Støttefarge] / [Ingen]
Filter %:        [slider] [verdi]px  <-- BUG: Viser "px" men skal være "%"
```

#### Tab: FARGER
```
Klubb:           [Primær] [Sekundær]     <-- Disse er primary1 og accent1
Bakgrunn:        [Mørk] [Lys]            <-- Disse er primary2 og accent2 (FORVIRRENDE!)
Tekst:           [Lys] [Mørk]
[☀️/🌙] Lys/Mørk-modus toggle for redigering
[Seksjon] [Nyheter] [Kort] [Modul]       <-- Bakgrunner per modus
[Modul-tittel]
```

#### Tab: TEKST
```
Overskrift:      [Font ▼] [Weight slider]
Brødtekst:       [Font ▼] [Weight slider]
Modul-tittel:    [Font ▼] [Size ▼] [Weight slider]
```

#### Tab: IMPORT
```
[URL input] [Hent] [status] /clubs/{klubb}/
```

---

## 2. KJENTE PROBLEMER

### 2.1 Navngivning og logikk

**Problem 1: Hovedfarge vs Støttefarge**
- Brukeren forventer: "Hovedfarge 1 & 2" = klubbens to primære farger
- Faktisk: "Hovedfarge 2" (primary2) = mørk bakgrunnsfarge
- Resultat: Må sette "Støttefarge 1" til det som egentlig er klubbens andre hovedfarge

**Problem 2: Filter-slider viser feil enhet**
- Slider for "Filter %" viser "px" som enhet
- Bør vise "%" siden det er en prosent-verdi

**Problem 3: Bakgrunn-gruppen er forvirrende**
- "Bakgrunn: Mørk" og "Bakgrunn: Lys" er egentlig primary2 og accent2
- Disse navnene stemmer ikke med hvordan de faktisk brukes
- accent2 brukes primært som gradient på knapper, ikke som "lys bakgrunn"

### 2.2 Inkonsistent fargebruk

**Hero filter:**
- Kan velge "Hovedfarge" eller "Støttefarge"
- Men selve fargeverdien settes under "Farger"-fanen
- Disconnect mellom hvor man velger type og hvor man setter verdi

**Knapp-gradienter:**
- Bruker accent1 → accent2 for gradient
- Men accent2 vises som "Bakgrunn: Lys" i admin
- Ikke intuitivt at dette påvirker knapper

---

## 3. CSS-VARIABLER REFERANSE

### 3.1 Farger
```css
--color-primary:          Hovedfarge (primary1)
--color-accent:           Aksentfarge (accent1)
--color-accent-light:     Lys aksent (accent2)
--color-dark:             Mørk bakgrunn (primary2)
--color-navy:             Sekundær mørk (arvet fra klubb)
--color-text:             Tekstfarge (modus-avhengig)
--color-text-on-primary:  Tekst på hovedfarge (auto-beregnet)
--color-text-on-accent:   Tekst på aksent (auto-beregnet)
--color-primary-1/2:      Direkte tilgang til primary1/2
--color-accent-1/2:       Direkte tilgang til accent1/2
```

### 3.2 Border-radius
```css
--radius-card:            Kort-avrunding (cardRadius + 'px')
--radius-button:          Knapp-avrunding (buttonRadius + 'px')
--radius-module:          Modul-avrunding (moduleRadius + 'px')
```

### 3.3 Bakgrunner (modus-avhengig)
```css
--page-background:        Sidebakgrunn
--section-background:     Seksjon mellom hero og innhold
--news-background:        Nyhetsseksjon
--module-background:      Moduler
--card-background:        Kort
```

### 3.4 Border
```css
--border-color:           Border-farge
--border-opacity:         Border-opacity
--card-border:            color-mix(...) med opacity
--module-border:          color-mix(...) med opacity
```

### 3.5 Fonter
```css
--font-heading:           Overskrift-font
--font-heading-weight:    Overskrift-vekt
--font-body:              Brødtekst-font
--font-body-weight:       Brødtekst-vekt
--module-heading-font:    Modul-tittel font
--module-heading-size:    Modul-tittel størrelse (xs/sm/md/lg → px)
--module-heading-weight:  Modul-tittel vekt
--module-heading-color:   Modul-tittel farge
```

---

## 4. FILSTRUKTUR

```
/context/
  ThemeContext.tsx        # All state og CSS-variabel-injeksjon

/components/
  DevToolbar.tsx          # Admin-konsoll
  Hero.tsx                # Hero-seksjon
  TopNav.tsx              # Toppmeny
  NewsGrid.tsx            # Nyheter
  RightSidebar.tsx        # Sidebar-moduler

/config/
  clubConfig.ts           # ClubConfig interface, MASTER_CONFIG
  clubSandbox.ts          # Test-klubber med farger/logoer
  clubContent.ts          # Klubb-spesifikt innhold

/public/clubs/
  master/                 # Klubbnettside logoer
  msfotball/              # MS Fotball logoer og bilder
  dfi/                    # DFI logoer
  kolbotn/                # Kolbotn logoer
  honefoss/               # Hønefoss logoer
  ulkisa/                 # Ullensaker/Kisa logoer
```

---

## 5. ANBEFALT NY STRUKTUR

### 5.1 Foreslått farge-hierarki

```
KLUBBFARGER (de to fargene som definerer klubben):
├── Primærfarge (primary):    Klubbens hovedfarge
└── Sekundærfarge (secondary): Klubbens andre farge (den som nå er accent1)

STØTTEFARGER (hjelpefarger for layout):
├── Mørk bakgrunn (dark):     For dark mode
├── Lys variant (light):      For hover-effekter på primær/sekundær
└── Grå-skala:                For borders, subtil tekst, etc.

MODUS-AVHENGIGE (byttes automatisk):
├── Sidebakgrunn
├── Kort-bakgrunn
├── Modul-bakgrunn
├── Tekstfarge
└── Border-farge/opacity
```

### 5.2 Foreslått admin-struktur

```
KLUBB-TAB:
├── Velg klubb [dropdown]
├── Primærfarge [picker]
├── Sekundærfarge [picker]
└── Preview-knapp [viser hvordan de spiller sammen]

HERO-TAB:
├── Overskrift linje 1 [Hvit / Primær / Sekundær]
├── Overskrift linje 2 [Hvit / Primær / Sekundær]
├── Filter-farge [Primær / Sekundær / Ingen]
├── Filter-styrke [slider 0-100%]
└── (Eventuelt: Logo-valg)

ELEMENTER-TAB:
├── Kort [radius, border]
├── Knapper [radius, stil]
├── Moduler [radius, border]
└── Tags [størrelse, stil]

BAKGRUNNER-TAB:
├── Lysmodus: [Seksjon] [Nyheter] [Kort] [Modul]
├── Mørkmodus: [Seksjon] [Nyheter] [Kort] [Modul]
└── Border: [Farge] [Opacity kort] [Opacity modul]

TEKST-TAB:
├── Overskrifter: [Font] [Vekt]
├── Brødtekst: [Font] [Vekt]
├── Modul-titler: [Font] [Størrelse] [Vekt] [Farge]
└── Tekstfarge: [Lys modus] [Mørk modus]
```

---

## 6. HANDLINGSPUNKTER

1. **Fiks "px"-bug på filter-slider** - Endre suffix fra "px" til "%"
2. **Rename farger i admin** - Tydeligere navngiving
3. **Restrukturerer farge-logikk** - Primær + Sekundær = klubbfarger
4. **Separér bakgrunner fra klubbfarger** - Ikke bland primary2/accent2 med bakgrunner
5. **Lag konsistent referanse** - Når "Hovedfarge" velges i dropdown, bruk alltid samme farge

---

*Dette dokumentet er grunnlag for videre planlegging og refaktorering.*
