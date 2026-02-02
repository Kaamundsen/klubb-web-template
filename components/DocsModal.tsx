import React, { useState } from 'react';

// Dokumentasjons-innhold
const DOCS = [
  {
    id: 'designsystem',
    title: 'Designsystem Analyse',
    content: `
## 1. NÅVÆRENDE SYSTEMSTRUKTUR

### 1.1 Fargekonfigurasjonen (StyleSettings)

| Variabel | I Admin | CSS-variabel | Faktisk bruk |
|----------|---------|--------------|--------------|
| primary1 | Klubb: Primær | --color-primary | Klubbens hovedfarge (tekst, titler, hover) |
| primary2 | Bakgrunn: Mørk | --color-dark | Mørk bakgrunnsfarge (dark mode bakgrunn) |
| accent1 | Klubb: Sekundær | --color-accent | Aksentfarge (knapper, highlights) |
| accent2 | Bakgrunn: Lys | --color-accent-light | Lysere variant (knapp hover, gradienter) |

**PROBLEM:** Navngivningen er forvirrende:
- "Bakgrunn: Mørk/Lys" er egentlig ikke bakgrunnsfarger for sideelementer
- "Bakgrunn: Lys" (accent2) brukes primært på knappers gradient-effekt

---

## 2. HVORDAN FARGENE BRUKES

### HERO-SEKSJON
- **Filter på bilde:** Styres av heroOverlayColor (primary/accent/none) + heroOverlayOpacity
- **Overskrift linje 1:** heroLine1Color (white/primary/accent)
- **Overskrift linje 2:** heroLine2Color (white/primary/accent)
- **Knapper:** accent1 → accent2 gradient

### TOPPMENY
- **"Bli medlem" knapp:** accent1 gradient, --radius-button
- **Dropdown meny:** --card-background, --card-border, hover med accent

### NYHETER
- **Seksjon:** --news-background, --module-border, --radius-module
- **Kort:** --card-background, --card-border, --radius-card
- **Tags:** 24px høyde, accent bakgrunn

### SIDEBAR-MODULER
- **Bakgrunn:** --module-background
- **Tittel:** --module-heading-color, font/size/weight

---

## 3. CSS-VARIABLER

### Farger
\`\`\`
--color-primary         Hovedfarge (primary1)
--color-accent          Aksentfarge (accent1)
--color-accent-light    Lys aksent (accent2)
--color-dark            Mørk bakgrunn (primary2)
--color-text            Tekstfarge (modus-avhengig)
--color-text-on-primary Auto-beregnet kontrast
--color-text-on-accent  Auto-beregnet kontrast
\`\`\`

### Border-radius
\`\`\`
--radius-card    Kort-avrunding
--radius-button  Knapp-avrunding
--radius-module  Modul-avrunding
\`\`\`

### Bakgrunner (modus-avhengig)
\`\`\`
--page-background     Sidebakgrunn
--section-background  Seksjon under hero
--news-background     Nyhetsseksjon
--module-background   Moduler
--card-background     Kort
\`\`\`

---

## 4. KJENTE PROBLEMER

1. **Navngivning:** "Bakgrunn: Mørk/Lys" brukes ikke til bakgrunner
2. **Disconnect:** Hero filter velges i Stil-tab, farge settes i Farger-tab
3. **accent2 bruk:** Heter "Bakgrunn: Lys" men brukes på knapp-gradient

---

## 5. ANBEFALT NY STRUKTUR

\`\`\`
KLUBBFARGER:
├── Primærfarge: Klubbens hovedfarge
└── Sekundærfarge: Klubbens andre farge

STØTTEFARGER:
├── Mørk bakgrunn: For dark mode
├── Lys variant: For hover-effekter
└── Grå-skala: Borders, subtil tekst

MODUS-AVHENGIGE:
├── Sidebakgrunn
├── Kort-bakgrunn
├── Modul-bakgrunn
├── Tekstfarge
└── Border-farge/opacity
\`\`\`
    `,
  },
  {
    id: 'filstruktur',
    title: 'Filstruktur',
    content: `
## Prosjektstruktur

\`\`\`
/context/
  ThemeContext.tsx        # All state og CSS-variabel-injeksjon

/components/
  DevToolbar.tsx          # Admin-konsoll
  DocsModal.tsx           # Dokumentasjons-modal
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
  msfotball/              # MS Fotball
  dfi/                    # DFI
  kolbotn/                # Kolbotn
  honefoss/               # Hønefoss
  ulkisa/                 # Ullensaker/Kisa

/docs/
  DESIGNSYSTEM-ANALYSE.md # Full dokumentasjon
\`\`\`

## Viktige filer

### ThemeContext.tsx
- Definerer StyleSettings interface
- Håndterer klubb-bytte og state-persistering
- Injiserer CSS-variabler via injectThemeVariables()

### clubSandbox.ts
- Liste over test-klubber
- Farger, logoer og domene for hver klubb

### DevToolbar.tsx
- Admin-konsoll med tabs: Stil, Farger, Tekst, Import
- Lagring til localStorage per klubb
    `,
  },
  {
    id: 'adminkonsoll',
    title: 'Admin-konsoll Guide',
    content: `
## Slik bruker du admin-konsollen

### Header-knapper

| Ikon | Funksjon |
|------|----------|
| 💾 Grønn | Lagre innstillinger for denne klubben |
| ⬆️ | Last lagrede innstillinger |
| 📋 | Kopier innstillinger som JSON |
| ⇄ | Bytt primær/sekundær farger |
| ☀️/🌙 | Bytt lys/mørk modus |

### Tab: STIL
- **Layout:** Velg nyhetsgrid-oppsett (1+5, 2+4, etc.)
- **Avrunding:** Kort, Knapp, Modul (px)
- **Topp:** Stil på overgang hero → innhold
- **Linje 1/2:** Farger på hero-overskrift
- **Filter:** Farge og styrke på hero-bilde overlay

### Tab: FARGER
- **Klubb:** Primær og Sekundær farge
- **Bakgrunn:** Mørk og Lys (brukes i gradienter)
- **Tekst:** Tekstfarge for lys/mørk modus
- **☀️/🌙:** Velg om du redigerer lys eller mørk modus
- **Seksjon/Nyheter/Kort/Modul:** Bakgrunnsfarger per element

### Tab: TEKST
- **Overskrift:** Font og vekt
- **Brødtekst:** Font og vekt
- **Modul-tittel:** Font, størrelse, vekt, farge

### Tab: IMPORT
- Lim inn URL for å hente innhold fra eksisterende klubbside
- Viser hvor klubb-assets ligger: /clubs/{klubb-id}/

### Lagring
- Innstillinger lagres automatisk ved klubb-bytte
- Bruk grønn knapp for å tvinge lagring
- Eksporter JSON for å legge i kode permanent
    `,
  },
];

// Enkel markdown-til-HTML konvertering
function parseMarkdown(md: string): string {
  return md
    // Headers
    .replace(/^### (.*$)/gm, '<h4 class="text-sm font-bold text-white mt-4 mb-2">$1</h4>')
    .replace(/^## (.*$)/gm, '<h3 class="text-base font-bold text-white mt-6 mb-3 border-b border-white/20 pb-2">$1</h3>')
    .replace(/^# (.*$)/gm, '<h2 class="text-lg font-bold text-white mt-6 mb-3">$1</h2>')
    // Code blocks
    .replace(/```([^`]+)```/gs, '<pre class="bg-black/30 rounded p-3 text-[11px] font-mono text-green-400 overflow-x-auto my-3 whitespace-pre">$1</pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-white/10 px-1 rounded text-[11px] font-mono text-yellow-400">$1</code>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
    // Tables
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      const isHeader = cells.some(c => c.includes('---'));
      if (isHeader) return '';
      return `<div class="flex gap-2 text-[11px] py-1 border-b border-white/10">${cells.map(c => `<span class="flex-1">${c.trim()}</span>`).join('')}</div>`;
    })
    // Horizontal rule
    .replace(/^---$/gm, '<hr class="border-white/20 my-4" />')
    // Lists
    .replace(/^- (.*)$/gm, '<li class="text-[12px] text-gray-300 ml-4 list-disc">$1</li>')
    .replace(/^├── (.*)$/gm, '<div class="text-[11px] text-gray-400 ml-4">├── $1</div>')
    .replace(/^└── (.*)$/gm, '<div class="text-[11px] text-gray-400 ml-4">└── $1</div>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="text-[12px] text-gray-300 mb-3">')
    // Line breaks
    .replace(/\n/g, '<br />');
}

interface DocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DocsModal: React.FC<DocsModalProps> = ({ isOpen, onClose }) => {
  const [openSections, setOpenSections] = useState<string[]>(['designsystem']);

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
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-gray-900 rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gray-800">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h2 className="text-lg font-bold text-white">Dokumentasjon</h2>
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
        
        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-80px)] p-6">
          <div className="space-y-3">
            {DOCS.map((doc) => (
              <div 
                key={doc.id}
                className="border border-white/10 rounded-xl overflow-hidden"
              >
                {/* Accordion Header */}
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
                
                {/* Accordion Content */}
                {openSections.includes(doc.id) && (
                  <div 
                    className="px-5 py-4 bg-gray-800/50"
                    dangerouslySetInnerHTML={{ __html: parseMarkdown(doc.content) }}
                  />
                )}
              </div>
            ))}
          </div>
          
          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <p className="text-gray-500 text-xs">
              Full dokumentasjon: <code className="text-gray-400">/docs/DESIGNSYSTEM-ANALYSE.md</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsModal;
