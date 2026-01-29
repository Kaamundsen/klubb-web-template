/**
 * Content Scraper Utility
 * Henter innhold fra eksisterende klubbsider på msfotball.no-plattformen
 */

import { ScrapedContent } from '../context/ThemeContext';

// Utvidede CSS-selektorer for msfotball.no og lignende plattformer
const SELECTORS = {
  // Logo-selektorer
  logo: [
    '.site-logo img',
    '.logo-container img',
    '.header-logo img',
    '.navbar-brand img',
    '[class*="logo"] img',
    'header img',
    'nav img',
  ],
  
  // Hovednyhet/Hero - bred søk
  heroImage: [
    '.featured-news img',
    '.hero-article img',
    '.main-news img',
    '.highlight-news img',
    '.hero img',
    '.banner img',
    '.jumbotron img',
    '[class*="featured"] img',
    '[class*="hero"] img',
    '[class*="main-article"] img',
    '[class*="top-story"] img',
    'article:first-of-type img',
    '.news-item:first-child img',
  ],
  heroTitle: [
    '.featured-news h1',
    '.featured-news h2',
    '.featured-news .title',
    '.hero-article h1',
    '.main-news h1',
    '.hero h1',
    '.hero h2',
    '.banner h1',
    '[class*="featured"] h1',
    '[class*="featured"] h2',
    '[class*="featured"] .title',
    '[class*="hero"] h1',
    'article:first-of-type h1',
    'article:first-of-type h2',
    '.news-item:first-child h2',
    '.news-item:first-child h3',
  ],
  
  // Artikler/Nyheter - bred søk
  articleContainer: [
    '.news-grid .article',
    '.news-grid > div',
    '.article-card',
    '.news-item',
    '.news-list-item',
    '.post-item',
    '.entry',
    'article',
    '[class*="article-card"]',
    '[class*="news-card"]',
    '[class*="news-item"]',
    '[class*="post-card"]',
    '.card',
  ],
  articleImage: [
    'img',
    '.article-image img',
    '.thumbnail img',
    '.post-thumbnail img',
    '[class*="image"] img',
    '[class*="thumb"] img',
  ],
  articleTitle: [
    'h2',
    'h3',
    'h4',
    '.article-title',
    '.news-title',
    '.post-title',
    '.entry-title',
    '.card-title',
    '[class*="title"]',
    'a[href]', // Fallback til lenketekst
  ],
  articleCategory: [
    '.category',
    '.tag',
    '.badge',
    '.label',
    '[class*="category"]',
    '[class*="tag"]',
  ],
};

/**
 * Prøver flere selektorer og returnerer første treff
 */
function queryWithFallback(doc: Document, selectors: string[]): Element | null {
  for (const selector of selectors) {
    try {
      const element = doc.querySelector(selector);
      if (element) return element;
    } catch (e) {
      // Ugyldig selector, prøv neste
    }
  }
  return null;
}

/**
 * Prøver flere selektorer og returnerer alle treff
 */
function queryAllWithFallback(doc: Document, selectors: string[]): Element[] {
  for (const selector of selectors) {
    try {
      const elements = doc.querySelectorAll(selector);
      if (elements.length > 0) return Array.from(elements);
    } catch (e) {
      // Ugyldig selector, prøv neste
    }
  }
  return [];
}

/**
 * Konverterer relativ URL til absolutt
 */
function makeAbsoluteUrl(url: string | null | undefined, baseUrl: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  if (url.startsWith('//')) return 'https:' + url;
  if (url.startsWith('/')) return new URL(url, baseUrl).href;
  return new URL(url, baseUrl).href;
}

/**
 * Parser HTML og trekker ut strukturert innhold
 */
function parseHtml(html: string, baseUrl: string): ScrapedContent {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  console.log('Parsing HTML from:', baseUrl);
  
  // Hent logo
  const logoElement = queryWithFallback(doc, SELECTORS.logo) as HTMLImageElement | null;
  const logoUrl = logoElement ? makeAbsoluteUrl(logoElement.src || logoElement.getAttribute('data-src'), baseUrl) : undefined;
  console.log('Logo found:', logoUrl);
  
  // Hent hovednyhet - prøv flere metoder
  let heroImageElement = queryWithFallback(doc, SELECTORS.heroImage) as HTMLImageElement | null;
  let heroTitleElement = queryWithFallback(doc, SELECTORS.heroTitle);
  
  // Hvis ingen hero funnet, bruk første store bilde
  if (!heroImageElement) {
    const allImages = Array.from(doc.querySelectorAll('img'));
    heroImageElement = allImages.find(img => {
      const src = img.src || img.getAttribute('data-src') || '';
      return src && !src.includes('logo') && !src.includes('icon') && !src.includes('avatar');
    }) as HTMLImageElement | null;
  }
  
  // Hvis ingen hero tittel, bruk første h1 eller h2
  if (!heroTitleElement) {
    heroTitleElement = doc.querySelector('main h1, main h2, article h1, article h2, .content h1, .content h2');
  }
  
  const heroImage = heroImageElement ? makeAbsoluteUrl(
    heroImageElement.src || heroImageElement.getAttribute('data-src') || heroImageElement.getAttribute('data-lazy-src'),
    baseUrl
  ) : '';
  
  const heroNews = (heroImage || heroTitleElement) ? {
    image: heroImage,
    title: heroTitleElement?.textContent?.trim() || 'Hovednyhet',
  } : undefined;
  
  console.log('Hero found:', heroNews);
  
  // Hent artikler - prøv flere metoder
  let articleElements = queryAllWithFallback(doc, SELECTORS.articleContainer);
  
  // Hvis ingen artikler funnet med standard selektorer, prøv å finne alle elementer med bilder og titler
  if (articleElements.length === 0) {
    // Finn alle containere som har både bilde og tekst
    const potentialArticles = doc.querySelectorAll('div, article, li, section');
    articleElements = Array.from(potentialArticles).filter(el => {
      const hasImage = el.querySelector('img');
      const hasTitle = el.querySelector('h2, h3, h4, a');
      const isSmallEnough = el.querySelectorAll('img').length < 5; // Ikke for store containere
      return hasImage && hasTitle && isSmallEnough;
    }).slice(0, 10);
  }
  
  // Filtrer ut duplikater og for store/små elementer
  const seenTitles = new Set<string>();
  const articles = articleElements
    .slice(0, 12)
    .map((article, index) => {
      const imgElement = article.querySelector('img') as HTMLImageElement | null;
      
      // Prøv flere selektorer for tittel
      let titleText = '';
      for (const selector of SELECTORS.articleTitle) {
        const el = article.querySelector(selector);
        if (el && el.textContent?.trim()) {
          titleText = el.textContent.trim();
          break;
        }
      }
      
      // Prøv kategori
      let categoryText = 'Nyheter';
      for (const selector of SELECTORS.articleCategory) {
        const el = article.querySelector(selector);
        if (el && el.textContent?.trim()) {
          categoryText = el.textContent.trim();
          break;
        }
      }
      
      const imageUrl = imgElement ? makeAbsoluteUrl(
        imgElement.src || imgElement.getAttribute('data-src') || imgElement.getAttribute('data-lazy-src'),
        baseUrl
      ) : '';
      
      return {
        id: `scraped-${index}`,
        image: imageUrl,
        title: titleText || `Artikkel ${index + 1}`,
        category: categoryText,
      };
    })
    .filter(article => {
      // Filtrer ut artikler uten tittel eller med duplikat tittel
      if (!article.title || article.title.length < 3) return false;
      if (seenTitles.has(article.title)) return false;
      seenTitles.add(article.title);
      return true;
    })
    .slice(0, 6);
  
  console.log('Articles found:', articles.length);
  
  return {
    logo: logoUrl ? { horizontal: logoUrl, vertical: logoUrl } : undefined,
    heroNews,
    articles: articles.length > 0 ? articles : undefined,
  };
}

/**
 * Hovedfunksjon for å scrape innhold fra en klubbside
 * Bruker Vite proxy for å omgå CORS
 */
export async function scrapeClubContent(domain: string): Promise<ScrapedContent> {
  // Normaliser domenet
  const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const fullUrl = `https://${cleanDomain}`;
  
  try {
    // I dev-miljø, bruk proxy
    if (import.meta.env.DEV) {
      // For enkel implementering, hent via allorigins.win (CORS proxy)
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(fullUrl)}`;
      
      const response = await fetch(proxyUrl, {
        headers: {
          'Accept': 'text/html,application/xhtml+xml',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const html = await response.text();
      return parseHtml(html, fullUrl);
    }
    
    // I produksjon kan vi bruke server-side scraping
    throw new Error('Scraping i produksjon krever serverside-implementering');
    
  } catch (error) {
    console.error('Scraping feilet:', error);
    
    // Returner tom struktur ved feil
    return {
      logo: undefined,
      heroNews: undefined,
      articles: undefined,
    };
  }
}

/**
 * Test-funksjon for å validere scraping
 */
export async function testScraper(domain: string): Promise<void> {
  console.log(`Testing scraper for: ${domain}`);
  
  try {
    const content = await scrapeClubContent(domain);
    console.log('Scraped content:', content);
    
    if (content.logo) {
      console.log('✓ Logo funnet:', content.logo.horizontal);
    }
    if (content.heroNews) {
      console.log('✓ Hovednyhet funnet:', content.heroNews.title);
    }
    if (content.articles?.length) {
      console.log(`✓ ${content.articles.length} artikler funnet`);
    }
  } catch (error) {
    console.error('✗ Scraping feilet:', error);
  }
}

export default scrapeClubContent;
