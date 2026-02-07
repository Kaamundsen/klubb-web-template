
import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { NewsArticle } from '../config/clubContent';
import { NewsLayout } from '../context/ThemeContext';

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
  isMedium?: boolean;
  layout: NewsLayout;
}

const NewsCard: React.FC<NewsCardProps> = ({ item, isLarge, isMedium, layout }) => {
  // Liste-visning (bilde til venstre, tekst til høyre)
  if (layout === 'list') {
    return (
      <article 
        className="overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex gap-6"
        style={{ 
          borderRadius: 'var(--radius-card)',
          backgroundColor: 'var(--card-background)',
          border: '1px solid var(--card-border)',
        }}
      >
        <div className="relative w-48 md:w-64 h-32 md:h-40 flex-shrink-0 overflow-hidden">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
          />
          <div className="absolute top-3 left-3">
            <span 
              className="text-[10px] px-3 rounded uppercase font-bold inline-flex items-center"
              style={{ 
                backgroundColor: 'var(--color-secondary)',
                color: '#ffffff',
                height: '24px',
              }}
            >
              {item.categories[0]}
            </span>
          </div>
        </div>
        <div className="py-4 pr-6 flex flex-col justify-center flex-1">
          <h3 
            className="font-bold text-lg leading-tight transition-colors mb-2 group-hover:text-[var(--color-primary)]"
            style={{ color: 'var(--color-text)' }}
          >
            {item.title}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2">
            {item.excerpt || 'Les de siste oppdateringene om hva som skjer i klubben akkurat nå...'}
          </p>
        </div>
      </article>
    );
  }

  // Standard kort-visning
  const sizeClass = isLarge 
    ? 'md:col-span-2 md:row-span-2' 
    : isMedium 
      ? 'md:col-span-1' 
      : '';

  return (
    <article 
      className={`overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group ${sizeClass}`}
      style={{ 
        borderRadius: 'var(--radius-card)',
        backgroundColor: 'var(--card-background)',
        border: '1px solid var(--card-border)',
      }}
    >
      <div className={`relative overflow-hidden ${isLarge ? 'aspect-[16/10]' : 'aspect-video'}`}>
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {item.categories.map((cat, idx) => (
            <span 
              key={idx} 
              className="text-[10px] px-3 rounded uppercase font-black inline-flex items-center"
              style={{ 
                backgroundColor: idx === 0 ? 'var(--color-secondary)' : 'var(--color-primary)',
                color: '#ffffff',
                height: '24px',
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
                backgroundColor: 'var(--color-secondary)',
                color: '#ffffff',
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
  const { scrapedContent, clubContent, newsLayout, styleSettings } = useTheme();
  
  // Bruk scraped artikler hvis tilgjengelig, ellers klubb-spesifikt innhold
  // Alltid 6 nyheter som standard
  const articles: DisplayArticle[] = scrapedContent?.articles?.length 
    ? scrapedContent.articles.slice(0, 6).map(a => ({
        id: a.id,
        title: a.title,
        image: a.image,
        categories: [a.category],
      }))
    : clubContent.articles.slice(0, 6).map(article => ({
        ...toDisplayArticle(article),
        excerpt: article.excerpt,
      }));

  // Grid klasser basert på layout
  const getGridClass = () => {
    switch (newsLayout) {
      case 'mosaic':
        return 'grid grid-cols-1 md:grid-cols-3 gap-6';
      case 'featured':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6';
      case 'twoCol':
        return 'grid grid-cols-1 md:grid-cols-2 gap-6';
      case 'threeCol':
        return 'grid grid-cols-1 md:grid-cols-3 gap-6';
      case 'list':
        return 'flex flex-col gap-4';
      default:
        return 'grid grid-cols-1 md:grid-cols-3 gap-6';
    }
  };

  // Bestem størrelse på kort basert på layout og index
  const getCardSize = (index: number) => {
    switch (newsLayout) {
      case 'mosaic':
        return { isLarge: index === 0, isMedium: false };
      case 'featured':
        return { isLarge: false, isMedium: index < 2 };
      default:
        return { isLarge: false, isMedium: false };
    }
  };

  // Spesiell grid for 'featured' layout (2 + 4)
  const renderArticles = () => {
    if (newsLayout === 'featured') {
      return (
        <>
          {/* Topp rad: 2 store */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {articles.slice(0, 2).map((item) => (
              <NewsCard 
                key={item.id} 
                item={item} 
                isLarge={false}
                isMedium={true}
                layout={newsLayout}
              />
            ))}
          </div>
          {/* Bunn rad: 4 små */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.slice(2, 6).map((item) => (
              <NewsCard 
                key={item.id} 
                item={item} 
                isLarge={false}
                isMedium={false}
                layout={newsLayout}
              />
            ))}
          </div>
        </>
      );
    }

    return (
      <div className={getGridClass()}>
        {articles.map((item, index) => {
          const { isLarge, isMedium } = getCardSize(index);
          return (
            <NewsCard 
              key={item.id} 
              item={item} 
              isLarge={isLarge}
              isMedium={isMedium}
              layout={newsLayout}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div 
      className="py-12 px-4 lg:px-8 shadow-sm"
      style={{ 
        borderRadius: `var(--radius-module)`,
        backgroundColor: 'var(--news-background)',
        border: '1px solid var(--module-border)',
      }}
    >
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div 
            className="w-1.5 h-8 rounded-full"
            style={{ backgroundColor: `var(--color-${styleSettings.newsBarColor})` }}
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
      
      {renderArticles()}
      
      <div className="mt-16 flex justify-center">
        <button 
          className="px-10 py-4 font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl hover:scale-105"
          style={{ 
            background: `linear-gradient(135deg, var(--color-${styleSettings.ctaButtonColor}) 0%, ${styleSettings.ctaGradientColor} 100%)`,
            boxShadow: `0 10px 40px -10px var(--color-${styleSettings.ctaButtonColor})`,
            color: '#ffffff',
            borderRadius: 'var(--radius-button)',
          }}
        >
          Last inn flere
        </button>
      </div>
    </div>
  );
};

export default NewsGrid;