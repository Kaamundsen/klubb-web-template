# ProClub Web Template / Klubbnettside-mal

> **NO:** En moderne, fleksibel og responsiv nettside-mal for norske idrettsklubber med konfigurerbart designsystem, live admin-konsoll og støtte for flere klubber.
>
> **EN:** A modern, flexible, and responsive website template for Norwegian sports clubs with a configurable design system, live admin console, and multi-club support.

---

## Innhold / Table of Contents

- [Funksjoner / Features](#funksjoner--features)
- [Tech Stack](#tech-stack)
- [Kom i gang / Getting Started](#kom-i-gang--getting-started)
- [Prosjektstruktur / Project Structure](#prosjektstruktur--project-structure)
- [Admin-konsoll / Admin Console](#admin-konsoll--admin-console)
- [Klubber / Clubs](#klubber--clubs)
- [Backup av innstillinger / Settings Backup](#backup--settings-backup)

---

## Funksjoner / Features

| Norsk | English |
|-------|---------|
| Komplett klubbnettside med hero, nyheter, sidebar og seksjoner | Complete club website with hero, news, sidebar and sections |
| Designsystem med CSS-variabler og live forhåndsvisning | Design system with CSS variables and live preview |
| Admin-konsoll (DevToolbar) med 9 faner for full kontroll | Admin console (DevToolbar) with 9 tabs for full control |
| Lys/mørk modus med uavhengig styling per modus | Light/dark mode with independent styling per mode |
| Flerklubb-støtte med egne farger, logoer og innhold per klubb | Multi-club support with per-club colors, logos, and content |
| Responsiv layout med justerbar sidebredde (full/1920/1490/1248) | Responsive layout with adjustable page width |
| Import av innhold via URL-scraping | Content import via URL scraping |
| Lagring og eksport av innstillinger som JSON | Save and export settings as JSON |
| Norsk/engelsk språktoggle i admin | Norwegian/English language toggle in admin |

---

## Tech Stack

- **React 19** + **TypeScript 5.8**
- **Vite 6** (dev server & build)
- No CSS framework — custom CSS variables injected via `ThemeContext`

---

## Kom i gang / Getting Started

**Forutsetninger / Prerequisites:** Node.js (v18+)

```bash
# 1. Installer avhengigheter / Install dependencies
npm install

# 2. Start utviklingsserver / Start dev server
npm run dev
```

Appen åpnes på `http://localhost:3000`. Admin-konsollen (tannhjul-ikonet) er kun tilgjengelig i dev-modus.

The app opens at `http://localhost:3000`. The admin console (gear icon) is only available in dev mode.

### Velg klubb / Select club

Legg til `?club=<id>` i URL-en for å bytte klubb, f.eks.:

Add `?club=<id>` to the URL to switch clubs, e.g.:

```
http://localhost:3000?club=msfotball
http://localhost:3000?club=dfi
```

---

## Prosjektstruktur / Project Structure

```
Klubb-web-template/
├── components/
│   ├── CTASection.tsx         # CTA-seksjon / CTA section
│   ├── ClubLogos.tsx          # Klubblogoer / Club logos
│   ├── DevToolbar.tsx         # Admin-konsoll (kun dev) / Admin console (dev only)
│   ├── DocsModal.tsx          # Innebygd dokumentasjon / Built-in documentation
│   ├── DynamicSections.tsx    # Seksjoner: Kolleksjon, Sponsorer, Kontakt m.m.
│   ├── Hero.tsx               # Hero-seksjon med bilde og CTA
│   ├── NewsGrid.tsx           # Nyhetsgrid (mosaikk, 2x3, liste m.m.)
│   ├── RightSidebar.tsx       # Høyre sidebar-moduler
│   ├── RoleSection.tsx        # Rolleseksjon / Role section
│   ├── Sidebar.tsx            # Sidebar-komponent
│   ├── StatsSection.tsx       # Statistikk / Statistics
│   └── TopNav.tsx             # Toppmeny med megameny / Top nav with mega menu
├── config/
│   ├── clubConfig.ts          # ClubConfig-interface og standardverdier
│   ├── clubContent.ts         # Innhold per klubb (nyheter, hero)
│   └── clubSandbox.ts         # Sandkasse-klubber for testing
├── context/
│   └── ThemeContext.tsx        # Sentral state, CSS-variabler, lagring
├── docs/
│   └── DESIGNSYSTEM-ANALYSE.md
├── hooks/
│   └── useTheme.ts            # useTheme, useClubColors, useDevMode
├── public/
│   ├── clubs/                 # Logoer og bilder per klubb
│   ├── icons/                 # Idrettsikoner (fotball, ski, håndball, allidrett)
│   ├── images/
│   └── sponsors/
├── scripts/
│   └── save-settings-backup.js
├── settings-backup/           # Eksporterte innstillinger (JSON)
├── utils/
│   ├── colorUtils.ts          # Fargeverktøy (HSL/HEX/RGB)
│   └── contentScraper.ts      # Scraping av klubbsider
├── App.tsx                    # Hovedlayout / Main layout
├── constants.tsx              # Navigasjon, nyheter, sponsorer
├── index.css                  # Globale stiler og CSS-variabler
├── index.tsx                  # Oppstartspunkt / Entry point
├── types.ts                   # TypeScript-typer
└── vite.config.ts             # Vite-konfigurasjon med proxy
```

---

## Admin-konsoll / Admin Console

Admin-konsollen er en flytende verktøylinje som vises i dev-modus (tannhjul-ikon øverst til høyre).

The admin console is a floating toolbar shown in dev mode (gear icon, top right).

### Globale handlinger / Global Actions

| Ikon | NO | EN |
|------|----|----|
| Klubb-dropdown | Bytt aktiv klubb | Switch active club |
| 💾 | Lagre innstillinger | Save settings |
| ⬆️ | Last inn lagrede | Load saved settings |
| 📋 | Eksporter JSON | Export JSON |
| ⇄ | Bytt primær/sekundær | Swap primary/secondary |
| ☀️/🌙 | Lys/mørk modus | Light/dark mode |
| NO/EN | Språkbytte | Language toggle |
| 📖 | Dokumentasjon | Documentation |

### Faner / Tabs

| # | Fane | Tab | Innhold / Content |
|---|------|-----|-------------------|
| 1 | **Klubb** | **Club** | Logoer, klubbfarger (primær + sekundær), støttefarger (1–4 + auto), motto |
| 2 | **Layout** | **Layout** | Sidebredde, nyhetsgrid-oppsett, avrunding (kort/knapp/modul), CTA-knappfarge, overskriftslinje, tag-farger |
| 3 | **Meny** | **Menu** | Dropdown-stil: enkel / megaboks / mega fullbredde |
| 4 | **Hero** | **Hero** | Flytende logo, seksjonstopp, linje 1/2 farger, bildefilter, CTA av/på, hurtiglenker, innholdsjustering |
| 5 | **Bakgrunn** | **Background** | Lys/mørk redigeringsmodus, tekstfarger, bakgrunn per element (seksjon/nyheter/kort/modul/meny/footer), moduloverskriftfarge, logo for lys bakgrunn |
| 6 | **Tekst** | **Text** | Overskriftsfont + vekt, brødtekstfont + vekt, moduloverskrift font/størrelse/vekt |
| 7 | **Modul** | **Module** | Rekkefølge og synlighet for sidebar-moduler, bakgrunn/tekstfarge per modul (lys/mørk) |
| 8 | **Seksjoner** | **Sections** | Rekkefølge og synlighet for hovedseksjoner, flip layout, sponsoroverskrift-stil, sponsor-CTA gradient |
| 9 | **Import** | **Import** | Hent innhold fra URL (scraping), hero-bilde, bildestihenvisninger |

### Lagring / Storage

- Innstillinger lagres i `localStorage` under `klubb-settings-{clubId}`
- Scrapet innhold lagres under `klubb-scraped-{clubId}`
- Eksporter JSON for permanent lagring i kode eller backup

---

## Klubber / Clubs

Forhåndskonfigurerte sandkasse-klubber for testing:

Pre-configured sandbox clubs for testing:

| ID | Klubb / Club |
|----|-------------|
| `master` | Klubbnettside.no (standard) |
| `msfotball` | MS Fotball |
| `dfi` | DFI |
| `kolbotn` | Kolbotn IL |
| `honefoss` | Hønefoss BK |
| `ulkisa` | Ullensaker/Kisa IL |

Hver klubb har sin egen mappe under `public/clubs/` med logoer og bilder. Se [public/clubs/README.md](public/clubs/README.md) for detaljer.

Each club has its own folder under `public/clubs/` with logos and images. See [public/clubs/README.md](public/clubs/README.md) for details.

---

## Backup / Settings Backup

Innstillinger kan eksporteres som JSON fra admin-konsollen og lagres som backup. Se [settings-backup/README.md](settings-backup/README.md) for instruksjoner.

Settings can be exported as JSON from the admin console and saved as backups. See [settings-backup/README.md](settings-backup/README.md) for instructions.

---

## Nøkkelfiler / Key Files

| Fil / File | Beskrivelse / Description |
|-----------|--------------------------|
| `context/ThemeContext.tsx` | Sentral state, CSS-variabel-injeksjon, klubbbytte, lagring / Central state, CSS variable injection, club switching, storage |
| `components/DevToolbar.tsx` | Admin-konsoll med 9 faner / Admin console with 9 tabs |
| `config/clubConfig.ts` | ClubConfig-interface, standardfarger / ClubConfig interface, default colors |
| `config/clubSandbox.ts` | Sandkasse-klubber / Sandbox clubs |
| `config/clubContent.ts` | Innhold per klubb (nyheter, hero) / Per-club content |
| `utils/colorUtils.ts` | Fargeverktøy: HSL, HEX, RGB, kontrastberegning / Color utilities |
| `constants.tsx` | Navigasjonsstruktur, fallback-nyheter, sponsorer / Nav structure, fallback news, sponsors |
