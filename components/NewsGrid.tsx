
import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { NewsArticle } from '../config/clubContent';

// Fallback bilde for når bilder ikke laster
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800';

// Konverter NewsArticle til visningsformat
interface DisplayArticle {
  id: string;
  title: string;
  excerpt?: string;
  image: string;
  categories: string[];
}

function toDisplayArticle(article: NewsArticle): DisplayArticle {
  return {
    id: article.id,
    title: article.title,
    excerpt: article.excerpt,
    image: article.image,
    categories: [article.category],
  };
}

interface NewsCardProps {
  item: DisplayArticle;
  isLarge?: boolean;
  viewMode: 'mosaic' | 'grid' | 'list';
}

const NewsCard: React.FC<NewsCardProps> = ({ item, isLarge, viewMode }) => {
  if (viewMode === 'list') {
    return (
      <article className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group flex gap-4">
        <div className="relative w-32 h-24 flex-shrink-0 overflow-hidden">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
          />
        </div>
        <div className="py-3 pr-4 flex flex-col justify-center">
          <div className="flex gap-2 mb-1">
            {item.categories.slice(0, 1).map((cat, idx) => (
              <span 
                key={idx}
                className="text-[8px] px-2 py-0.5 rounded uppercase font-bold"
                style={{ 
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-text-on-accent)',
                }}
              >
                {cat}
              </span>
            ))}
          </div>
          <h3 
            className="font-bold text-sm leading-tight transition-colors line-clamp-2"
            style={{ color: 'var(--color-text)' }}
          >
            {item.title}
          </h3>
        </div>
      </article>
    );
  }

  return (
    <article 
      className={`bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group ${
        isLarge ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      <div className={`relative overflow-hidden ${isLarge ? 'aspect-[16/10]' : 'aspect-video'}`}>
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {item.categories.map((cat, idx) => (
            <span 
              key={idx} 
              className="text-[9px] px-2.5 py-1 rounded-md uppercase font-black"
              style={{ 
                backgroundColor: idx === 0 ? 'var(--color-accent)' : 'var(--color-primary)',
                color: idx === 0 ? 'var(--color-text-on-accent)' : 'var(--color-text-on-primary)',
              }}
            >
              {cat}
            </span>
          ))}
        </div>
        {item.categories.includes('Video') && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl scale-90 group-hover:scale-110 transition-transform"
              style={{ 
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-text-on-accent)',
              }}
            >
              <svg className="w-6 h-6 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        )}
      </div>
      <div className={`p-6 ${isLarge ? 'lg:p-10' : ''} flex flex-col items-start`}>
        <h3 
          className={`font-extrabold leading-tight transition-colors mb-3 ${isLarge ? 'text-2xl lg:text-3xl' : 'text-lg'}`}
          style={{ color: 'var(--color-text)' }}
        >
          <span className="group-hover:text-[var(--color-primary)] transition-colors">
            {item.title}
          </span>
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2">
          {item.excerpt || 'Les de siste oppdateringene om hva som skjer i klubben akkurat nå...'}
        </p>
      </div>
    </article>
  );
};

const NewsGrid: React.FC = () => {
  const { newsViewMode, scrapedContent, clubContent } = useTheme();
  
  // Bruk scraped artikler hvis tilgjengelig, ellers klubb-spesifikt innhold
  // Første artikkel i listen vises stor i mosaic-modus
  const articles: DisplayArticle[] = scrapedContent?.articles?.length 
    ? scrapedContent.articles.map(a => ({
        id: a.id,
        title: a.title,
        image: a.image,
        categories: [a.category],
      }))
    : clubContent.articles.map(article => ({
        ...toDisplayArticle(article),
        excerpt: article.excerpt,
      }));

  const getGridClass = () => {
    switch (newsViewMode) {
      case 'mosaic':
        return 'grid grid-cols-1 md:grid-cols-3 gap-6';
      case 'list':
        return 'flex flex-col gap-3';
      case 'grid':
      default:
        return 'grid grid-cols-1 md:grid-cols-2 gap-8';
    }
  };

  return (
    <div className="py-12 bg-white rounded-3xl px-4 lg:px-8 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div 
            className="w-1.5 h-8 rounded-full"
            style={{ backgroundColor: 'var(--color-primary)' }}
          />
          <h2 
            className="text-3xl font-black uppercase tracking-tight"
            style={{ color: 'var(--color-text)' }}
          >
            Siste nytt
          </h2>
        </div>
        <button 
          className="font-extrabold uppercase text-[10px] tracking-widest hover:translate-x-1 transition-transform flex items-center gap-2"
          style={{ color: 'var(--color-primary)' }}
        >
          Alle nyheter 
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className={getGridClass()}>
        {articles.map((item, index) => (
          <NewsCard 
            key={item.id} 
            item={item} 
            isLarge={newsViewMode === 'mosaic' && index === 0}
            viewMode={newsViewMode}
          />
        ))}
      </div>
      
      <div className="mt-16 flex justify-center">
        <button 
          className="px-10 py-4 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl"
          style={{ 
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-text-on-accent)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-primary)';
            e.currentTarget.style.color = 'var(--color-text-on-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-accent)';
            e.currentTarget.style.color = 'var(--color-text-on-accent)';
          }}
        >
          Last inn flere
        </button>
      </div>
    </div>
  );
};

export default NewsGrid;