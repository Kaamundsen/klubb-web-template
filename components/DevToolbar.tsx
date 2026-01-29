import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { scrapeClubContent } from '../utils/contentScraper';

/**
 * DevToolbar - Utviklingsverktøy for testing av design
 * Kun synlig i development mode (npm run dev)
 */
const DevToolbar: React.FC = () => {
  const {
    club,
    setClub,
    availableClubs,
    template,
    setTemplate,
    newsViewMode,
    setNewsViewMode,
    isDarkMode,
    toggleDarkMode,
    setScrapedContent,
    setIsLoadingContent,
    isLoadingContent,
    swapColors,
    isColorsSwapped,
  } = useTheme();

  const [scrapeUrl, setScrapeUrl] = useState('');
  const [isExpanded, setIsExpanded] = useState(false); // Start minimert
  const [scrapeError, setScrapeError] = useState<string | null>(null);
  const [scrapeStatus, setScrapeStatus] = useState<string | null>(null);

  const handleScrape = async () => {
    if (!scrapeUrl) return;
    
    setIsLoadingContent(true);
    setScrapeError(null);
    setScrapeStatus('Henter innhold...');
    
    try {
      console.log('Scraping:', scrapeUrl);
      const content = await scrapeClubContent(scrapeUrl);
      
      if (!content.heroNews && !content.articles?.length) {
        setScrapeError('Fant ikke innhold med standard selektorer');
        setScrapeStatus(null);
      } else {
        setScrapedContent(content);
        const articleCount = content.articles?.length || 0;
        setScrapeStatus(`Hentet: ${content.heroNews ? '1 hovednyhet, ' : ''}${articleCount} artikler`);
        console.log('Scraped content:', content);
      }
    } catch (error) {
      console.error('Scraping feilet:', error);
      setScrapeError(error instanceof Error ? error.message : 'Ukjent feil');
      setScrapeStatus(null);
    } finally {
      setIsLoadingContent(false);
    }
  };
  
  const handleClearScraped = () => {
    setScrapedContent(null);
    setScrapeUrl('');
    setScrapeError(null);
    setScrapeStatus(null);
  };

  // Minimert: bare et lite ikon i hjørnet
  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="fixed top-3 right-3 z-[9999] w-8 h-8 bg-black/80 text-white rounded-full text-xs font-bold hover:bg-black hover:scale-110 transition-all flex items-center justify-center shadow-lg"
        title="Åpne dev-verktøy"
      >
        ⚙
      </button>
    );
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-gray-900 to-gray-800 border-b-2 border-[var(--color-accent)] shadow-xl">
      <div className="flex items-center gap-3 px-4 py-2 text-xs">
        {/* Klubb-velger */}
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-[10px] uppercase tracking-wider">Klubb:</span>
          <select
            value={club.id}
            onChange={(e) => setClub(e.target.value)}
            className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-xs"
          >
            {availableClubs.map((c) => (
              <option key={c.id} value={c.id} className="bg-gray-900">
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Farger med bytt-knapp */}
        <div className="flex items-center gap-2 border-l border-white/20 pl-3">
          <div
            className="w-5 h-5 rounded border-2 border-white/50"
            style={{ backgroundColor: club.colors.primary }}
            title={`Primary: ${club.colors.primary}`}
          />
          <button
            onClick={swapColors}
            className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
              isColorsSwapped 
                ? 'bg-yellow-500 text-black' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
            title="Bytt primary og accent farger"
          >
            ⇄
          </button>
          <div
            className="w-5 h-5 rounded border-2 border-white/50"
            style={{ backgroundColor: club.colors.accent }}
            title={`Accent: ${club.colors.accent}`}
          />
        </div>

        {/* Nyhetsvisning */}
        <div className="flex items-center gap-2 border-l border-white/20 pl-3">
          <span className="text-gray-400 text-[10px] uppercase tracking-wider">Visning:</span>
          <select
            value={newsViewMode}
            onChange={(e) => setNewsViewMode(e.target.value as 'mosaic' | 'grid' | 'list')}
            className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-xs"
          >
            <option value="mosaic" className="bg-gray-900">Mosaic</option>
            <option value="grid" className="bg-gray-900">Grid</option>
            <option value="list" className="bg-gray-900">Liste</option>
          </select>
        </div>

        {/* Dark/Light */}
        <button
          onClick={toggleDarkMode}
          className="border-l border-white/20 pl-3 text-white/70 hover:text-white"
          title={isDarkMode ? 'Bytt til lyst tema' : 'Bytt til mørkt tema'}
        >
          {isDarkMode ? '🌙' : '☀️'}
        </button>

        {/* URL Scraper */}
        <div className="flex items-center gap-2 border-l border-white/20 pl-3 ml-auto">
          <input
            type="text"
            value={scrapeUrl}
            onChange={(e) => setScrapeUrl(e.target.value)}
            placeholder="Hent fra URL..."
            className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-xs w-36 placeholder:text-white/40"
            onKeyDown={(e) => e.key === 'Enter' && handleScrape()}
          />
          <button
            onClick={handleScrape}
            disabled={isLoadingContent || !scrapeUrl}
            className="bg-[var(--color-accent)] text-white px-2 py-1 rounded text-xs font-bold disabled:opacity-50 hover:opacity-90"
          >
            {isLoadingContent ? '...' : 'Hent'}
          </button>
          {(scrapeStatus || scrapeError) && (
            <span className={`text-[10px] max-w-[150px] truncate ${scrapeError ? 'text-red-400' : 'text-green-400'}`}>
              {scrapeError || scrapeStatus}
            </span>
          )}
        </div>

        {/* Lukk */}
        <button
          onClick={() => setIsExpanded(false)}
          className="text-white/50 hover:text-white text-lg leading-none"
          title="Lukk"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default DevToolbar;
