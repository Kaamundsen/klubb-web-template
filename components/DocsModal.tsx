import React, { useState } from 'react';

const DOCS = [
  {
    id: 'overview',
    title: 'Overview / Oversikt',
    content: `
## ProClub Web Template

A configurable website template for Norwegian sports clubs. The admin console (DevToolbar) provides live preview of all design changes.

En konfigurerbar nettside-mal for norske idrettsklubber. Admin-konsollen (DevToolbar) gir live forhåndsvisning av alle designendringer.

---

### Key Features / Hovedfunksjoner

- **9 admin tabs** for full design control / 9 faner for full designkontroll
- **Light/dark mode** with independent per-element styling / Lys/mørk modus med uavhengig styling per element
- **6 sandbox clubs** for testing / 6 sandkasse-klubber for testing
- **Settings persistence** in localStorage per club / Innstillinger lagres per klubb
- **JSON export/import** for backup and sharing / JSON-eksport for backup
- **Content scraping** from existing club websites / Innholdsimport fra eksisterende klubbsider
- **NO/EN language toggle** in admin / Språkbytte norsk/engelsk

### URL Parameters

Switch club by adding \`?club=<id>\` to the URL:
\`\`\`
http://localhost:3000?club=msfotball
http://localhost:3000?club=dfi
\`\`\`

Available clubs: master, msfotball, dfi, kolbotn, honefoss, ulkisa
    `,
  },
  {
    id: 'adminkonsoll',
    title: 'Admin Console / Admin-konsoll',
    content: `
## Header Actions / Globale handlinger

| Icon | NO | EN |
|------|----|----|
| Club dropdown | Bytt aktiv klubb | Switch active club |
| 💾 Green | Lagre innstillinger | Save settings |
| ⬆️ | Last inn lagrede | Load saved |
| 📋 | Eksporter JSON | Export JSON |
| ⇄ | Bytt primær/sekundær | Swap primary/secondary |
| ☀️/🌙 | Lys/mørk modus | Light/dark mode |
| NO/EN | Språkbytte | Language toggle |
| 📖 | Dokumentasjon | Documentation |

---

## Tab 1: Klubb / Club

Club identity and branding. / Klubbidentitet og merkevare.

- **Logos:** Horizontal, vertical, favicon, SoMe
- **Club colors:** Primary + Secondary / Primær + Sekundær
- **Support colors:** 1–4 with "Auto" generation / Støttefarger med auto-generering
- **Motto:** Text, visibility toggle, color choice / Tekst, synlighet, fargevalg

---

## Tab 2: Layout

Page structure and component styling. / Sidestruktur og komponent-styling.

- **Page width:** Full / 1920 / 1490 / 1248 px / Sidebredde
- **Outer background:** Color when width ≠ full / Ytterbakgrunn for smale layouts
- **Section gap:** 0–48 px (for 1490/1248) / Seksjonsmellomrom
- **News grid:** 1+5, 2+4, 2x3, 3x2, List / Nyhetsgrid-oppsett
- **Rounding:** Card, Button, Module radius / Avrunding for kort, knapp, modul
- **CTA button:** Color, gradient, text color / CTA-knapp: farge, gradient, tekst
- **Heading bar:** News bar color / Overskriftslinje-farge
- **Tags:** Background + text color / Tag-farger

---

## Tab 3: Meny / Menu

Navigation dropdown style. / Meny-dropdown-stil.

- **Simple:** Standard dropdown / Enkel dropdown
- **Mega (box):** Grouped mega menu / Megameny (boks)
- **Mega (full):** Full-width mega menu / Megameny (fullbredde)

---

## Tab 4: Hero

Hero section configuration. / Hero-seksjon-konfigurasjon.

- **Floating logo:** Show/hide / Flytende logo av/på
- **Section top:** Flat / Rounded / Seksjonstopp: rett/avrundet
- **Line 1:** Color + optional background / Linje 1: farge + evt. bakgrunn
- **Line 2:** Color + optional background / Linje 2: farge + evt. bakgrunn
- **Image filter:** Overlay color + strength 0–100% / Bildefilter: farge + styrke
- **CTA:** Show/hide buttons / CTA-knapper av/på
- **Quick links:** Show/hide + alignment / Hurtiglenker + justering
- **Content alignment:** Left / Center / Right / Innholdsjustering

---

## Tab 5: Bakgrunn / Background

Background colors and text colors per mode. / Bakgrunner og tekstfarger per modus.

- **Edit mode toggle:** Choose light or dark to edit / Velg lys/mørk for redigering
- **Text colors:** Light + dark mode text / Tekstfarger for begge modi
- **Per-element backgrounds:** Section, News, Card, Module, Menu, Footer
- **Module heading color** / Moduloverskriftfarge
- **Logo for light bg:** Upload alternate logo / Logo for lys bakgrunn

---

## Tab 6: Tekst / Text

Typography settings. / Typografi-innstillinger.

- **Headings:** Font family (8 options) + weight (300–900) / Overskrift: font + vekt
- **Body text:** Font family + weight / Brødtekst: font + vekt
- **Module heading:** Font + size (XS/SM/MD/LG) + weight / Moduloverskrift: font + størrelse + vekt

---

## Tab 7: Modul / Module

Right sidebar module management. / Høyre sidebar-moduler.

- **Reorder:** Move modules up/down / Flytt moduler opp/ned
- **Toggle:** Enable/disable each module / Slå av/på hver modul
- **Per-module colors:** Background + text color for light and dark mode / Farger per modul per modus
- Modules: Neste kamp, Snarveier, Aktiviteter, Grasrotandelen, Sponsorer, Følg oss

---

## Tab 8: Seksjoner / Sections

Main page section management. / Hovedseksjon-håndtering.

- **Reorder:** Move sections up/down / Flytt seksjoner opp/ned
- **Toggle:** Enable/disable / Slå av/på
- **Flip:** Reverse text/image layout / Snu tekst/bilde
- **Per-section colors:** Bg, Text, Line1, Line2 for light and dark / Farger per seksjon per modus
- **Sponsors:** Heading style (full/module/hidden) + logo border / Sponsoroverskrift + logoramme
- **Sponsor-CTA:** Box toggle, gradient colors (G1/G2/G3), text color, angle

Sections: Klubbkolleksjon, Grasrotandelen, Bli med, Sponsorer, Sponsor-CTA, Kontakt

---

## Tab 9: Import

Content import from external sources. / Innholdsimport fra eksterne kilder.

- **News URL:** Paste URL, click Fetch / Lim inn URL, klikk Hent
- **Hero image:** Upload or set path / Last opp eller angi sti
- **Image paths:** Article → image mappings / Artikkel → bilde-koblinger
- **Folder hint:** \`/public/clubs/{clubId}/articles/\`

---

## Saving & Export / Lagring og eksport

- Settings auto-save on club switch / Innstillinger lagres automatisk ved klubbbytte
- **Save button:** Force save to localStorage / Tving lagring
- **Export:** Copy full JSON config for permanent storage / Kopier JSON for permanent lagring
- Storage key: \`klubb-settings-{clubId}\`
    `,
  },
  {
    id: 'designsystem',
    title: 'Design System / Designsystem',
    content: `
## CSS Variables / CSS-variabler

### Colors / Farger
\`\`\`
--color-primary         Club primary / Primærfarge
--color-accent          Club secondary / Sekundærfarge
--color-support-1…4     Support colors / Støttefarger
--color-text            Text (mode-dependent) / Tekst
--color-text-on-primary Auto contrast / Autokontrast
--color-text-on-accent  Auto contrast / Autokontrast
\`\`\`

### Border Radius / Avrunding
\`\`\`
--radius-card           Card / Kort
--radius-button         Button / Knapp
--radius-module         Module / Modul
\`\`\`

### Backgrounds / Bakgrunner (mode-dependent)
\`\`\`
--page-background       Page / Side
--section-background    Section / Seksjon
--news-background       News / Nyheter
--card-background       Cards / Kort
--module-background     Modules / Moduler
--menu-background       Menu / Meny
--footer-background     Footer / Bunn
\`\`\`

### Borders / Kanter
\`\`\`
--border-color          Border color / Kantfarge
--border-opacity        Border opacity
--card-border           Card (color-mix)
--module-border         Module (color-mix)
\`\`\`

### Typography / Typografi
\`\`\`
--font-heading          Heading font / Overskriftsfont
--font-heading-weight   Heading weight / Overskriftsvekt
--font-body             Body font / Brødtekstfont
--font-body-weight      Body weight / Brødtekstvekt
--module-heading-font   Module heading font
--module-heading-size   Module heading size (xs/sm/md/lg)
--module-heading-weight Module heading weight
--module-heading-color  Module heading color
\`\`\`

---

## How Colors Flow / Fargeflyt

\`\`\`
Club config → ThemeContext → CSS variables → Components
                ↓
        StyleSettings (per mode)
                ↓
        localStorage persistence
\`\`\`

All color changes propagate live through CSS variables. No page reload needed.

Alle fargeendringer propageres live via CSS-variabler. Ingen sideinnlasting nødvendig.
    `,
  },
  {
    id: 'filstruktur',
    title: 'File Structure / Filstruktur',
    content: `
## Project Structure / Prosjektstruktur

\`\`\`
/context/
  ThemeContext.tsx          # Central state + CSS injection

/components/
  DevToolbar.tsx            # Admin console (9 tabs)
  DocsModal.tsx             # This documentation modal
  TopNav.tsx                # Navigation with mega menu
  Hero.tsx                  # Hero section
  NewsGrid.tsx              # News grid (5 layouts)
  RightSidebar.tsx          # Right sidebar (6 modules)
  DynamicSections.tsx       # Page sections (6 sections)
  CTASection.tsx            # CTA component
  ClubLogos.tsx             # Club logos
  RoleSection.tsx           # Role section
  StatsSection.tsx          # Statistics

/config/
  clubConfig.ts             # ClubConfig interface + defaults
  clubSandbox.ts            # 6 sandbox clubs
  clubContent.ts            # Per-club content

/hooks/
  useTheme.ts               # useTheme, useClubColors, useDevMode

/utils/
  colorUtils.ts             # HSL/HEX/RGB + contrast
  contentScraper.ts         # URL scraping

/public/clubs/{clubId}/
  logo.svg                  # Horizontal logo
  logo-vertical.svg         # Vertical logo
  hero.jpg                  # Hero image
  articles/                 # Article images
  sponsors/                 # Sponsor logos
\`\`\`

### Key Files / Nøkkelfiler

- **ThemeContext.tsx** — All state, CSS variable injection, club switching, persistence
- **DevToolbar.tsx** — Admin console with 9 configurable tabs
- **clubSandbox.ts** — Test clubs: master, msfotball, dfi, kolbotn, honefoss, ulkisa
- **colorUtils.ts** — Color math: HSL/HEX/RGB conversions, auto contrast, support color generation
    `,
  },
];

function parseMarkdown(md: string): string {
  return md
    .replace(/^### (.*$)/gm, '<h4 class="text-sm font-bold text-white mt-4 mb-2">$1</h4>')
    .replace(/^## (.*$)/gm, '<h3 class="text-base font-bold text-white mt-6 mb-3 border-b border-white/20 pb-2">$1</h3>')
    .replace(/^# (.*$)/gm, '<h2 class="text-lg font-bold text-white mt-6 mb-3">$1</h2>')
    .replace(/```([^`]+)```/gs, '<pre class="bg-black/30 rounded p-3 text-[11px] font-mono text-green-400 overflow-x-auto my-3 whitespace-pre">$1</pre>')
    .replace(/`([^`]+)`/g, '<code class="bg-white/10 px-1 rounded text-[11px] font-mono text-yellow-400">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      const isHeader = cells.some(c => c.includes('---'));
      if (isHeader) return '';
      return `<div class="flex gap-2 text-[11px] py-1 border-b border-white/10">${cells.map(c => `<span class="flex-1">${c.trim()}</span>`).join('')}</div>`;
    })
    .replace(/^---$/gm, '<hr class="border-white/20 my-4" />')
    .replace(/^- (.*)$/gm, '<li class="text-[12px] text-gray-300 ml-4 list-disc">$1</li>')
    .replace(/^├── (.*)$/gm, '<div class="text-[11px] text-gray-400 ml-4">├── $1</div>')
    .replace(/^└── (.*)$/gm, '<div class="text-[11px] text-gray-400 ml-4">└── $1</div>')
    .replace(/\n\n/g, '</p><p class="text-[12px] text-gray-300 mb-3">')
    .replace(/\n/g, '<br />');
}

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DocsModal: React.FC<DocsModalProps> = ({ isOpen, onClose }) => {
  const [openSections, setOpenSections] = useState<string[]>(['overview']);

  const toggleSection = (id: string) => {
    setOpenSections(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-gray-900 rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gray-800">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h2 className="text-lg font-bold text-white">Documentation / Dokumentasjon</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="overflow-y-auto max-h-[calc(85vh-80px)] p-6">
          <div className="space-y-3">
            {DOCS.map((doc) => (
              <div 
                key={doc.id}
                className="border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleSection(doc.id)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <span className="font-semibold text-white">{doc.title}</span>
                  <svg 
                    className={`w-5 h-5 text-gray-400 transition-transform ${openSections.includes(doc.id) ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {openSections.includes(doc.id) && (
                  <div 
                    className="px-5 py-4 bg-gray-800/50"
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(doc.content) }}
                  />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <p className="text-gray-500 text-xs">
              Full docs: <code className="text-gray-400">docs/DESIGNSYSTEM-ANALYSE.md</code> ·
              README: <code className="text-gray-400">README.md</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsModal;
