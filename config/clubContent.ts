// Klubb-spesifikt innhold for hver klubb
// Hver klubb har sine egne nyheter, moduler og meny

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  category: string;
  date?: string;
  author?: string;
}

export interface ClubContent {
  heroNews: NewsArticle;
  articles: NewsArticle[];
  menuItems?: string[];
}

// ============================================
// MS FOTBALL - Manglerud Star
// ============================================
export const MSFOTBALL_CONTENT: ClubContent = {
  // Hero-seksjonen bruker mal-designet, ikke nyhetsinnhold
  heroNews: {
    id: 'ms-hero',
    title: 'Din klubb, din stolthet',
    excerpt: 'Velkommen til Manglerud Star Fotball - en klubb for alle!',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=85&w=2400',
    category: 'Velkommen',
  },
  // Artikler under "Siste nytt" - første artikkel vises stor i mosaic-modus
  articles: [
    {
      id: 'ms-1',
      title: 'Her er årets fotballcamper på Manglerud',
      excerpt: 'Manglerud Star inviterer til spennende og lærerike fotballcamper i påskeferien, sommerferien og høstferien – for alle barn og unge!',
      image: '/assets/msfotball-camp.png',
      category: 'Nyheter',
      date: '2026-01-29',
    },
    {
      id: 'ms-2',
      title: 'Treningstider vår 2026',
      excerpt: 'Se oppdaterte treningstider for alle lag denne våren.',
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800',
      category: 'Klubbinfo',
    },
    {
      id: 'ms-3',
      title: 'Påmelding til Norway Cup åpen',
      excerpt: 'Meld på laget ditt til årets Norway Cup før fristen går ut.',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
      category: 'Turneringer',
    },
    {
      id: 'ms-4',
      title: 'Årsmøte 2026',
      excerpt: 'Velkommen til årsmøte i Manglerud Star Fotball.',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800',
      category: 'Klubbinfo',
    },
    {
      id: 'ms-5',
      title: 'Nye drakter til alle lag',
      excerpt: 'Vi lanserer nye drakter i samarbeid med vår hovedsponsor.',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
      category: 'Utstyr',
    },
    {
      id: 'ms-6',
      title: 'Dommerkurs starter snart',
      excerpt: 'Bli dommer og bidra til klubben. Kurs for ungdom over 14 år.',
      image: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=800',
      category: 'Kurs',
    },
  ],
};

// ============================================
// MASTER / KLUBBNETTSIDE.NO
// ============================================
export const MASTER_CONTENT: ClubContent = {
  heroNews: {
    id: 'master-1',
    title: 'Velkommen til din nye klubbnettside',
    excerpt: 'Opplev fremtidens digitale løsning for idrettslag. Vi gir dere verktøyene som trengs for å skape engasjement.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=85&w=2400',
    category: 'Nyheter',
  },
  articles: [
    {
      id: 'master-2',
      title: 'Moderne design for alle klubber',
      excerpt: 'Se hvordan vår nye designmal tilpasser seg klubbens identitet.',
      image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800',
      category: 'Design',
    },
    {
      id: 'master-3',
      title: 'Enkel administrasjon',
      excerpt: 'Administrer alt fra én plattform - medlemmer, nyheter og arrangementer.',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800',
      category: 'Funksjonalitet',
    },
    {
      id: 'master-4',
      title: 'Integrert betalingsløsning',
      excerpt: 'Håndter medlemskontingent og påmeldinger direkte i systemet.',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
      category: 'Betaling',
    },
    {
      id: 'master-5',
      title: 'Responsivt design',
      excerpt: 'Nettsiden ser perfekt ut på alle enheter - mobil, nettbrett og PC.',
      image: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=800',
      category: 'Design',
    },
    {
      id: 'master-6',
      title: 'Support når du trenger det',
      excerpt: 'Vårt supportteam står klare til å hjelpe deg med alle spørsmål.',
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800',
      category: 'Support',
    },
  ],
};

// ============================================
// DFI
// ============================================
export const DFI_CONTENT: ClubContent = {
  heroNews: {
    id: 'dfi-1',
    title: 'Sesongstart 2026 nærmer seg',
    excerpt: 'DFI er klare for en ny spennende sesong. Se alle kampoppsett og treningstider.',
    image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1600',
    category: 'Nyheter',
  },
  articles: [
    {
      id: 'dfi-2',
      title: 'Nye spillere til A-laget',
      excerpt: 'Vi ønsker velkommen tre nye signeringer til årets sesong.',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
      category: 'A-laget',
    },
    {
      id: 'dfi-3',
      title: 'Dugnad på stadion',
      excerpt: 'Hjelp oss med å gjøre stadion klar for sesongstart.',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800',
      category: 'Dugnad',
    },
    {
      id: 'dfi-4',
      title: 'Sommerleir for barn',
      excerpt: 'Påmelding til sommerens fotballskole er nå åpen.',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800',
      category: 'Barn & Ungdom',
    },
    {
      id: 'dfi-5',
      title: 'Sponsorkveld i klubbhuset',
      excerpt: 'Velkommen til sponsorkveld med middag og underholdning.',
      image: 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=800',
      category: 'Sponsor',
    },
    {
      id: 'dfi-6',
      title: 'Ungdomslaget til NM',
      excerpt: 'G17 kvalifisert til NM-sluttspillet etter sterk høstsesong.',
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800',
      category: 'Ungdom',
    },
  ],
};

// ============================================
// Hent innhold basert på klubb-ID
// ============================================
export function getClubContent(clubId: string): ClubContent {
  switch (clubId) {
    case 'msfotball':
      return MSFOTBALL_CONTENT;
    case 'dfi':
      return DFI_CONTENT;
    case 'master':
    default:
      return MASTER_CONTENT;
  }
}
