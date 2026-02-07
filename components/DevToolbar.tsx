import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { scrapeClubContent } from '../utils/contentScraper';
import { NewsLayout, FontFamily, FontWeight, ColorChoice, HeroTextColor } from '../context/ThemeContext';
import { generateDarkBackground, generateGradientLight } from '../utils/colorUtils';
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

  const handleHexChange = (hex: string) => {
    setHexInput(hex);
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      onChange(hex);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="flex items-center gap-1.5 px-2 py-1 bg-white/5 hover:bg-white/10 rounded transition-all"
      >
        <div className="w-4 h-4 rounded border border-white/30" style={{ backgroundColor: color }} />
        <span className="text-white text-[10px]">{label}</span>
      </button>
      
      {showPicker && (
        <div className="absolute top-full left-0 mt-2 bg-gray-900 rounded-lg p-3 shadow-2xl border border-white/20 z-[10000] min-w-[200px]">
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
          
          <input
            type="color"
            value={color}
            onChange={(e) => { onChange(e.target.value); setHexInput(e.target.value); }}
            className="w-full h-12 rounded cursor-pointer mb-2"
          />
          
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={hexInput}
              onChange={(e) => handleHexChange(e.target.value)}
              className="flex-1 bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-[10px] font-mono"
              placeholder="#000000"
            />
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
          
          <button onClick={() => setShowPicker(false)} className="mt-2 w-full bg-white/10 hover:bg-white/20 text-white text-[10px] py-1 rounded">
            Lukk
          </button>
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
    setScrapedContent, setIsLoadingContent, isLoadingContent,
    swapColors, isColorsSwapped,
  } = useTheme();

  const [scrapeUrl, setScrapeUrl] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'klubb' | 'layout' | 'hero' | 'bakgrunn' | 'tekst' | 'import'>('klubb');
  const [scrapeError, setScrapeError] = useState<string | null>(null);
  const [scrapeStatus, setScrapeStatus] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<'light' | 'dark'>('light');
  const [showDocs, setShowDocs] = useState(false);

  const colorPresets = [
    { color: styleSettings.primaryColor, label: 'Primær' },
    { color: styleSettings.secondaryColor, label: 'Sekundær' },
    { color: styleSettings.supportColor1, label: 'Støtte 1' },
    { color: styleSettings.supportColor2, label: 'Støtte 2' },
    { color: styleSettings.supportColor3, label: 'Støtte 3' },
    { color: '#ffffff', label: 'Hvit' },
    { color: '#f9fafb', label: 'Lys grå' },
    { color: '#111827', label: 'Mørk' },
    { color: '#000000', label: 'Sort' },
  ];

  // Auto-generer støttefarger basert på primær- og sekundærfarge
  const handleAutoGenerateSupportColors = () => {
    const support1 = generateGradientLight(styleSettings.secondaryColor);
    const support2 = generateDarkBackground(styleSettings.primaryColor);
    updateStyleSettings({
      supportColor1: support1,
      supportColor2: support2,
    });
  };

  const handleScrape = async () => {
    if (!scrapeUrl) return;
    setIsLoadingContent(true);
    setScrapeError(null);
    setScrapeStatus('Henter...');
    try {
      const content = await scrapeClubContent(scrapeUrl);
      if (!content.heroNews && !content.articles?.length) {
        setScrapeError('Fant ikke innhold');
      } else {
        setScrapedContent(content);
        setScrapeStatus(`${content.articles?.length || 0} artikler`);
      }
    } catch (error) {
      setScrapeError('Feil ved henting');
    } finally {
      setIsLoadingContent(false);
    }
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
            {(['klubb', 'layout', 'hero', 'bakgrunn', 'tekst', 'import'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded text-[10px] uppercase tracking-wider transition-all ${
                  activeTab === tab ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button onClick={saveSettings} className="p-1.5 bg-green-600 hover:bg-green-500 text-white rounded" title="Lagre innstillinger">
            {Icons.save}
          </button>
          <button onClick={loadSettings} className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded" title="Last innstillinger">
            {Icons.load}
          </button>
          <button onClick={() => { navigator.clipboard.writeText(exportSettings()); alert('Kopiert til utklippstavle!'); }} className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded" title="Eksporter JSON">
            {Icons.export}
          </button>
          <div className="w-px h-4 bg-white/20 mx-1" />
          <button onClick={swapColors} className={`p-1.5 rounded transition-all ${isColorsSwapped ? 'bg-yellow-500 text-black' : 'bg-white/10 text-white hover:bg-white/20'}`} title="Bytt farger">
            {Icons.swap}
          </button>
          <button onClick={toggleDarkMode} className={`p-1.5 rounded transition-all ${isDarkMode ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white hover:bg-white/20'}`} title="Bytt modus">
            {isDarkMode ? Icons.moon : Icons.sun}
          </button>
          <div className="w-px h-4 bg-white/20 mx-1" />
          <button onClick={() => setShowDocs(true)} className="p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded" title="Dokumentasjon">
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
        {/* KLUBB - Alle farger samlet */}
        {activeTab === 'klubb' && (
          <div className="flex items-center gap-3 flex-wrap">
            {/* Klubbfarger */}
            <div className="flex items-center gap-1 bg-white/5 rounded px-2 py-1">
              <span className="text-gray-500 text-[9px] uppercase mr-1">Klubbfarger:</span>
              <ColorPicker label="Primær" color={styleSettings.primaryColor} onChange={(c) => updateStyleSettings({ primaryColor: c })} presets={colorPresets} />
              <ColorPicker label="Sekundær" color={styleSettings.secondaryColor} onChange={(c) => updateStyleSettings({ secondaryColor: c })} presets={colorPresets} />
            </div>
            
            <div className="w-px h-6 bg-white/20" />
            
            {/* Støttefarger */}
            <div className="flex items-center gap-1 bg-white/5 rounded px-2 py-1">
              <span className="text-gray-500 text-[9px] uppercase mr-1">Støttefarger:</span>
              <ColorPicker label="Støtte 1" color={styleSettings.supportColor1} onChange={(c) => updateStyleSettings({ supportColor1: c })} presets={colorPresets} />
              <ColorPicker label="Støtte 2" color={styleSettings.supportColor2} onChange={(c) => updateStyleSettings({ supportColor2: c })} presets={colorPresets} />
              <ColorPicker label="Støtte 3" color={styleSettings.supportColor3} onChange={(c) => updateStyleSettings({ supportColor3: c })} presets={colorPresets} />
              <button
                onClick={handleAutoGenerateSupportColors}
                className="flex items-center gap-1 px-2 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded text-[9px] font-medium transition-all"
                title="Auto-generer støttefarger basert på primær og sekundær"
              >
                {Icons.auto}
                <span>Auto</span>
              </button>
            </div>
            
            <div className="w-px h-6 bg-white/20" />
            
            {/* Tagline/Motto */}
            <div className="flex items-center gap-2 bg-white/5 rounded px-2 py-1">
              <span className="text-gray-500 text-[9px] uppercase mr-1">Motto:</span>
              <button
                onClick={() => updateStyleSettings({ heroTaglineVisible: !styleSettings.heroTaglineVisible })}
                className={`px-2 py-1 rounded text-[9px] font-medium transition-all ${
                  styleSettings.heroTaglineVisible 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white/10 text-white/50'
                }`}
                title={styleSettings.heroTaglineVisible ? 'Skjul tagline' : 'Vis tagline'}
              >
                {styleSettings.heroTaglineVisible ? 'På' : 'Av'}
              </button>
              <input
                type="text"
                value={styleSettings.heroTaglineText || ''}
                onChange={(e) => updateStyleSettings({ heroTaglineText: e.target.value })}
                placeholder="Skriv inn motto/tagline..."
                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-[10px] w-40 placeholder:text-white/40"
                disabled={!styleSettings.heroTaglineVisible}
              />
              <select
                value={styleSettings.heroTaglineColor || 'secondary'}
                onChange={(e) => updateStyleSettings({ heroTaglineColor: e.target.value as ColorChoice })}
                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-[10px]"
                disabled={!styleSettings.heroTaglineVisible}
              >
                <option value="primary" className="bg-gray-900">Primær</option>
                <option value="secondary" className="bg-gray-900">Sekundær</option>
                <option value="support1" className="bg-gray-900">Støtte 1</option>
                <option value="support2" className="bg-gray-900">Støtte 2</option>
                <option value="support3" className="bg-gray-900">Støtte 3</option>
              </select>
            </div>
            
            <div className="w-px h-6 bg-white/20" />
            
            {/* CTA-knapp farger (hovedfarge + gradient) */}
            <div className="flex items-center gap-2 bg-white/5 rounded px-2 py-1">
              <span className="text-gray-500 text-[9px] uppercase mr-1">CTA-knapp:</span>
              <select
                value={styleSettings.ctaButtonColor || 'secondary'}
                onChange={(e) => updateStyleSettings({ ctaButtonColor: e.target.value as ColorChoice })}
                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-[10px]"
              >
                <option value="primary" className="bg-gray-900">Primær</option>
                <option value="secondary" className="bg-gray-900">Sekundær</option>
                <option value="support1" className="bg-gray-900">Støtte 1</option>
                <option value="support2" className="bg-gray-900">Støtte 2</option>
                <option value="support3" className="bg-gray-900">Støtte 3</option>
              </select>
              <span className="text-gray-500 text-[9px]">Gradient:</span>
              <ColorPicker label="Gradient" color={styleSettings.ctaGradientColor} onChange={(c) => updateStyleSettings({ ctaGradientColor: c })} presets={colorPresets} />
            </div>
            
            <div className="flex items-center gap-2 bg-white/5 rounded px-2 py-1">
              <span className="text-gray-500 text-[9px] uppercase mr-1">Overskriftsstolpe:</span>
              <select
                value={styleSettings.newsBarColor || 'secondary'}
                onChange={(e) => updateStyleSettings({ newsBarColor: e.target.value as ColorChoice })}
                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-[10px]"
              >
                <option value="primary" className="bg-gray-900">Primær</option>
                <option value="secondary" className="bg-gray-900">Sekundær</option>
                <option value="support1" className="bg-gray-900">Støtte 1</option>
                <option value="support2" className="bg-gray-900">Støtte 2</option>
                <option value="support3" className="bg-gray-900">Støtte 3</option>
              </select>
            </div>
          </div>
        )}

        {/* LAYOUT - Nyhetsgrid og avrunding */}
        {activeTab === 'layout' && (
          <div className="flex items-center gap-6 flex-wrap">
            {/* Layout */}
            <div className="flex items-center gap-1">
              <span className="text-gray-400 text-[9px] uppercase mr-1">Nyhetsgrid:</span>
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
            
            {/* Avrunding */}
            <div className="flex items-center gap-1 bg-white/5 rounded px-2 py-1">
              <span className="text-gray-500 text-[9px] uppercase mr-1">Avrunding:</span>
              <Slider label="Kort" value={styleSettings.cardRadius} min={0} max={32} onChange={(v) => updateStyleSettings({ cardRadius: v })} />
              <Slider label="Knapp" value={styleSettings.buttonRadius} min={0} max={32} onChange={(v) => updateStyleSettings({ buttonRadius: v })} />
              <Slider label="Modul" value={styleSettings.moduleRadius} min={0} max={48} onChange={(v) => updateStyleSettings({ moduleRadius: v })} />
            </div>
          </div>
        )}

        {/* HERO - Hero innstillinger samlet */}
        {activeTab === 'hero' && (
          <div className="flex items-center gap-6 flex-wrap">
            {/* Flytende logo toggle */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-[9px] uppercase">Logo:</span>
              <button
                onClick={() => updateStyleSettings({ heroFloatingLogoVisible: !styleSettings.heroFloatingLogoVisible })}
                className={`px-2 py-1 rounded text-[9px] font-medium transition-all ${
                  styleSettings.heroFloatingLogoVisible 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white/10 text-white/50'
                }`}
                title={styleSettings.heroFloatingLogoVisible ? 'Skjul flytende logo' : 'Vis flytende logo'}
              >
                {styleSettings.heroFloatingLogoVisible ? 'På' : 'Av'}
              </button>
            </div>
            
            <div className="w-px h-6 bg-white/20" />
            
            {/* Seksjon-topp stil */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-[9px] uppercase">Seksjon-topp:</span>
              <select
                value={styleSettings.sectionTopStyle || 'flat'}
                onChange={(e) => updateStyleSettings({ sectionTopStyle: e.target.value as any })}
                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-[10px]"
              >
                <option value="flat" className="bg-gray-900">Rett</option>
                <option value="rounded" className="bg-gray-900">Avrundet</option>
              </select>
            </div>
            
            <div className="w-px h-6 bg-white/20" />
            
            {/* Hero tekst-farger */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-[9px] uppercase">Linje 1:</span>
              <select
                value={styleSettings.heroLine1Color || 'white'}
                onChange={(e) => updateStyleSettings({ heroLine1Color: e.target.value as HeroTextColor })}
                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-[10px]"
              >
                <option value="white" className="bg-gray-900">Hvit</option>
                <option value="primary" className="bg-gray-900">Primær</option>
                <option value="secondary" className="bg-gray-900">Sekundær</option>
                <option value="support1" className="bg-gray-900">Støtte 1</option>
                <option value="support2" className="bg-gray-900">Støtte 2</option>
                <option value="support3" className="bg-gray-900">Støtte 3</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-[9px] uppercase">Linje 2:</span>
              <select
                value={styleSettings.heroLine2Color || 'secondary'}
                onChange={(e) => updateStyleSettings({ heroLine2Color: e.target.value as HeroTextColor })}
                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-[10px]"
              >
                <option value="white" className="bg-gray-900">Hvit</option>
                <option value="primary" className="bg-gray-900">Primær</option>
                <option value="secondary" className="bg-gray-900">Sekundær</option>
                <option value="support1" className="bg-gray-900">Støtte 1</option>
                <option value="support2" className="bg-gray-900">Støtte 2</option>
                <option value="support3" className="bg-gray-900">Støtte 3</option>
              </select>
            </div>
            
            <div className="w-px h-6 bg-white/20" />
            
            {/* Hero filter/overlay - kan velge alle 5 farger eller ingen */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-[9px] uppercase">Bildefilter:</span>
              <select
                value={styleSettings.heroOverlayColor || 'primary'}
                onChange={(e) => updateStyleSettings({ heroOverlayColor: e.target.value as ColorChoice | 'none' })}
                className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-[10px]"
              >
                <option value="primary" className="bg-gray-900">Primær</option>
                <option value="secondary" className="bg-gray-900">Sekundær</option>
                <option value="support1" className="bg-gray-900">Støtte 1</option>
                <option value="support2" className="bg-gray-900">Støtte 2</option>
                <option value="support3" className="bg-gray-900">Støtte 3</option>
                <option value="none" className="bg-gray-900">Ingen</option>
              </select>
            </div>
            
            <Slider 
              label="Styrke" 
              value={styleSettings.heroOverlayOpacity || 90} 
              min={0} 
              max={100} 
              onChange={(v) => updateStyleSettings({ heroOverlayOpacity: v })}
              suffix="%"
            />
          </div>
        )}

        {/* BAKGRUNN - Lys/mørk modus bakgrunner */}
        {activeTab === 'bakgrunn' && (
          <div className="flex items-center gap-3 flex-wrap">
            {/* Tekstfarge */}
            <div className="flex items-center gap-1 bg-white/5 rounded px-2 py-1">
              <span className="text-gray-500 text-[9px] uppercase mr-1">Tekst:</span>
              <ColorPicker 
                label="Lysmodus" 
                color={styleSettings.lightTextColor || '#111827'} 
                onChange={(c) => updateStyleSettings({ lightTextColor: c })} 
                presets={colorPresets} 
              />
              <ColorPicker 
                label="Mørkmodus" 
                color={styleSettings.darkTextColor || '#f9fafb'} 
                onChange={(c) => updateStyleSettings({ darkTextColor: c })} 
                presets={colorPresets} 
              />
            </div>
            
            <div className="w-px h-6 bg-white/20" />
            
            {/* Modus-toggle for bakgrunner */}
            <div className="flex items-center gap-1 bg-white/5 rounded px-1 py-0.5">
              <button 
                onClick={() => setEditMode('light')}
                className={`p-1 rounded transition-all ${editMode === 'light' ? 'bg-white/20 text-white' : 'text-white/50'}`}
                title="Rediger lysmodus"
              >
                {Icons.sun}
              </button>
              <button 
                onClick={() => setEditMode('dark')}
                className={`p-1 rounded transition-all ${editMode === 'dark' ? 'bg-indigo-600 text-white' : 'text-white/50'}`}
                title="Rediger mørkmodus"
              >
                {Icons.moon}
              </button>
            </div>
            
            {/* Bakgrunner - viser basert på editMode */}
            <div className="flex items-center gap-1 bg-white/5 rounded px-2 py-1">
              <span className="text-gray-500 text-[9px] uppercase mr-1">{editMode === 'light' ? 'Lysmodus' : 'Mørkmodus'}:</span>
              <ColorPicker 
                label="Seksjon" 
                color={editMode === 'light' ? styleSettings.lightSectionBackground : styleSettings.darkSectionBackground} 
                onChange={(c) => updateStyleSettings(editMode === 'light' ? { lightSectionBackground: c } : { darkSectionBackground: c })} 
                presets={colorPresets}
              />
              <ColorPicker 
                label="Nyheter" 
                color={editMode === 'light' ? styleSettings.lightNewsBackground : styleSettings.darkNewsBackground} 
                onChange={(c) => updateStyleSettings(editMode === 'light' ? { lightNewsBackground: c } : { darkNewsBackground: c })} 
                presets={colorPresets}
                borderOpacity={styleSettings.moduleBorderOpacity}
                onBorderOpacityChange={(v) => updateStyleSettings({ moduleBorderOpacity: v })}
              />
              <ColorPicker 
                label="Kort" 
                color={editMode === 'light' ? styleSettings.lightCardBackground : styleSettings.darkCardBackground} 
                onChange={(c) => updateStyleSettings(editMode === 'light' ? { lightCardBackground: c } : { darkCardBackground: c })} 
                presets={colorPresets}
                borderOpacity={styleSettings.cardBorderOpacity}
                onBorderOpacityChange={(v) => updateStyleSettings({ cardBorderOpacity: v })}
              />
              <ColorPicker 
                label="Modul" 
                color={editMode === 'light' ? styleSettings.lightModuleBackground : styleSettings.darkModuleBackground} 
                onChange={(c) => updateStyleSettings(editMode === 'light' ? { lightModuleBackground: c } : { darkModuleBackground: c })} 
                presets={colorPresets}
              />
            </div>
            
            <div className="w-px h-6 bg-white/20" />
            
            <ColorPicker 
              label="Modul-tittel" 
              color={styleSettings.moduleHeadingColor} 
              onChange={(c) => updateStyleSettings({ moduleHeadingColor: c })} 
              presets={colorPresets}
            />
          </div>
        )}

        {/* TEKST */}
        {activeTab === 'tekst' && (
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white/5 rounded px-2 py-1">
              <span className="text-gray-500 text-[9px] uppercase">Overskrift:</span>
              <select value={styleSettings.headingFont} onChange={(e) => updateStyleSettings({ headingFont: e.target.value as FontFamily })} className="bg-white/10 border border-white/20 rounded px-1 py-0.5 text-white text-[10px]">
                {FONT_OPTIONS.map((f) => <option key={f.id} value={f.id} className="bg-gray-900">{f.label}</option>)}
              </select>
              <WeightSlider value={styleSettings.headingWeight} onChange={(v) => updateStyleSettings({ headingWeight: v })} />
            </div>
            
            <div className="flex items-center gap-2 bg-white/5 rounded px-2 py-1">
              <span className="text-gray-500 text-[9px] uppercase">Brødtekst:</span>
              <select value={styleSettings.bodyFont} onChange={(e) => updateStyleSettings({ bodyFont: e.target.value as FontFamily })} className="bg-white/10 border border-white/20 rounded px-1 py-0.5 text-white text-[10px]">
                {FONT_OPTIONS.map((f) => <option key={f.id} value={f.id} className="bg-gray-900">{f.label}</option>)}
              </select>
              <WeightSlider value={styleSettings.bodyWeight} onChange={(v) => updateStyleSettings({ bodyWeight: v })} />
            </div>
            
            <div className="w-px h-6 bg-white/20" />
            
            <div className="flex items-center gap-2 bg-white/5 rounded px-2 py-1">
              <span className="text-gray-500 text-[9px] uppercase">Modul-tittel:</span>
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

        {/* IMPORT */}
        {activeTab === 'import' && (
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={scrapeUrl}
              onChange={(e) => setScrapeUrl(e.target.value)}
              placeholder="URL til klubbnettside..."
              className="bg-white/10 border border-white/20 rounded px-3 py-1.5 text-white text-xs w-64 placeholder:text-white/40"
              onKeyDown={(e) => e.key === 'Enter' && handleScrape()}
            />
            <button onClick={handleScrape} disabled={isLoadingContent || !scrapeUrl} className="bg-[var(--color-accent)] text-white px-3 py-1.5 rounded text-xs font-bold disabled:opacity-50">
              {isLoadingContent ? '...' : 'Hent'}
            </button>
            {(scrapeStatus || scrapeError) && (
              <span className={`text-[10px] ${scrapeError ? 'text-red-400' : 'text-green-400'}`}>{scrapeError || scrapeStatus}</span>
            )}
            <div className="ml-auto flex items-center gap-1 text-gray-400 text-[10px]">
              {Icons.folder}
              <code className="text-white/70">/clubs/{club.id}/</code>
            </div>
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
