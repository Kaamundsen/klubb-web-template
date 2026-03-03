import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { scrapeClubContent } from '../utils/contentScraper';
import { NewsLayout, WebLayout, FontFamily, FontWeight, ColorChoice, HeroTextColor, SECTION_NAMES, SectionConfig, DEFAULT_SECTIONS, MODULE_NAMES, ModuleConfig, DEFAULT_MODULES } from '../context/ThemeContext';
import { generateBalancedSupportColors } from '../utils/colorUtils';
import DocsModal from './DocsModal';

// SVG Icons
const Icons = {
  settings: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  save: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
  load: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>,
  export: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
  swap: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>,
  sun: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  moon: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>,
  close: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
  folder: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>,
  docs: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  auto: <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
};

// Layout ikoner
const LAYOUT_OPTIONS: { id: NewsLayout; icon: React.ReactNode; label: string }[] = [
  { id: 'mosaic', label: '1+5', icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><rect x="1" y="1" width="14" height="14" rx="1" /><rect x="17" y="1" width="6" height="6" rx="1" /><rect x="17" y="9" width="6" height="6" rx="1" /><rect x="1" y="17" width="6" height="6" rx="1" /><rect x="9" y="17" width="6" height="6" rx="1" /><rect x="17" y="17" width="6" height="6" rx="1" /></svg> },
  { id: 'featured', label: '2+4', icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><rect x="1" y="1" width="10" height="10" rx="1" /><rect x="13" y="1" width="10" height="10" rx="1" /><rect x="1" y="13" width="5" height="10" rx="1" /><rect x="7" y="13" width="5" height="10" rx="1" /><rect x="13" y="13" width="5" height="10" rx="1" /><rect x="19" y="13" width="5" height="10" rx="1" /></svg> },
  { id: 'twoCol', label: '2x3', icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><rect x="1" y="1" width="10" height="6" rx="1" /><rect x="13" y="1" width="10" height="6" rx="1" /><rect x="1" y="9" width="10" height="6" rx="1" /><rect x="13" y="9" width="10" height="6" rx="1" /><rect x="1" y="17" width="10" height="6" rx="1" /><rect x="13" y="17" width="10" height="6" rx="1" /></svg> },
  { id: 'threeCol', label: '3x2', icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><rect x="1" y="1" width="6" height="10" rx="1" /><rect x="9" y="1" width="6" height="10" rx="1" /><rect x="17" y="1" width="6" height="10" rx="1" /><rect x="1" y="13" width="6" height="10" rx="1" /><rect x="9" y="13" width="6" height="10" rx="1" /><rect x="17" y="13" width="6" height="10" rx="1" /></svg> },
  { id: 'list', label: 'Liste', icon: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor"><rect x="1" y="2" width="8" height="5" rx="1" /><rect x="11" y="3" width="12" height="2" rx="0.5" /><rect x="1" y="10" width="8" height="5" rx="1" /><rect x="11" y="11" width="12" height="2" rx="0.5" /><rect x="1" y="18" width="8" height="5" rx="1" /><rect x="11" y="19" width="12" height="2" rx="0.5" /></svg> },
];

const WEB_LAYOUT_OPTIONS: { id: WebLayout; label: string; desc: string }[] = [
  { id: 'full', label: 'Full', desc: 'Full bredde' },
  { id: '1920', label: '1920', desc: '1920px' },
  { id: '1490', label: '1490', desc: '1490px' },
  { id: '1248', label: '1248', desc: '1248px' },
];

const FONT_OPTIONS: { id: FontFamily; label: string }[] = [
  { id: 'inter', label: 'Inter' },
  { id: 'roboto', label: 'Roboto' },
  { id: 'poppins', label: 'Poppins' },
  { id: 'montserrat', label: 'Montserrat' },
  { id: 'opensans', label: 'Open Sans' },
  { id: 'lato', label: 'Lato' },
  { id: 'nunito', label: 'Nunito' },
  { id: 'raleway', label: 'Raleway' },
];

// ============================================================
// i18n – Norwegian / English labels for the admin toolbar
// ============================================================
const TOOLBAR_LABELS = {
  no: {
    // Tabs
    tab_klubb: 'Klubb', tab_layout: 'Layout', tab_hero: 'Hero', tab_bakgrunn: 'Bakgrunn',
    tab_tekst: 'Tekst', tab_modul: 'Modul', tab_seksjoner: 'Seksjoner', tab_import: 'Import',
    // Header actions
    save: 'Lagre innstillinger', load: 'Last innstillinger', export_json: 'Eksporter JSON',
    copied: 'Kopiert til utklippstavle!', swap_colors: 'Bytt farger', toggle_mode: 'Bytt modus',
    docs: 'Dokumentasjon',
    // Common on/off
    on: 'På', off: 'Av',
    // Color names
    primary: 'Primær', secondary: 'Sekundær',
    support1: 'Støtte 1', support2: 'Støtte 2', support3: 'Støtte 3', support4: 'Støtte 4',
    white: 'Hvit', light_gray: 'Lys grå', dark: 'Mørk', black: 'Sort', none: 'Ingen',
    // Alignment
    left: 'Venstre', center: 'Senter', right: 'Høyre',
    // Klubb tab
    logos: 'Logoer', club_colors: 'Klubbfarger', support_colors: 'Støttefarger',
    auto_title: 'Auto-generer støttefarger basert på primær og sekundær',
    motto: 'Motto', hide_tagline: 'Skjul tagline', show_tagline: 'Vis tagline',
    enter_motto: 'Skriv inn motto/tagline...',
    // Layout tab
    page_width: 'Sidebredde', full_width: 'Full bredde', outer_bg: 'Ytre bgr', gap: 'Luft',
    news_grid: 'Nyhetsgrid', rounding: 'Avrunding', card: 'Kort', button: 'Knapp',
    module: 'Modul', cta_button: 'CTA-knapp', gradient: 'Gradient', text: 'Tekst',
    heading_bar: 'Overskriftsstolpe', tags: 'Tags', list: 'Liste',
    // Hero tab
    logo: 'Logo', hide_float_logo: 'Skjul flytende logo', show_float_logo: 'Vis flytende logo',
    section_top: 'Seksjon-topp', flat: 'Rett', rounded: 'Avrundet',
    line1: 'Linje 1', line2: 'Linje 2', bg_on: 'Bgr På', bg_off: 'Bgr Av',
    hide_bg: 'Skjul bakgrunn', show_bg: 'Vis bakgrunn',
    image_filter: 'Bildefilter', strength: 'Styrke',
    cta: 'CTA', hide_cta: 'Skjul CTA-knapper', show_cta: 'Vis CTA-knapper',
    quick_links: 'Hurtigknapper', hide_quick_links: 'Skjul hurtigknapper', show_quick_links: 'Vis hurtigknapper',
    shortcut: 'Snarvei', content: 'Innhold',
    // Background tab
    light_mode: 'Lysmodus', dark_mode: 'Mørkmodus',
    section: 'Seksjon', news: 'Nyheter', menu: 'Meny', footer: 'Footer',
    module_heading: 'Modul-tittel', logo_light_bg: 'Logo (lys bgr)',
    // Text tab
    heading: 'Overskrift', body_text: 'Brødtekst',
    // Modul / Seksjoner
    move_up: 'Flytt opp', move_down: 'Flytt ned', disable: 'Deaktiver', enable: 'Aktiver',
    bg: 'Bgr', txt: 'Txt',
    swap_side: 'Bytt side (tekst/bilde)',
    large_heading: 'Stor heading', module_heading_style: 'Modul-heading', hidden: 'Skjult',
    show_border: 'Vis ramme/bakgrunn rundt logoer', frame: 'Ramme',
    box: 'Boks', box_tooltip: 'Boks: gradient i en smalere boks med ytre bgr. Av: gradient fyller hele bredden.',
    box_text: 'Boks-txt', angle: 'Vinkel', heading_style: 'Heading-stil',
    // Import tab
    import_news: 'Importer nyheter', club_url: 'URL til klubbnettside...', fetch: 'Hent',
    reset_import: 'Nullstill import', hero_image: 'Toppbilde (hero)',
    upload_hero: 'Last opp toppbilde', remove_hero: 'Fjern toppbilde',
    or_place_file: 'eller legg filen i:', image_paths: 'Bildestier',
    image_folder: 'Bildemappe', place_images: 'Legg bilder her med filnavn som matcher artiklene',
    no_content: 'Fant ikke innhold', fetching: 'Henter...',
    fetch_error: 'Feil ved henting', articles_imported: 'artikler importert for',
    upload_label: 'Last opp', remove_logo: 'Fjern logo',
    // Module names
    mod_neste_kamp: 'Neste kamp', mod_snarveier: 'Snarveier', mod_aktiviteter: 'Aktiviteter',
    mod_grasrotandelen: 'Grasrotandelen', mod_hovedsponsorer: 'Hovedsponsorer', mod_folg_oss: 'Følg oss',
    // Section names
    sec_klubbkolleksjon: 'Klubbkolleksjon', sec_grasrotandelen: 'Grasrotandelen',
    sec_bli_med: 'Bli med i klubben', sec_sponsorer: 'Sponsorer',
    sec_sponsor_cta: 'Sponsor-CTA', sec_kontakt: 'Kontakt',
  },
  en: {
    tab_klubb: 'Club', tab_layout: 'Layout', tab_hero: 'Hero', tab_bakgrunn: 'Background',
    tab_tekst: 'Text', tab_modul: 'Module', tab_seksjoner: 'Sections', tab_import: 'Import',
    save: 'Save settings', load: 'Load settings', export_json: 'Export JSON',
    copied: 'Copied to clipboard!', swap_colors: 'Swap colors', toggle_mode: 'Toggle mode',
    docs: 'Documentation',
    on: 'On', off: 'Off',
    primary: 'Primary', secondary: 'Secondary',
    support1: 'Support 1', support2: 'Support 2', support3: 'Support 3', support4: 'Support 4',
    white: 'White', light_gray: 'Light gray', dark: 'Dark', black: 'Black', none: 'None',
    left: 'Left', center: 'Center', right: 'Right',
    logos: 'Logos', club_colors: 'Club colors', support_colors: 'Support colors',
    auto_title: 'Auto-generate support colors from primary & secondary',
    motto: 'Motto', hide_tagline: 'Hide tagline', show_tagline: 'Show tagline',
    enter_motto: 'Enter motto/tagline...',
    page_width: 'Page width', full_width: 'Full width', outer_bg: 'Outer bg', gap: 'Gap',
    news_grid: 'News grid', rounding: 'Border radius', card: 'Card', button: 'Button',
    module: 'Module', cta_button: 'CTA button', gradient: 'Gradient', text: 'Text',
    heading_bar: 'Heading bar', tags: 'Tags', list: 'List',
    logo: 'Logo', hide_float_logo: 'Hide floating logo', show_float_logo: 'Show floating logo',
    section_top: 'Section top', flat: 'Flat', rounded: 'Rounded',
    line1: 'Line 1', line2: 'Line 2', bg_on: 'Bg On', bg_off: 'Bg Off',
    hide_bg: 'Hide background', show_bg: 'Show background',
    image_filter: 'Image filter', strength: 'Strength',
    cta: 'CTA', hide_cta: 'Hide CTA buttons', show_cta: 'Show CTA buttons',
    quick_links: 'Quick links', hide_quick_links: 'Hide quick links', show_quick_links: 'Show quick links',
    shortcut: 'Shortcut', content: 'Content',
    light_mode: 'Light mode', dark_mode: 'Dark mode',
    section: 'Section', news: 'News', menu: 'Menu', footer: 'Footer',
    module_heading: 'Module heading', logo_light_bg: 'Logo (light bg)',
    heading: 'Heading', body_text: 'Body text',
    move_up: 'Move up', move_down: 'Move down', disable: 'Disable', enable: 'Enable',
    bg: 'Bg', txt: 'Txt',
    swap_side: 'Swap side (text/image)',
    large_heading: 'Large heading', module_heading_style: 'Module heading', hidden: 'Hidden',
    show_border: 'Show border/bg around logos', frame: 'Border',
    box: 'Box', box_tooltip: 'Box: gradient in narrower box with outer bg. Off: gradient fills full width.',
    box_text: 'Box text', angle: 'Angle', heading_style: 'Heading style',
    import_news: 'Import news', club_url: 'Club website URL...', fetch: 'Fetch',
    reset_import: 'Reset import', hero_image: 'Hero image',
    upload_hero: 'Upload hero image', remove_hero: 'Remove hero image',
    or_place_file: 'or place file in:', image_paths: 'Image paths',
    image_folder: 'Image folder', place_images: 'Place images with filenames matching the articles',
    no_content: 'No content found', fetching: 'Fetching...',
    fetch_error: 'Error fetching', articles_imported: 'articles imported for',
    upload_label: 'Upload', remove_logo: 'Remove logo',
    mod_neste_kamp: 'Next match', mod_snarveier: 'Shortcuts', mod_aktiviteter: 'Activities',
    mod_grasrotandelen: 'Grasrotandelen', mod_hovedsponsorer: 'Main sponsors', mod_folg_oss: 'Follow us',
    sec_klubbkolleksjon: 'Club collection', sec_grasrotandelen: 'Grasrotandelen',
    sec_bli_med: 'Join the club', sec_sponsorer: 'Sponsors',
    sec_sponsor_cta: 'Sponsor CTA', sec_kontakt: 'Contact',
  },
} as const;

type LabelKey = keyof typeof TOOLBAR_LABELS.no;

const MODULE_NAMES_EN: Record<string, string> = {
  'neste-kamp': 'Next match', 'snarveier': 'Shortcuts', 'aktiviteter': 'Activities',
  'grasrotandelen': 'Grasrotandelen', 'sponsorer': 'Main sponsors', 'folg-oss': 'Follow us',
};
const SECTION_NAMES_EN: Record<string, string> = {
  'klubbkolleksjon': 'Club collection', 'grasrotandelen': 'Grasrotandelen',
  'bli-med': 'Join the club', 'sponsorer': 'Sponsors', 'sponsor-cta': 'Sponsor CTA', 'kontakt': 'Contact',
};

const TAB_DISPLAY: Record<string, LabelKey> = {
  klubb: 'tab_klubb', layout: 'tab_layout', hero: 'tab_hero', bakgrunn: 'tab_bakgrunn',
  tekst: 'tab_tekst', modul: 'tab_modul', seksjoner: 'tab_seksjoner', import: 'tab_import',
};

// Logo Uploader component
const LogoUploader: React.FC<{
  label: string;
  value: string;
  onChange: (dataUrl: string) => void;
  lang?: 'no' | 'en';
}> = ({ label, value, onChange, lang = 'no' }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        onChange(dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleClear = () => {
    onChange('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };
  
  return (
    <div className="flex items-center gap-1">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id={`logo-upload-${label}`}
      />
      <label
        htmlFor={`logo-upload-${label}`}
        className="flex items-center gap-1 px-2 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded cursor-pointer transition-all"
        title={`${lang === 'en' ? 'Upload' : 'Last opp'} ${label}`}
      >
        {value ? (
          <img src={value} alt={label} className="w-5 h-5 object-contain" />
        ) : (
          <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )}
        <span className="text-[9px] text-white/70">{label}</span>
      </label>
      {value && (
        <button
          onClick={handleClear}
          className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded transition-all"
          title={lang === 'en' ? 'Remove logo' : 'Fjern logo'}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

// Color Picker component
const ColorPicker: React.FC<{
  label: string;
  color: string;
  onChange: (color: string) => void;
  presets: { color: string; label: string }[];
  borderOpacity?: number;
  onBorderOpacityChange?: (opacity: number) => void;
}> = ({ label, color, onChange, presets, borderOpacity, onBorderOpacityChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [hexInput, setHexInput] = useState(color);
  const pickerRef = React.useRef<HTMLDivElement>(null);

  const handleHexChange = (hex: string) => {
    setHexInput(hex);
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      onChange(hex);
    }
  };

  // Lukk picker ved klikk utenfor
  React.useEffect(() => {
    if (!showPicker) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };
    
    // Bruk timeout for å unngå at klikket som åpnet picker også lukker den
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);
    
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPicker]);

  // Oppdater hexInput når color endres utenfra
  React.useEffect(() => {
    setHexInput(color);
  }, [color]);

  return (
    <div className="relative" ref={pickerRef}>
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="flex items-center gap-1.5 px-2 py-1 bg-white/5 hover:bg-white/10 rounded transition-all"
      >
        <div className="w-4 h-4 rounded border border-white/30" style={{ backgroundColor: color }} />
        <span className="text-white text-[10px]">{label}</span>
      </button>
      
      {showPicker && (
        <div className="absolute top-full left-0 mt-2 bg-gray-900 rounded-lg p-3 shadow-2xl border border-white/20 z-[10000] min-w-[200px]">
          {/* Hex input først */}
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={hexInput}
              onChange={(e) => handleHexChange(e.target.value)}
              className="flex-1 bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-[10px] font-mono"
              placeholder="#000000"
            />
          </div>
          
          {/* Color picker */}
          <input
            type="color"
            value={color}
            onChange={(e) => { onChange(e.target.value); setHexInput(e.target.value); }}
            className="w-full h-12 rounded cursor-pointer mb-2"
          />
          
          {/* Presets */}
          <div className="flex gap-1 flex-wrap mb-2">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => { onChange(preset.color); setHexInput(preset.color); }}
                className={`w-5 h-5 rounded border transition-all ${color === preset.color ? 'border-white scale-110' : 'border-transparent hover:border-white/50'}`}
                style={{ backgroundColor: preset.color }}
                title={preset.label}
              />
            ))}
          </div>
          
          {onBorderOpacityChange !== undefined && (
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-[9px]">Border</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={borderOpacity || 0}
                  onChange={(e) => onBorderOpacityChange(Number(e.target.value))}
                  className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb"
                />
                <span className="text-white text-[9px] w-6">{borderOpacity}%</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Slider component
const Slider: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  suffix?: string;
}> = ({ label, value, min, max, onChange, suffix = 'px' }) => (
  <div className="flex items-center gap-2">
    <span className="text-gray-400 text-[9px] uppercase tracking-wider whitespace-nowrap">{label}</span>
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-12 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb"
    />
    <span className="text-white text-[10px] font-mono w-6">{value}{suffix}</span>
  </div>
);

// Weight slider
const WeightSlider: React.FC<{
  value: FontWeight;
  onChange: (value: FontWeight) => void;
}> = ({ value, onChange }) => {
  const weights: FontWeight[] = [300, 400, 500, 600, 700, 800, 900];
  return (
    <div className="flex items-center gap-1">
      <input
        type="range"
        min={0}
        max={6}
        value={weights.indexOf(value)}
        onChange={(e) => onChange(weights[Number(e.target.value)])}
        className="w-10 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider-thumb"
      />
      <span className="text-white text-[9px] font-mono w-5">{value}</span>
    </div>
  );
};

const DevToolbar: React.FC = () => {
  const {
    club, setClub, availableClubs,
    newsLayout, setNewsLayout,
    styleSettings, updateStyleSettings,
    saveSettings, loadSettings, exportSettings,
    isDarkMode, toggleDarkMode,
    scrapedContent, setScrapedContent, setIsLoadingContent, isLoadingContent,
    swapColors, isColorsSwapped,
  } = useTheme();

  const [scrapeUrl, setScrapeUrl] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'klubb' | 'layout' | 'hero' | 'bakgrunn' | 'tekst' | 'modul' | 'seksjoner' | 'import'>('klubb');
  const [scrapeError, setScrapeError] = useState<string | null>(null);
  const [scrapeStatus, setScrapeStatus] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<'light' | 'dark'>('light');
  const [showDocs, setShowDocs] = useState(false);
  const [lang, setLang] = useState<'no' | 'en'>('no');

  const t = (key: LabelKey): string => TOOLBAR_LABELS[lang][key] ?? key;
  const modName = (id: string) => lang === 'en' ? (MODULE_NAMES_EN[id] || MODULE_NAMES[id] || id) : (MODULE_NAMES[id] || id);
  const secName = (id: string) => lang === 'en' ? (SECTION_NAMES_EN[id] || SECTION_NAMES[id] || id) : (SECTION_NAMES[id] || id);

  const colorPresets = [
    { color: styleSettings.primaryColor, label: t('primary') },
    { color: styleSettings.secondaryColor, label: t('secondary') },
    { color: styleSettings.supportColor1, label: t('support1') },
    { color: styleSettings.supportColor2, label: t('support2') },
    { color: styleSettings.supportColor3, label: t('support3') },
    { color: styleSettings.supportColor4, label: t('support4') },
    { color: '#ffffff', label: t('white') },
    { color: '#f9fafb', label: t('light_gray') },
    { color: '#111827', label: t('dark') },
    { color: '#000000', label: t('black') },
  ];

  // Auto-generer 4 balanserte støttefarger basert på primær- og sekundærfarge
  const handleAutoGenerateSupportColors = () => {
    const colors = generateBalancedSupportColors(styleSettings.primaryColor, styleSettings.secondaryColor);
    updateStyleSettings({
      supportColor1: colors.support1,
      supportColor2: colors.support2,
      supportColor3: colors.support3,
      supportColor4: colors.support4,
    });
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[æ]/g, 'ae')
      .replace(/[ø]/g, 'o')
      .replace(/[å]/g, 'a')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 60);
  };

  const handleScrape = async () => {
    if (!scrapeUrl) return;
    setIsLoadingContent(true);
    setScrapeError(null);
    setScrapeStatus(t('fetching'));
    try {
      const content = await scrapeClubContent(scrapeUrl);
      if (!content.heroNews && !content.articles?.length) {
        setScrapeError(t('no_content'));
      } else {
        const localArticles = content.articles?.map((a, idx) => {
          const slug = generateSlug(a.title) || `artikkel-${idx + 1}`;
          return {
            ...a,
            id: `imported-${slug}`,
            image: `/clubs/${club.id}/articles/${slug}.jpg`,
            originalImage: a.image,
          };
        });

        const localContent = {
          ...content,
          articles: localArticles,
          heroNews: content.heroNews ? {
            ...content.heroNews,
            image: `/clubs/${club.id}/hero.jpg`,
            originalImage: content.heroNews.image,
          } : undefined,
        };

        setScrapedContent(localContent);
        setScrapeStatus(`${localArticles?.length || 0} ${t('articles_imported')} ${club.name}`);
      }
    } catch (error) {
      setScrapeError(t('fetch_error'));
    } finally {
      setIsLoadingContent(false);
    }
  };

  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        updateStyleSettings({ heroImage: dataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearHeroImage = () => {
    updateStyleSettings({ heroImage: '' });
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="fixed top-3 right-3 z-[9999] w-8 h-8 bg-black/80 text-white rounded-full hover:bg-black hover:scale-110 transition-all flex items-center justify-center shadow-lg"
        title="Admin"
      >
        {Icons.settings}
      </button>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-gray-900 to-gray-800 border-b-2 border-[var(--color-accent)] shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <div className="flex items-center gap-3">
          {/* Klubb */}
          <select
            value={club.id}
            onChange={(e) => setClub(e.target.value)}
            className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-xs"
          >
            {availableClubs.map((c) => (
              <option key={c.id} value={c.id} className="bg-gray-900">{c.name}</option>
            ))}
          </select>

          {/* Tabs */}
          <div className="flex items-center gap-1 border-l border-white/20 pl-3">
            {(['klubb', 'layout', 'hero', 'bakgrunn', 'tekst', 'modul', 'seksjoner', 'import'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded text-[10px] uppercase tracking-wider transition-all ${
                  activeTab === tab ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {t(TAB_DISPLAY[tab])}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button onClick={saveSettings} className="p-1.5 bg-green-600 hover:bg-green-500 text-white rounded" title={t('save')}>
            {Icons.save}
          </button>
          <button onClick={loadSettings} className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded" title={t('load')}>
            {Icons.load}
          </button>
          <button onClick={() => { navigator.clipboard.writeText(exportSettings()); alert(t('copied')); }} className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded" title={t('export_json')}>
            {Icons.export}
          </button>
          <div className="w-px h-4 bg-white/20 mx-1" />
          <button onClick={swapColors} className={`p-1.5 rounded transition-all ${isColorsSwapped ? 'bg-yellow-500 text-black' : 'bg-white/10 text-white hover:bg-white/20'}`} title={t('swap_colors')}>
            {Icons.swap}
          </button>
          <button onClick={toggleDarkMode} className={`p-1.5 rounded transition-all ${isDarkMode ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`} title={t('toggle_mode')}>
            {isDarkMode ? Icons.moon : Icons.sun}
          </button>
          <div className="w-px h-4 bg-white/20 mx-1" />
          <button
            onClick={() => setLang(lang === 'no' ? 'en' : 'no')}
            className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${lang === 'en' ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
            title={lang === 'no' ? 'Switch to English' : 'Bytt til norsk'}
          >
            {lang === 'no' ? 'EN' : 'NO'}
          </button>
          <button onClick={() => setShowDocs(true)} className="p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded" title={t('docs')}>
            {Icons.docs}
          </button>
          <div className="w-px h-4 bg-white/20 mx-1" />
          <button onClick={() => setIsExpanded(false)} className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded">
            {Icons.close}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-3">
        {/* KLUBB - Logoer og farger */}
        {activeTab === 'klubb' && (
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-white/5 rounded px-2 py-1">
              <span className="text-gray-500 text-[9px] uppercase mr-1">{t('logos')}:</span>
              <LogoUploader label="v1" value={styleSettings.logoHorizontal} onChange={(url) => updateStyleSettings({ logoHorizontal: url })} lang={lang} />
              <LogoUploader label="v2" value={styleSettings.logoVertical} onChange={(url) => updateStyleSettings({ logoVertical: url })} lang={lang} />
              <LogoUploader label="Favicon" value={styleSettings.logoFavicon} onChange={(url) => updateStyleSettings({ logoFavicon: url })} lang={lang} />
              <LogoUploader label="SoMe" value={styleSettings.logoSocialMedia} onChange={(url) => updateStyleSettings({ logoSocialMedia: url })} lang={lang} />
            </div>
            
            <div className="w-px h-6 bg-white/20" />
            
            <div className="flex items-center gap-1 bg-white/5 rounded px-2 py-1">
              <span className="text-gray-500 text-[9px] uppercase mr-1">{t('club_colors')}:</span>
              <ColorPicker label={t('primary')} color={styleSettings.primaryColor} onChange={(c) => updateStyleSettings({ primaryColor: c })} presets={colorPresets} />
              <ColorPicker label={t('secondary')} color={styleSettings.secondaryColor} onChange={(c) => updateStyleSettings({ secondaryColor: c })} presets={colorPresets} />
            </div>
            
            <div className="w-px h-6 bg-white/20" />
            
            <div className="flex items-center gap-1 bg-white/5 rounded px-2 py-1">
              <span className="text-gray-500 text-[9px] uppercase mr-1">{t('support_colors')}:</span>
              <ColorPicker label={t('support1')} color={styleSettings.supportColor1} onChange={(c) => updateStyleSettings({ supportColor1: c })} presets={colorPresets} />
              <ColorPicker label={t('support2')} color={styleSettings.supportColor2} onChange={(c) => updateStyleSettings({ supportColor2: c })} presets={colorPresets} />
              <ColorPicker label={t('support3')} color={styleSettings.supportColor3} onChange={(c) => updateStyleSettings({ supportColor3: c })} presets={colorPresets} />
              <ColorPicker label={t('support4')} color={styleSettings.supportColor4} onChange={(c) => updateStyleSettings({ supportColor4: c })} presets={colorPresets} />
              <button
                onClick={handleAutoGenerateSupportColors}
                className="flex items-center gap-1 px-2 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded text-[9px] font-medium transition-all"
                title={t('auto_title')}
              >
                {Icons.auto}
                <span>Auto</span>
              </button>
            </div>
            
            <div className="w-px h-6 bg-white/20" />
            
            <div className="flex items-center gap-2 bg-white/5 rounded px-2 py-1">
              <span className="text-gray-500 text-[9px] uppercase mr-1">{t('motto')}:</span>
              <button
                onClick={() => updateStyleSettings({ heroTaglineVisible: !styleSettings.heroTaglineVisible })}
                className={`px-2 py-1 rounded text-[9px] font-medium transition-all ${
                  styleSettings.heroTaglineVisible 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white/10 text-white/50'
                }`}
                title={styleSettings.heroTaglineVisible ? t('hide_tagline') : t('show_tagline')}
              >
                {styleSettings.heroTaglineVisible ? t('on') : t('off')}
              </button>
              <input
                type="text"
                value={styleSettings.heroTaglineText || ''}
                onChange={(e) => updateStyleSettings({ heroTaglineText: e.target.value })}
                placeholder={t('enter_motto')}
                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-[10px] w-40 placeholder:text-white/40"
                disabled={!styleSettings.heroTaglineVisible}
              />
              <select
                value={styleSettings.heroTaglineColor || 'secondary'}
                onChange={(e) => updateStyleSettings({ heroTaglineColor: e.target.value as ColorChoice })}
                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-[10px]"
                disabled={!styleSettings.heroTaglineVisible}
              >
                <option value="primary" className="bg-gray-900">{t('primary')}</option>
                <option value="secondary" className="bg-gray-900">{t('secondary')}</option>
                <option value="support1" className="bg-gray-900">{t('support1')}</option>
                <option value="support2" className="bg-gray-900">{t('support2')}</option>
                <option value="support3" className="bg-gray-900">{t('support3')}</option>
                <option value="support4" className="bg-gray-900">{t('support4')}</option>
              </select>
            </div>
            
          </div>
        )}

        {/* LAYOUT */}
        {activeTab === 'layout' && (
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-1">
              <span className="text-gray-400 text-[9px] uppercase mr-1">{t('page_width')}:</span>
              {WEB_LAYOUT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => updateStyleSettings({ webLayout: opt.id })}
                  className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${
                    (styleSettings.webLayout || 'full') === opt.id
                      ? 'bg-white/30 text-white'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                  title={opt.desc}
                >
                  {opt.label}
                </button>
              ))}
              {styleSettings.webLayout && styleSettings.webLayout !== 'full' && (
                <ColorPicker label={t('outer_bg')} color={styleSettings.webLayoutBgColor || '#e5003c'} onChange={(c) => updateStyleSettings({ webLayoutBgColor: c })} presets={colorPresets} />
              )}
              {(styleSettings.webLayout === '1490' || styleSettings.webLayout === '1248') && (
                <Slider label={t('gap')} value={styleSettings.sectionGap ?? 24} min={0} max={48} onChange={(v) => updateStyleSettings({ sectionGap: v })} />
              )}
            </div>
            
            <div className="w-px h-6 bg-white/20" />

            <div className="flex items-center gap-1">
              <span className="text-gray-400 text-[9px] uppercase mr-1">{t('news_grid')}:</span>
              {LAYOUT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setNewsLayout(opt.id)}
                  className={`p-1.5 rounded transition-all ${newsLayout === opt.id ? 'bg-white/30 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
                  title={opt.label}
                >{opt.icon}</button>
              ))}
            </div>
            
            <div className="w-px h-6 bg-white/20" />
            
            <div className="flex items-center gap-1 bg-white/5 rounded px-2 py-1">
              <span className="text-gray-500 text-[9px] uppercase mr-1">{t('rounding')}:</span>
              <Slider label={t('card')} value={styleSettings.cardRadius} min={0} max={32} onChange={(v) => updateStyleSettings({ cardRadius: v })} />
              <Slider label={t('button')} value={styleSettings.buttonRadius} min={0} max={32} onChange={(v) => updateStyleSettings({ buttonRadius: v })} />
              <Slider label={t('module')} value={styleSettings.moduleRadius} min={0} max={48} onChange={(v) => updateStyleSettings({ moduleRadius: v })} />
            </div>
            
            <div className="w-px h-6 bg-white/20" />
            
            <div className="flex items-center gap-2 bg-white/5 rounded px-2 py-1">
              <span className="text-gray-500 text-[9px] uppercase mr-1">{t('cta_button')}:</span>
              <select
                value={styleSettings.ctaButtonColor || 'secondary'}
                onChange={(e) => updateStyleSettings({ ctaButtonColor: e.target.value as ColorChoice })}
                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-[10px]"
              >
                <option value="primary" className="bg-gray-900">{t('primary')}</option>
                <option value="secondary" className="bg-gray-900">{t('secondary')}</option>
                <option value="support1" className="bg-gray-900">{t('support1')}</option>
                <option value="support2" className="bg-gray-900">{t('support2')}</option>
                <option value="support3" className="bg-gray-900">{t('support3')}</option>
                <option value="support4" className="bg-gray-900">{t('support4')}</option>
              </select>
              <ColorPicker label={t('gradient')} color={styleSettings.ctaGradientColor} onChange={(c) => updateStyleSettings({ ctaGradientColor: c })} presets={colorPresets} />
              <ColorPicker label={t('text')} color={styleSettings.ctaTextColor || '#ffffff'} onChange={(c) => updateStyleSettings({ ctaTextColor: c })} presets={colorPresets} />
            </div>
            
            <div className="flex items-center gap-2 bg-white/5 rounded px-2 py-1">
              <span className="text-gray-500 text-[9px] uppercase mr-1">{t('heading_bar')}:</span>
              <select
                value={styleSettings.newsBarColor || 'secondary'}
                onChange={(e) => updateStyleSettings({ newsBarColor: e.target.value as ColorChoice })}
                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-[10px]"
              >
                <option value="primary" className="bg-gray-900">{t('primary')}</option>
                <option value="secondary" className="bg-gray-900">{t('secondary')}</option>
                <option value="support1" className="bg-gray-900">{t('support1')}</option>
                <option value="support2" className="bg-gray-900">{t('support2')}</option>
                <option value="support3" className="bg-gray-900">{t('support3')}</option>
                <option value="support4" className="bg-gray-900">{t('support4')}</option>
              </select>
            </div>
            
            <div className="w-px h-6 bg-white/20" />
            
            <div className="flex items-center gap-2 bg-white/5 rounded px-2 py-1">
              <span className="text-gray-500 text-[9px] uppercase mr-1">{t('tags')}:</span>
              <select
                value={styleSettings.tagColor || 'secondary'}
                onChange={(e) => updateStyleSettings({ tagColor: e.target.value as ColorChoice })}
                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-[10px]"
              >
                <option value="primary" className="bg-gray-900">{t('primary')}</option>
                <option value="secondary" className="bg-gray-900">{t('secondary')}</option>
                <option value="support1" className="bg-gray-900">{t('support1')}</option>
                <option value="support2" className="bg-gray-900">{t('support2')}</option>
                <option value="support3" className="bg-gray-900">{t('support3')}</option>
                <option value="support4" className="bg-gray-900">{t('support4')}</option>
              </select>
              <ColorPicker label={t('text')} color={styleSettings.tagTextColor || '#ffffff'} onChange={(c) => updateStyleSettings({ tagTextColor: c })} presets={colorPresets} />
            </div>
          </div>
        )}

        {/* HERO */}
        {activeTab === 'hero' && (
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-[9px] uppercase">{t('logo')}:</span>
              <button
                onClick={() => updateStyleSettings({ heroFloatingLogoVisible: !styleSettings.heroFloatingLogoVisible })}
                className={`px-2 py-1 rounded text-[9px] font-medium transition-all ${styleSettings.heroFloatingLogoVisible ? 'bg-green-600 text-white' : 'bg-white/10 text-white/50'}`}
                title={styleSettings.heroFloatingLogoVisible ? t('hide_float_logo') : t('show_float_logo')}
              >
                {styleSettings.heroFloatingLogoVisible ? t('on') : t('off')}
              </button>
            </div>
            
            <div className="w-px h-6 bg-white/20" />
            
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-[9px] uppercase">{t('section_top')}:</span>
              <select
                value={styleSettings.sectionTopStyle || 'flat'}
                onChange={(e) => updateStyleSettings({ sectionTopStyle: e.target.value as any })}
                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-[10px]"
              >
                <option value="flat" className="bg-gray-900">{t('flat')}</option>
                <option value="rounded" className="bg-gray-900">{t('rounded')}</option>
              </select>
            </div>
            
            <div className="w-px h-6 bg-white/20" />
            
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-[9px] uppercase">{t('line1')}:</span>
              <select value={styleSettings.heroLine1Color || 'white'} onChange={(e) => updateStyleSettings({ heroLine1Color: e.target.value as HeroTextColor })} className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-[10px]">
                <option value="white" className="bg-gray-900">{t('white')}</option>
                <option value="primary" className="bg-gray-900">{t('primary')}</option>
                <option value="secondary" className="bg-gray-900">{t('secondary')}</option>
                <option value="support1" className="bg-gray-900">{t('support1')}</option>
                <option value="support2" className="bg-gray-900">{t('support2')}</option>
                <option value="support3" className="bg-gray-900">{t('support3')}</option>
                <option value="support4" className="bg-gray-900">{t('support4')}</option>
              </select>
              <button
                onClick={() => updateStyleSettings({ heroLine1BgEnabled: !styleSettings.heroLine1BgEnabled })}
                className={`px-2 py-1 rounded text-[9px] font-medium transition-all ${styleSettings.heroLine1BgEnabled ? 'bg-green-600 text-white' : 'bg-white/10 text-white/50'}`}
                title={styleSettings.heroLine1BgEnabled ? t('hide_bg') : t('show_bg')}
              >
                {styleSettings.heroLine1BgEnabled ? t('bg_on') : t('bg_off')}
              </button>
              {styleSettings.heroLine1BgEnabled && (
                <select value={styleSettings.heroLine1BgColor || 'primary'} onChange={(e) => updateStyleSettings({ heroLine1BgColor: e.target.value as HeroTextColor })} className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-[10px]">
                  <option value="white" className="bg-gray-900">{t('white')}</option>
                  <option value="primary" className="bg-gray-900">{t('primary')}</option>
                  <option value="secondary" className="bg-gray-900">{t('secondary')}</option>
                  <option value="support1" className="bg-gray-900">{t('support1')}</option>
                  <option value="support2" className="bg-gray-900">{t('support2')}</option>
                  <option value="support3" className="bg-gray-900">{t('support3')}</option>
                  <option value="support4" className="bg-gray-900">{t('support4')}</option>
                </select>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-[9px] uppercase">{t('line2')}:</span>
              <select value={styleSettings.heroLine2Color || 'secondary'} onChange={(e) => updateStyleSettings({ heroLine2Color: e.target.value as HeroTextColor })} className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-[10px]">
                <option value="white" className="bg-gray-900">{t('white')}</option>
                <option value="primary" className="bg-gray-900">{t('primary')}</option>
                <option value="secondary" className="bg-gray-900">{t('secondary')}</option>
                <option value="support1" className="bg-gray-900">{t('support1')}</option>
                <option value="support2" className="bg-gray-900">{t('support2')}</option>
                <option value="support3" className="bg-gray-900">{t('support3')}</option>
                <option value="support4" className="bg-gray-900">{t('support4')}</option>
              </select>
              <button
                onClick={() => updateStyleSettings({ heroLine2BgEnabled: !styleSettings.heroLine2BgEnabled })}
                className={`px-2 py-1 rounded text-[9px] font-medium transition-all ${styleSettings.heroLine2BgEnabled ? 'bg-green-600 text-white' : 'bg-white/10 text-white/50'}`}
                title={styleSettings.heroLine2BgEnabled ? t('hide_bg') : t('show_bg')}
              >
                {styleSettings.heroLine2BgEnabled ? t('bg_on') : t('bg_off')}
              </button>
              {styleSettings.heroLine2BgEnabled && (
                <select value={styleSettings.heroLine2BgColor || 'secondary'} onChange={(e) => updateStyleSettings({ heroLine2BgColor: e.target.value as HeroTextColor })} className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-[10px]">
                  <option value="white" className="bg-gray-900">{t('white')}</option>
                  <option value="primary" className="bg-gray-900">{t('primary')}</option>
                  <option value="secondary" className="bg-gray-900">{t('secondary')}</option>
                  <option value="support1" className="bg-gray-900">{t('support1')}</option>
                  <option value="support2" className="bg-gray-900">{t('support2')}</option>
                  <option value="support3" className="bg-gray-900">{t('support3')}</option>
                  <option value="support4" className="bg-gray-900">{t('support4')}</option>
                </select>
              )}
            </div>
            
            <div className="w-px h-6 bg-white/20" />
            
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-[9px] uppercase">{t('image_filter')}:</span>
              <select value={styleSettings.heroOverlayColor || 'primary'} onChange={(e) => updateStyleSettings({ heroOverlayColor: e.target.value as ColorChoice | 'none' })} className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-[10px]">
                <option value="primary" className="bg-gray-900">{t('primary')}</option>
                <option value="secondary" className="bg-gray-900">{t('secondary')}</option>
                <option value="support1" className="bg-gray-900">{t('support1')}</option>
                <option value="support2" className="bg-gray-900">{t('support2')}</option>
                <option value="support3" className="bg-gray-900">{t('support3')}</option>
                <option value="support4" className="bg-gray-900">{t('support4')}</option>
                <option value="none" className="bg-gray-900">{t('none')}</option>
              </select>
            </div>
            
            <Slider label={t('strength')} value={styleSettings.heroOverlayOpacity || 90} min={0} max={100} onChange={(v) => updateStyleSettings({ heroOverlayOpacity: v })} suffix="%" />

            <div className="w-px h-6 bg-white/20" />

            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-[9px] uppercase">{t('cta')}:</span>
              <button
                onClick={() => updateStyleSettings({ heroCtaVisible: !styleSettings.heroCtaVisible })}
                className={`px-2 py-1 rounded text-[9px] font-medium transition-all ${styleSettings.heroCtaVisible ? 'bg-green-600 text-white' : 'bg-white/10 text-white/50'}`}
                title={styleSettings.heroCtaVisible ? t('hide_cta') : t('show_cta')}
              >
                {styleSettings.heroCtaVisible ? t('on') : t('off')}
              </button>
            </div>

            <div className="w-px h-6 bg-white/20" />

            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-[9px] uppercase">{t('quick_links')}:</span>
              <button
                onClick={() => updateStyleSettings({ heroShortcutsVisible: !styleSettings.heroShortcutsVisible })}
                className={`px-2 py-1 rounded text-[9px] font-medium transition-all ${styleSettings.heroShortcutsVisible ? 'bg-green-600 text-white' : 'bg-white/10 text-white/50'}`}
                title={styleSettings.heroShortcutsVisible ? t('hide_quick_links') : t('show_quick_links')}
              >
                {styleSettings.heroShortcutsVisible ? t('on') : t('off')}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-[9px] uppercase">{t('shortcut')}:</span>
              <select value={styleSettings.heroShortcutsAlign || 'center'} onChange={(e) => updateStyleSettings({ heroShortcutsAlign: e.target.value as 'left' | 'center' | 'right' })} className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-[10px]">
                <option value="left" className="bg-gray-900">{t('left')}</option>
                <option value="center" className="bg-gray-900">{t('center')}</option>
                <option value="right" className="bg-gray-900">{t('right')}</option>
              </select>
            </div>

            <div className="w-px h-6 bg-white/20" />

            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-[9px] uppercase">{t('content')}:</span>
              <select value={styleSettings.heroContentAlign || 'left'} onChange={(e) => updateStyleSettings({ heroContentAlign: e.target.value as 'left' | 'center' | 'right' })} className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-[10px]">
                <option value="left" className="bg-gray-900">{t('left')}</option>
                <option value="center" className="bg-gray-900">{t('center')}</option>
                <option value="right" className="bg-gray-900">{t('right')}</option>
              </select>
            </div>
          </div>
        )}

        {/* BAKGRUNN */}
        {activeTab === 'bakgrunn' && (
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1 bg-white/5 rounded px-1 py-0.5">
              <button onClick={() => { setEditMode('light'); if (isDarkMode) toggleDarkMode(); }} className={`p-1 rounded transition-all ${!isDarkMode ? 'bg-white/20 text-white' : 'text-white/50'}`} title={t('light_mode')}>{Icons.sun}</button>
              <button onClick={() => { setEditMode('dark'); if (!isDarkMode) toggleDarkMode(); }} className={`p-1 rounded transition-all ${isDarkMode ? 'bg-indigo-600 text-white' : 'text-white/50'}`} title={t('dark_mode')}>{Icons.moon}</button>
            </div>
            
            <div className="w-px h-6 bg-white/20" />
            
            <div className="flex items-center gap-1 bg-white/5 rounded px-2 py-1">
              <span className="text-gray-500 text-[9px] uppercase mr-1">{t('text')}:</span>
              <ColorPicker label={t('light_mode')} color={styleSettings.lightTextColor || '#111827'} onChange={(c) => updateStyleSettings({ lightTextColor: c })} presets={colorPresets} />
              <ColorPicker label={t('dark_mode')} color={styleSettings.darkTextColor || '#f9fafb'} onChange={(c) => updateStyleSettings({ darkTextColor: c })} presets={colorPresets} />
            </div>
            
            <div className="w-px h-6 bg-white/20" />
            
            <div className="flex items-center gap-1 bg-white/5 rounded px-2 py-1">
              <span className="text-gray-500 text-[9px] uppercase mr-1">{editMode === 'light' ? t('light_mode') : t('dark_mode')}:</span>
              <ColorPicker label={t('section')} color={editMode === 'light' ? styleSettings.lightSectionBackground : styleSettings.darkSectionBackground} onChange={(c) => updateStyleSettings(editMode === 'light' ? { lightSectionBackground: c } : { darkSectionBackground: c })} presets={colorPresets} />
              <ColorPicker label={t('news')} color={editMode === 'light' ? styleSettings.lightNewsBackground : styleSettings.darkNewsBackground} onChange={(c) => updateStyleSettings(editMode === 'light' ? { lightNewsBackground: c } : { darkNewsBackground: c })} presets={colorPresets} borderOpacity={styleSettings.moduleBorderOpacity} onBorderOpacityChange={(v) => updateStyleSettings({ moduleBorderOpacity: v })} />
              <ColorPicker label={t('card')} color={editMode === 'light' ? styleSettings.lightCardBackground : styleSettings.darkCardBackground} onChange={(c) => updateStyleSettings(editMode === 'light' ? { lightCardBackground: c } : { darkCardBackground: c })} presets={colorPresets} borderOpacity={styleSettings.cardBorderOpacity} onBorderOpacityChange={(v) => updateStyleSettings({ cardBorderOpacity: v })} />
              <ColorPicker label={t('module')} color={editMode === 'light' ? styleSettings.lightModuleBackground : styleSettings.darkModuleBackground} onChange={(c) => updateStyleSettings(editMode === 'light' ? { lightModuleBackground: c } : { darkModuleBackground: c })} presets={colorPresets} />
              <ColorPicker label={t('menu')} color={editMode === 'light' ? (styleSettings.menuBackgroundLight || '#ffffff') : (styleSettings.menuBackgroundDark || '#0b0e14')} onChange={(c) => updateStyleSettings(editMode === 'light' ? { menuBackgroundLight: c } : { menuBackgroundDark: c })} presets={colorPresets} />
              <ColorPicker label={t('footer')} color={editMode === 'light' ? (styleSettings.footerBackgroundLight || '') : (styleSettings.footerBackgroundDark || '')} onChange={(c) => updateStyleSettings(editMode === 'light' ? { footerBackgroundLight: c } : { footerBackgroundDark: c })} presets={colorPresets} />
            </div>
            
            <div className="w-px h-6 bg-white/20" />
            
            <ColorPicker label={t('module_heading')} color={styleSettings.moduleHeadingColor} onChange={(c) => updateStyleSettings({ moduleHeadingColor: c })} presets={colorPresets} />
            
            <div className="w-px h-6 bg-white/20" />
            
            <div className="flex items-center gap-2 bg-white/5 rounded px-2 py-1">
              <span className="text-gray-500 text-[9px] uppercase mr-1">{t('logo_light_bg')}:</span>
              <LogoUploader label="v1-lys" value={styleSettings.logoHorizontalLight || ''} onChange={(url) => updateStyleSettings({ logoHorizontalLight: url })} lang={lang} />
            </div>
          </div>
        )}

        {/* TEKST */}
        {activeTab === 'tekst' && (
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white/5 rounded px-2 py-1">
              <span className="text-gray-500 text-[9px] uppercase">{t('heading')}:</span>
              <select value={styleSettings.headingFont} onChange={(e) => updateStyleSettings({ headingFont: e.target.value as FontFamily })} className="bg-white/10 border border-white/20 rounded px-1 py-0.5 text-white text-[10px]">
                {FONT_OPTIONS.map((f) => <option key={f.id} value={f.id} className="bg-gray-900">{f.label}</option>)}
              </select>
              <WeightSlider value={styleSettings.headingWeight} onChange={(v) => updateStyleSettings({ headingWeight: v })} />
            </div>
            
            <div className="flex items-center gap-2 bg-white/5 rounded px-2 py-1">
              <span className="text-gray-500 text-[9px] uppercase">{t('body_text')}:</span>
              <select value={styleSettings.bodyFont} onChange={(e) => updateStyleSettings({ bodyFont: e.target.value as FontFamily })} className="bg-white/10 border border-white/20 rounded px-1 py-0.5 text-white text-[10px]">
                {FONT_OPTIONS.map((f) => <option key={f.id} value={f.id} className="bg-gray-900">{f.label}</option>)}
              </select>
              <WeightSlider value={styleSettings.bodyWeight} onChange={(v) => updateStyleSettings({ bodyWeight: v })} />
            </div>
            
            <div className="w-px h-6 bg-white/20" />
            
            <div className="flex items-center gap-2 bg-white/5 rounded px-2 py-1">
              <span className="text-gray-500 text-[9px] uppercase">{t('module_heading')}:</span>
              <select value={styleSettings.moduleHeadingFont} onChange={(e) => updateStyleSettings({ moduleHeadingFont: e.target.value as FontFamily })} className="bg-white/10 border border-white/20 rounded px-1 py-0.5 text-white text-[10px]">
                {FONT_OPTIONS.map((f) => <option key={f.id} value={f.id} className="bg-gray-900">{f.label}</option>)}
              </select>
              <select value={styleSettings.moduleHeadingSize} onChange={(e) => updateStyleSettings({ moduleHeadingSize: e.target.value as any })} className="bg-white/10 border border-white/20 rounded px-1 py-0.5 text-white text-[10px]">
                <option value="xs" className="bg-gray-900">XS</option>
                <option value="sm" className="bg-gray-900">SM</option>
                <option value="md" className="bg-gray-900">MD</option>
                <option value="lg" className="bg-gray-900">LG</option>
              </select>
              <WeightSlider value={styleSettings.moduleHeadingWeight} onChange={(v) => updateStyleSettings({ moduleHeadingWeight: v })} />
            </div>
          </div>
        )}

        {/* MODUL */}
        {activeTab === 'modul' && (
          <div className="flex items-start gap-3 flex-wrap">
            <div className="flex items-center gap-1 bg-white/5 rounded px-1 py-0.5 self-center">
              <button onClick={() => { setEditMode('light'); if (isDarkMode) toggleDarkMode(); }} className={`p-1 rounded transition-all ${!isDarkMode ? 'bg-white/20 text-white' : 'text-white/50'}`} title={t('light_mode')}>{Icons.sun}</button>
              <button onClick={() => { setEditMode('dark'); if (!isDarkMode) toggleDarkMode(); }} className={`p-1 rounded transition-all ${isDarkMode ? 'bg-indigo-600 text-white' : 'text-white/50'}`} title={t('dark_mode')}>{Icons.moon}</button>
            </div>
            
            <div className="w-px h-6 bg-white/20 self-center" />

            {/* Modul rekkefølge, synlighet og farger. Stilindeks fast per modul-id slik at Bgr/Txt alltid styrer riktig modul. */}
            {(() => {
              const MODULE_STYLE_INDEX: Record<string, number> = {
                'neste-kamp': 0,
                'snarveier': 1,
                'aktiviteter': 2,
                'grasrotandelen': 3,
                'sponsorer': 4,
                'folg-oss': 5,
              };
              const raw = styleSettings.modules || [];
              const modules = raw.some(m => m.id === 'aktiviteter') ? raw : [...DEFAULT_MODULES];
              const isLightMode = editMode === 'light';
              const base = isLightMode ? styleSettings.moduleStyles : styleSettings.moduleStylesDark;
              const ensured = Array.from({ length: 6 }, (_, i) => ({ backgroundColor: '', textColor: '', ...(base?.[i] || {}) }));
              return modules.map((mod, index) => {
                const styleIndex = MODULE_STYLE_INDEX[mod.id] ?? index;
                const moduleStyle = ensured[styleIndex] || { backgroundColor: '', textColor: '' };
                return (
                  <div key={mod.id} className={`flex items-center gap-1 rounded px-2 py-1 ${mod.enabled ? 'bg-white/5' : 'bg-white/5 opacity-50'}`}>
                    <div className="flex flex-col gap-0.5 mr-1">
                      <button 
                        onClick={() => {
                          if (index === 0) return;
                          const newModules = [...modules];
                          [newModules[index - 1], newModules[index]] = [newModules[index], newModules[index - 1]];
                          updateStyleSettings({ modules: newModules });
                        }}
                        className="text-white/40 hover:text-white text-[8px] leading-none"
                        title={t('move_up')}
                      >▲</button>
                      <button 
                        onClick={() => {
                          if (index === modules.length - 1) return;
                          const newModules = [...modules];
                          [newModules[index], newModules[index + 1]] = [newModules[index + 1], newModules[index]];
                          updateStyleSettings({ modules: newModules });
                        }}
                        className="text-white/40 hover:text-white text-[8px] leading-none"
                        title={t('move_down')}
                      >▼</button>
                    </div>
                    <button
                      onClick={() => {
                        const newModules = [...modules];
                        newModules[index] = { ...newModules[index], enabled: !newModules[index].enabled };
                        updateStyleSettings({ modules: newModules });
                      }}
                      className={`px-1.5 py-0.5 rounded text-[9px] font-medium transition-all ${
                        mod.enabled ? 'bg-green-600 text-white' : 'bg-white/10 text-white/50'
                      }`}
                      title={mod.enabled ? t('disable') : t('enable')}
                    >
                      {mod.enabled ? t('on') : t('off')}
                    </button>
                    <span className="text-gray-400 text-[9px] mr-1 truncate max-w-[60px]">{modName(mod.id)}</span>
                    <ColorPicker 
                      label={t('bg')} 
                      color={moduleStyle.backgroundColor || ''} 
                      onChange={(c) => {
                        if (isLightMode) {
                          const newModuleStyles = Array.from({ length: 6 }, (_, i) => ({ backgroundColor: '', textColor: '', ...(styleSettings.moduleStyles?.[i] || {}) }));
                          newModuleStyles[styleIndex] = { ...newModuleStyles[styleIndex], backgroundColor: c };
                          updateStyleSettings({ moduleStyles: newModuleStyles });
                        } else {
                          const newModuleStylesDark = Array.from({ length: 6 }, (_, i) => ({ backgroundColor: '', textColor: '', ...(styleSettings.moduleStylesDark?.[i] || {}) }));
                          newModuleStylesDark[styleIndex] = { ...newModuleStylesDark[styleIndex], backgroundColor: c };
                          updateStyleSettings({ moduleStylesDark: newModuleStylesDark });
                        }
                      }} 
                      presets={colorPresets} 
                    />
                    <ColorPicker 
                      label={t('txt')} 
                      color={moduleStyle.textColor || ''} 
                      onChange={(c) => {
                        if (isLightMode) {
                          const newModuleStyles = Array.from({ length: 6 }, (_, i) => ({ backgroundColor: '', textColor: '', ...(styleSettings.moduleStyles?.[i] || {}) }));
                          newModuleStyles[styleIndex] = { ...newModuleStyles[styleIndex], textColor: c };
                          updateStyleSettings({ moduleStyles: newModuleStyles });
                        } else {
                          const newModuleStylesDark = Array.from({ length: 6 }, (_, i) => ({ backgroundColor: '', textColor: '', ...(styleSettings.moduleStylesDark?.[i] || {}) }));
                          newModuleStylesDark[styleIndex] = { ...newModuleStylesDark[styleIndex], textColor: c };
                          updateStyleSettings({ moduleStylesDark: newModuleStylesDark });
                        }
                      }} 
                      presets={colorPresets} 
                    />
                  </div>
                );
              });
            })()}
          </div>
        )}

        {/* SEKSJONER */}
        {activeTab === 'seksjoner' && (
          <div className="flex items-start gap-2 flex-wrap">
            <div className="flex items-center gap-1 bg-white/5 rounded px-1 py-0.5 self-center">
              <button onClick={() => { setEditMode('light'); if (isDarkMode) toggleDarkMode(); }} className={`p-1 rounded transition-all ${!isDarkMode ? 'bg-white/20 text-white' : 'text-white/50'}`} title={t('light_mode')}>{Icons.sun}</button>
              <button onClick={() => { setEditMode('dark'); if (!isDarkMode) toggleDarkMode(); }} className={`p-1 rounded transition-all ${isDarkMode ? 'bg-indigo-600 text-white' : 'text-white/50'}`} title={t('dark_mode')}>{Icons.moon}</button>
            </div>
            
            <div className="w-px h-6 bg-white/20 self-center" />
            
            {/* Section list - same row */}
            {(styleSettings.sections || DEFAULT_SECTIONS).map((section, index) => {
              const isLightMode = editMode === 'light';
              const sectionStyle = (isLightMode ? section.style?.light : section.style?.dark) ?? {};
              const hasFlip = section.id === 'klubbkolleksjon' || section.id === 'grasrotandelen';
              
              return (
                <div key={section.id} className="flex items-center gap-1 bg-white/5 rounded px-2 py-1.5">
                  {/* Reorder buttons */}
                  <div className="flex flex-col gap-0.5 mr-1">
                    <button
                      onClick={() => {
                        if (index === 0) return;
                        const newSections = [...(styleSettings.sections || DEFAULT_SECTIONS)];
                        [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
                        updateStyleSettings({ sections: newSections });
                      }}
                      className="text-white/40 hover:text-white text-[8px] leading-none"
                      disabled={index === 0}
                      title={t('move_up')}
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => {
                        const sections = styleSettings.sections || DEFAULT_SECTIONS;
                        if (index === sections.length - 1) return;
                        const newSections = [...sections];
                        [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
                        updateStyleSettings({ sections: newSections });
                      }}
                      className="text-white/40 hover:text-white text-[8px] leading-none"
                      disabled={index === (styleSettings.sections || DEFAULT_SECTIONS).length - 1}
                      title={t('move_down')}
                    >
                      ▼
                    </button>
                  </div>
                  
                  {/* Toggle on/off */}
                  <button
                    onClick={() => {
                      const newSections = [...(styleSettings.sections || DEFAULT_SECTIONS)];
                      newSections[index] = { ...newSections[index], enabled: !newSections[index].enabled };
                      updateStyleSettings({ sections: newSections });
                    }}
                    className={`px-1.5 py-0.5 rounded text-[9px] font-medium transition-all ${
                      section.enabled 
                        ? 'bg-green-600 text-white' 
                        : 'bg-white/10 text-white/50'
                    }`}
                    title={section.enabled ? t('disable') : t('enable')}
                  >
                    {section.enabled ? t('on') : t('off')}
                  </button>
                  
                  <span className="text-white text-[10px] font-medium mx-1 min-w-[60px]">
                    {secName(section.id)}
                  </span>
                  
                  {/* Flip toggle (only for sections with text+image layout) */}
                  {hasFlip && (
                    <button
                      onClick={() => {
                        const newSections = [...(styleSettings.sections || DEFAULT_SECTIONS)];
                        newSections[index] = { ...newSections[index], flipped: !newSections[index].flipped };
                        updateStyleSettings({ sections: newSections });
                      }}
                      className={`px-1.5 py-0.5 rounded text-[9px] font-medium transition-all ${
                        section.flipped 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white/10 text-white/50'
                      }`}
                      title={t('swap_side')}
                    >
                      ⇄
                    </button>
                  )}
                  
                  {/* Sponsor heading style + logo border toggle */}
                  {section.id === 'sponsorer' && (
                    <>
                      <select
                        value={styleSettings.sponsorHeadingStyle || 'full'}
                        onChange={(e) => updateStyleSettings({ sponsorHeadingStyle: e.target.value as any })}
                        className="bg-white/10 border border-white/20 rounded px-1 py-0.5 text-white text-[9px]"
                        title={t('heading_style')}
                      >
                        <option value="full" className="bg-gray-900">{t('large_heading')}</option>
                        <option value="module" className="bg-gray-900">{t('module_heading_style')}</option>
                        <option value="hidden" className="bg-gray-900">{t('hidden')}</option>
                      </select>
                      <button
                        onClick={() => updateStyleSettings({ sponsorLogoShowBorder: !styleSettings.sponsorLogoShowBorder })}
                        className={`px-1.5 py-0.5 rounded text-[9px] font-medium transition-all ${
                          styleSettings.sponsorLogoShowBorder 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white/10 text-white/50'
                        }`}
                        title={t('show_border')}
                      >
                        {t('frame')}
                      </button>
                    </>
                  )}
                  
                  {/* Sponsor CTA box controls */}
                  {section.id === 'sponsor-cta' && (
                    <>
                      <button
                        onClick={() => updateStyleSettings({ sponsorCTAShowGradient: !(styleSettings.sponsorCTAShowGradient !== false) })}
                        className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${
                          styleSettings.sponsorCTAShowGradient !== false
                            ? 'bg-white/30 text-white'
                            : 'bg-white/10 text-white/60 hover:bg-white/20'
                        }`}
                        title={t('box_tooltip')}
                      >
                        {t('box')}
                      </button>
                      <ColorPicker label="G1" color={styleSettings.sponsorCTAColor1 || ''} onChange={(c) => updateStyleSettings({ sponsorCTAColor1: c })} presets={colorPresets} />
                      <ColorPicker label="G2" color={styleSettings.sponsorCTAColor2 || ''} onChange={(c) => updateStyleSettings({ sponsorCTAColor2: c })} presets={colorPresets} />
                      <ColorPicker label="G3" color={styleSettings.sponsorCTAColor3 || ''} onChange={(c) => updateStyleSettings({ sponsorCTAColor3: c })} presets={colorPresets} />
                      <ColorPicker label={t('box_text')} color={styleSettings.sponsorCTABoxTextColor || ''} onChange={(c) => updateStyleSettings({ sponsorCTABoxTextColor: c })} presets={colorPresets} />
                      <Slider label={t('angle')} value={styleSettings.sponsorCTAAngle ?? 135} min={0} max={360} onChange={(v) => updateStyleSettings({ sponsorCTAAngle: v })} suffix="°" />
                    </>
                  )}
                  
                  <ColorPicker 
                    label={t('bg')} 
                    color={sectionStyle.backgroundColor || ''} 
                    onChange={(c) => {
                      const newSections = [...(styleSettings.sections || DEFAULT_SECTIONS)];
                      const modeKey = isLightMode ? 'light' : 'dark';
                      const prev = newSections[index];
                      newSections[index] = {
                        ...prev,
                        style: {
                          ...(prev.style || {}),
                          [modeKey]: { ...(prev.style?.[modeKey] || {}), backgroundColor: c },
                        },
                      };
                      updateStyleSettings({ sections: newSections });
                    }} 
                    presets={colorPresets} 
                  />
                  <ColorPicker 
                    label={t('txt')} 
                    color={sectionStyle.textColor || ''} 
                    onChange={(c) => {
                      const newSections = [...(styleSettings.sections || DEFAULT_SECTIONS)];
                      const modeKey = isLightMode ? 'light' : 'dark';
                      const prev = newSections[index];
                      newSections[index] = {
                        ...prev,
                        style: {
                          ...(prev.style || {}),
                          [modeKey]: { ...(prev.style?.[modeKey] || {}), textColor: c },
                        },
                      };
                      updateStyleSettings({ sections: newSections });
                    }} 
                    presets={colorPresets} 
                  />
                  <ColorPicker 
                    label="L1" 
                    color={sectionStyle.headingLine1Color || ''} 
                    onChange={(c) => {
                      const newSections = [...(styleSettings.sections || DEFAULT_SECTIONS)];
                      const modeKey = isLightMode ? 'light' : 'dark';
                      const prev = newSections[index];
                      newSections[index] = {
                        ...prev,
                        style: {
                          ...(prev.style || {}),
                          [modeKey]: { ...(prev.style?.[modeKey] || {}), headingLine1Color: c },
                        },
                      };
                      updateStyleSettings({ sections: newSections });
                    }} 
                    presets={colorPresets} 
                  />
                  <ColorPicker 
                    label="L2" 
                    color={sectionStyle.headingLine2Color || ''} 
                    onChange={(c) => {
                      const newSections = [...(styleSettings.sections || DEFAULT_SECTIONS)];
                      const modeKey = isLightMode ? 'light' : 'dark';
                      const prev = newSections[index];
                      newSections[index] = {
                        ...prev,
                        style: {
                          ...(prev.style || {}),
                          [modeKey]: { ...(prev.style?.[modeKey] || {}), headingLine2Color: c },
                        },
                      };
                      updateStyleSettings({ sections: newSections });
                    }} 
                    presets={colorPresets} 
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* IMPORT */}
        {activeTab === 'import' && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-[9px] uppercase mr-1">{t('import_news')}:</span>
              <input
                type="text"
                value={scrapeUrl}
                onChange={(e) => setScrapeUrl(e.target.value)}
                placeholder={t('club_url')}
                className="bg-white/10 border border-white/20 rounded px-3 py-1.5 text-white text-xs w-64 placeholder:text-white/40"
                onKeyDown={(e) => e.key === 'Enter' && handleScrape()}
              />
              <button onClick={handleScrape} disabled={isLoadingContent || !scrapeUrl} className="bg-[var(--color-accent)] text-white px-3 py-1.5 rounded text-xs font-bold disabled:opacity-50">
                {isLoadingContent ? '...' : t('fetch')}
              </button>
              {scrapedContent?.articles?.length ? (
                <button onClick={() => setScrapedContent(null)} className="px-2 py-1 bg-red-600/30 hover:bg-red-600/50 text-red-300 rounded text-[10px] transition-all">
                  {t('reset_import')}
                </button>
              ) : null}
              {(scrapeStatus || scrapeError) && (
                <span className={`text-[10px] ${scrapeError ? 'text-red-400' : 'text-green-400'}`}>{scrapeError || scrapeStatus}</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-[9px] uppercase mr-1">{t('hero_image')}:</span>
              <div className="flex items-center gap-2">
                <input type="file" accept="image/*" onChange={handleHeroImageUpload} className="hidden" id="hero-image-upload" />
                <label htmlFor="hero-image-upload" className="flex items-center gap-1.5 px-2 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded cursor-pointer transition-all text-[10px] text-white/70">
                  {styleSettings.heroImage ? (
                    <img src={styleSettings.heroImage} alt="Hero" className="w-6 h-4 object-cover rounded" />
                  ) : (
                    <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                  {t('upload_hero')}
                </label>
                {styleSettings.heroImage && (
                  <button onClick={handleClearHeroImage} className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded transition-all" title={t('remove_hero')}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                <span className="text-gray-500 text-[9px]">{t('or_place_file')}</span>
                <code className="text-white/70 text-[10px] bg-white/5 px-1.5 py-0.5 rounded">/clubs/{club.id}/hero.jpg</code>
              </div>
            </div>

            {scrapedContent?.articles?.length ? (
              <div className="flex items-start gap-3">
                <span className="text-gray-500 text-[9px] uppercase mr-1 mt-1 whitespace-nowrap">{t('image_paths')}:</span>
                <div className="flex flex-wrap gap-2 max-h-[80px] overflow-y-auto">
                  {scrapedContent.articles.map((a, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 bg-white/5 rounded px-2 py-1">
                      <span className="text-white text-[9px] truncate max-w-[120px]" title={a.title}>{a.title}</span>
                      <span className="text-gray-600 text-[9px]">&rarr;</span>
                      <code className="text-green-400 text-[9px]">{a.image}</code>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-500 text-[10px]">
                {Icons.folder}
                <span>{t('image_folder')}: <code className="text-white/70">/public/clubs/{club.id}/articles/</code></span>
                <span className="text-gray-600">|</span>
                <span>{t('place_images')}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .slider-thumb::-webkit-slider-thumb { -webkit-appearance: none; width: 10px; height: 10px; border-radius: 50%; background: white; cursor: pointer; }
        .slider-thumb::-moz-range-thumb { width: 10px; height: 10px; border-radius: 50%; background: white; cursor: pointer; border: none; }
      `}</style>
      
      {/* Dokumentasjons-modal */}
      <DocsModal isOpen={showDocs} onClose={() => setShowDocs(false)} />
    </div>
  );
};

export default DevToolbar;
