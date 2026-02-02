
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import { useTheme } from '../hooks/useTheme';

// Klubb-spesifikk logo komponent
const ClubLogo: React.FC<{ club: any; dark?: boolean }> = ({ club, dark }) => {
  const [logoError, setLogoError] = React.useState(false);
  
  // Hvis klubben har definert logo og den ikke har feilet, bruk den
  if (club.logos?.horizontal && !logoError) {
    return (
      <img 
        src={club.logos.horizontal} 
        alt={club.name}
        className="h-12 w-auto"
        onError={() => setLogoError(true)}
      />
    );
  }
  
  // Fallback til standard Klubbnettside-logo
  return <Logo dark={dark} />;
};

// Standard Klubbnettside logo
const Logo = ({ dark }: { dark?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="349" height="94" viewBox="0 0 349 94" className="h-[54px] w-auto">
    <g id="Klubbnettside-Logo_Hvit_v2" transform="translate(-697 -269)">
      <g id="Group_55" data-name="Group 55" transform="translate(-3652.274 -5213.86)">
        <g id="Group_1" data-name="Group 1" transform="translate(4438.274 5509.86)">
          <path d="M219.308,141.539h.775a1.76,1.76,0,0,0,1.549-.675l4.7-6.827a2.043,2.043,0,0,1,.883-.761,3.229,3.229,0,0,1,1.213-.2h4.217l-6.2,8.447a4.094,4.094,0,0,1-.69.76,4.239,4.239,0,0,1-.732.5,3.749,3.749,0,0,1,1,.553,3.7,3.7,0,0,1,.825.94l6.311,9.7h-4.332a3.81,3.81,0,0,1-.71-.057,1.781,1.781,0,0,1-.51-.173,1.41,1.41,0,0,1-.372-.279,2.82,2.82,0,0,1-.3-.381l-4.733-7.271a1.419,1.419,0,0,0-.653-.567,2.82,2.82,0,0,0-1.068-.165h-1.176v8.893h-4.85v-20.9h4.85Z" transform="translate(-214.458 -132.846)" fill={dark ? "#fff" : "#092c5c"}/>
          <path d="M234.138,150.1h7.745v3.873H229.29v-20.9h4.848Z" transform="translate(-205.937 -132.846)" fill={dark ? "#fff" : "#092c5c"}/>
          <path d="M249.364,150.145a4.446,4.446,0,0,0,1.743-.323,3.541,3.541,0,0,0,1.3-.926,4.092,4.092,0,0,0,.811-1.471,6.437,6.437,0,0,0,.279-1.971V133.076h4.85v12.379a9.678,9.678,0,0,1-.625,3.529,7.912,7.912,0,0,1-1.786,2.768,8.049,8.049,0,0,1-2.826,1.808,11.219,11.219,0,0,1-7.5,0,8.048,8.048,0,0,1-2.826-1.808A7.853,7.853,0,0,1,241,148.983a9.776,9.776,0,0,1-.616-3.529V133.076h4.848v12.365a6.387,6.387,0,0,0,.28,1.971,4.177,4.177,0,0,0,.809,1.479,3.509,3.509,0,0,0,1.3.932A4.456,4.456,0,0,0,249.364,150.145Z" transform="translate(-199.562 -132.846)" fill={dark ? "#fff" : "#092c5c"}/>
          <path d="M255.618,153.975v-20.9H263.3a14.637,14.637,0,0,1,3.688.4,7.04,7.04,0,0,1,2.482,1.132,4.3,4.3,0,0,1,1.4,1.779,6.023,6.023,0,0,1,.438,2.338,4.578,4.578,0,0,1-.2,1.356,4,4,0,0,1-.631,1.227,4.677,4.677,0,0,1-1.105,1.039,7.072,7.072,0,0,1-1.62.811,5.769,5.769,0,0,1,3.055,1.628,4.22,4.22,0,0,1,.99,2.891,5.968,5.968,0,0,1-.516,2.481,5.687,5.687,0,0,1-1.515,2,7.175,7.175,0,0,1-2.459,1.334,10.668,10.668,0,0,1-3.341.48Zm4.848-12.107h2.524a8.246,8.246,0,0,0,1.449-.115,2.973,2.973,0,0,0,1.1-.4,1.834,1.834,0,0,0,.688-.789,2.931,2.931,0,0,0,.238-1.263,3.538,3.538,0,0,0-.188-1.239,1.757,1.757,0,0,0-.573-.8,2.407,2.407,0,0,0-.983-.431,6.817,6.817,0,0,0-1.414-.129h-2.839Zm0,3.242v5.207h3.414a4.264,4.264,0,0,0,1.571-.244,2.464,2.464,0,0,0,.953-.631,2.118,2.118,0,0,0,.474-.874,3.834,3.834,0,0,0,.129-.99,3.3,3.3,0,0,0-.151-1.033,1.7,1.7,0,0,0-.517-.775,2.5,2.5,0,0,0-.968-.486,5.559,5.559,0,0,0-1.519-.173Z" transform="translate(-190.81 -132.846)" fill={dark ? "#fff" : "#092c5c"}/>
          <path d="M269.392,153.975v-20.9h7.688a14.615,14.615,0,0,1,3.686.4,7.027,7.027,0,0,1,2.481,1.132,4.3,4.3,0,0,1,1.4,1.779,6.025,6.025,0,0,1,.436,2.338,4.578,4.578,0,0,1-.2,1.356,4.006,4.006,0,0,1-.631,1.227,4.68,4.68,0,0,1-1.105,1.039,7.071,7.071,0,0,1-1.62.811,5.768,5.768,0,0,1,3.056,1.628,4.227,4.227,0,0,1,.989,2.891,5.965,5.965,0,0,1-.517,2.481,5.68,5.68,0,0,1-1.513,2,7.2,7.2,0,0,1-2.46,1.334,10.677,10.677,0,0,1-3.343.48Zm4.848-12.107h2.526a8.248,8.248,0,0,0,1.449-.115,2.993,2.993,0,0,0,1.1-.4,1.835,1.835,0,0,0,.688-.789,2.958,2.958,0,0,0,.236-1.263,3.543,3.543,0,0,0-.186-1.239,1.773,1.773,0,0,0-.575-.8,2.407,2.407,0,0,0-.982-.431,6.814,6.814,0,0,0-1.412-.129h-2.84Zm0,3.242v5.207h3.415a4.255,4.255,0,0,0,1.57-.244,2.485,2.485,0,0,0,.954-.631,2.1,2.1,0,0,0,.472-.874,3.836,3.836,0,0,0,.129-.99,3.3,3.3,0,0,0-.15-1.033,1.717,1.717,0,0,0-.517-.775,2.5,2.5,0,0,0-.968-.486,5.571,5.571,0,0,0-1.521-.173Z" transform="translate(-182.897 -132.846)" fill={dark ? "#fff" : "#092c5c"}/>
          <path d="M286.251,133.1a1.373,1.373,0,0,1,.387.107,1.335,1.335,0,0,1,.329.224,3.648,3.648,0,0,1,.359.386l9.926,12.552c-.038-.4-.068-.792-.085-1.17s-.03-.732-.03-1.068V133.076h4.275v20.9h-2.525a2.326,2.326,0,0,1-.946-.172,2.034,2.034,0,0,1-.745-.631L287.34,140.72c.028.364.052.721.073,1.069s.028.677.028.982v11.2h-4.275v-20.9h2.554A4.171,4.171,0,0,1,286.251,133.1Z" transform="translate(-174.983 -132.846)" fill={dark ? "#fff" : "#092c5c"}/>
          <path d="M312.219,133.076V136.8h-8.581v4.878h6.572v3.585h-6.572v4.977h8.581v3.73H298.763v-20.9Z" transform="translate(-166.023 -132.846)" fill={dark ? "#fff" : "#092c5c"}/>
          <path d="M326.578,133.076v3.843H320.7v17.055h-4.848V136.919h-5.879v-3.843Z" transform="translate(-159.585 -132.846)" fill={dark ? "#fff" : "#092c5c"}/>
          <path d="M339.314,133.076v3.843h-5.881v17.055h-4.85V136.919H322.7v-3.843Z" transform="translate(-152.268 -132.846)" fill={dark ? "#fff" : "#092c5c"}/>
          <path d="M348.551,137.4a1.817,1.817,0,0,1-.45.516,1.017,1.017,0,0,1-.611.172,1.493,1.493,0,0,1-.71-.206l-.86-.468a7.225,7.225,0,0,0-1.1-.466,4.4,4.4,0,0,0-1.406-.208,3.023,3.023,0,0,0-2.03.581,1.976,1.976,0,0,0-.668,1.571,1.45,1.45,0,0,0,.4,1.047,3.46,3.46,0,0,0-1.055.716,11.133,11.133,0,0,0,1.493.553q.838.25,1.713.559a15.518,15.518,0,0,1,1.715.724,5.758,5.758,0,0,1,1.493,1.063,4.916,4.916,0,0,1,1.052,1.57,5.588,5.588,0,0,1,.4,2.231,7.248,7.248,0,0,1-.5,2.71,6.353,6.353,0,0,1-1.456,2.2,6.734,6.734,0,0,1-2.352,1.477,8.793,8.793,0,0,1-3.177.538,10.162,10.162,0,0,1-1.985-.2,11.559,11.559,0,0,1-1.957-.567,11.14,11.14,0,0,1-1.779-.866,7.553,7.553,0,0,1-1.449-1.12l1.433-2.267a1.172,1.172,0,0,1,.446-.416,1.271,1.271,0,0,1,.617-.157,1.645,1.645,0,0,1,.868.272q.437.272.989.6a8.077,8.077,0,0,0,1.269.6,4.74,4.74,0,0,0,1.693.272,3.233,3.233,0,0,0,2.052-.579,2.215,2.215,0,0,0,.732-1.844,1.74,1.74,0,0,0-.4-1.19,3.084,3.084,0,0,0-1.055-.761,9.638,9.638,0,0,0-1.483-.531q-.834-.229-1.707-.51a12.378,12.378,0,0,1-1.708-.688,5.42,5.42,0,0,1-1.485-1.075,5.055,5.055,0,0,1-1.055-1.664,6.61,6.61,0,0,1-.4-2.459,5.846,5.846,0,0,1,.472-2.3,5.921,5.921,0,0,1,1.392-1.993,6.81,6.81,0,0,1,2.252-1.4,8.309,8.309,0,0,1,3.055-.524,11.621,11.621,0,0,1,1.874.15,9.953,9.953,0,0,1,1.727.446,9.678,9.678,0,0,1,1.527.7,7.223,7.223,0,0,1,1.271.926Z" transform="translate(-144.982 -132.93)" fill={dark ? "#fff" : "#092c5c"}/>
          <path d="M353.2,153.975H348.32v-20.9H353.2Z" transform="translate(-137.551 -132.846)" fill={dark ? "#fff" : "#092c5c"}/>
          <path d="M374.663,143.518a10.952,10.952,0,0,1-.781,4.18,9.826,9.826,0,0,1-2.2,3.314,10.045,10.045,0,0,1-3.421,2.181,12.11,12.11,0,0,1-4.44.781H355.7v-20.9h8.12a12.013,12.013,0,0,1,4.44.789,10.186,10.186,0,0,1,3.421,2.179,9.738,9.738,0,0,1,2.2,3.308A10.909,10.909,0,0,1,374.663,143.518Zm-4.963,0a9.115,9.115,0,0,0-.4-2.8,5.964,5.964,0,0,0-1.154-2.115,5.018,5.018,0,0,0-1.844-1.335,6.266,6.266,0,0,0-2.482-.466h-3.242v13.44h3.242a6.266,6.266,0,0,0,2.482-.465,5.018,5.018,0,0,0,1.844-1.335,5.964,5.964,0,0,0,1.154-2.115A9.165,9.165,0,0,0,369.7,143.518Z" transform="translate(-133.311 -132.846)" fill={dark ? "#fff" : "#092c5c"}/>
          <path d="M384.5,133.076V136.8h-8.578v4.878h6.571v3.585h-6.571v4.977H384.5v3.73H371.041v-20.9Z" transform="translate(-124.497 -132.846)" fill={dark ? "#fff" : "#092c5c"}/>
        </g>
        <g id="Group_60" transform="translate(0 -1.245)">
          <rect width="98" height="8" transform="translate(4600.274 5543.105)" fill="#e5003c"/>
          <rect width="98" height="8" transform="translate(4438.274 5543.105)" fill="#e5003c"/>
          <rect width="17" height="8" transform="translate(4536.274 5543.105)" fill="#fff"/>
          <rect width="17" height="8" transform="translate(4583.274 5543.105)" fill="#fff"/>
          <rect width="30" height="8" transform="translate(4553.274 5543.105)" fill="#092c5c"/>
        </g>
      </g>
      <g id="Group_66" transform="translate(-0.07 2.112)">
        <path d="M310.569,49.478c.01.121.018.243.018.366a4.117,4.117,0,1,1-6.627-3.259v0l-3.936-2.366-3.935,2.366v0a4.115,4.115,0,1,1-6.626,3.259c0-.123.007-.245.018-.366L285.6,53.361l4.2,4.2h20.461l4.2-4.2Z" transform="translate(429.046 222.672)" fill={dark ? "#fff" : "#092c5c"}/>
        <path d="M321.027,58.089H285.362L271.194,72.217V97.329s.135,23.633,32,37.835h0c31.864-14.2,32-37.835,32-37.835V72.217Zm10.382,39.22c0,.208-.444,20.6-28.215,33.7-27.771-13.1-28.215-33.494-28.216-33.7V73.78L286.93,61.864h32.53L331.41,73.78Z" transform="translate(425.876 225.724)" fill={dark ? "#fff" : "#092c5c"}/>
        <g id="Group_65" transform="translate(717.057 301.46)">
          <path d="M295.006,85.624h1.188a2.7,2.7,0,0,0,2.374-1.033l7.211-10.466a3.1,3.1,0,0,1,1.352-1.164,4.946,4.946,0,0,1,1.858-.309h6.464l-9.5,12.949a6.4,6.4,0,0,1-1.056,1.165,6.714,6.714,0,0,1-1.122.769,5.686,5.686,0,0,1,1.528.847,5.613,5.613,0,0,1,1.265,1.44l9.674,14.862h-6.64a5.774,5.774,0,0,1-1.088-.088,2.735,2.735,0,0,1-.781-.264,2.2,2.2,0,0,1-.572-.428,4.349,4.349,0,0,1-.463-.583l-7.254-11.147a2.186,2.186,0,0,0-1-.868,4.321,4.321,0,0,0-1.637-.253h-1.8v13.631h-7.43V72.652h7.43Z" transform="translate(-287.576 -72.652)" fill={dark ? "#fff" : "#092c5c"}/>
        </g>
      </g>
    </g>
  </svg>
);

// Mobile Menu Accordion Item
interface MobileMenuItemProps {
  item: any;
  level?: number;
  openItems: string[];
  toggleItem: (id: string) => void;
}

const MobileMenuItem: React.FC<MobileMenuItemProps> = ({ item, level = 0, openItems, toggleItem }) => {
  const itemId = `${level}-${item.label}`;
  const isOpen = openItems.includes(itemId);
  const hasChildren = item.hasSubmenu || item.hasNested;
  const children = item.submenu || item.items || [];
  
  const paddingLeft = level === 0 ? 'pl-6' : level === 1 ? 'pl-10' : 'pl-14';
  
  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        onClick={() => hasChildren ? toggleItem(itemId) : null}
        className={`w-full flex items-center justify-between py-4 ${paddingLeft} pr-6 text-white hover:bg-white/5 transition-colors`}
      >
        <span className={`font-semibold uppercase tracking-wider ${level === 0 ? 'text-sm' : level === 1 ? 'text-xs' : 'text-[11px]'}`}>
          {item.label}
        </span>
        {hasChildren && (
          <svg 
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>
      
      {hasChildren && (
        <div 
          className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}
          style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
        >
          {children.map((child: any, idx: number) => (
            <MobileMenuItem 
              key={idx} 
              item={child} 
              level={level + 1}
              openItems={openItems}
              toggleItem={toggleItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TopNav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileItems, setOpenMobileItems] = useState<string[]>([]);
  const { isDarkMode, toggleDarkMode, club } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lukk mobilmeny ved resize til desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hindre scroll når mobilmeny er åpen
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const toggleMobileItem = (id: string) => {
    setOpenMobileItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? (isDarkMode ? 'nav-glass py-2' : 'nav-glass-light py-2') : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo (Left) - Klubb-spesifikk */}
          <div className="flex-shrink-0">
            <div className="cursor-pointer inline-block">
              <ClubLogo club={club} dark={isDarkMode || !isScrolled} />
            </div>
          </div>

          {/* Desktop Links (Centered) - Hidden on mobile */}
          <div className="hidden lg:flex flex-grow justify-center">
            <div className={`flex items-center gap-6 ${isDarkMode || !isScrolled ? 'text-white' : 'text-brand-blue'}`}>
            {NAV_ITEMS.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* The "Bridge": Padding bottom ensures the mouse remains over a valid element when moving to the menu */}
                <div className="py-4">
                  <a 
                    href={item.href} 
                    className="text-[14px] uppercase font-semibold tracking-wider transition-colors flex items-center gap-1 whitespace-nowrap hover:text-[var(--color-accent)]"
                  >
                    {item.label}
                    {item.hasSubmenu && (
                      <svg className="w-3 h-3 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                    )}
                  </a>
                </div>
                
                {item.hasSubmenu && (
                  <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-64 bg-white dark:bg-brand-blue shadow-2xl rounded-2xl overflow-visible submenu-enter transition-all duration-300 border border-gray-100 dark:border-white/10">
                    <div className="p-1.5">
                      {item.submenu.map((sub: any, sIdx: number) => (
                        <div key={sIdx} className="relative group/nested">
                          <a 
                            href={sub.href} 
                            className="flex items-center justify-between px-5 py-3 text-[11px] font-black uppercase tracking-widest text-brand-blue dark:text-white hover:bg-brand-red hover:text-white transition-colors rounded-xl mb-0.5 last:mb-0"
                          >
                            {sub.label}
                            {sub.hasNested && (
                              <svg className="w-3 h-3 -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                            )}
                          </a>
                          
                          {sub.hasNested && (
                            <div className="absolute left-[95%] top-0 ml-1 w-56 bg-white dark:bg-brand-blue shadow-2xl rounded-2xl overflow-hidden opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible transition-all duration-300 border border-gray-100 dark:border-white/10">
                               <div className="p-1.5">
                                 {sub.items.map((nested: any, nIdx: number) => (
                                   <a 
                                      key={nIdx}
                                      href={nested.href}
                                      className="block px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-brand-blue dark:text-white hover:bg-brand-red hover:text-white transition-colors rounded-xl mb-0.5 last:mb-0"
                                   >
                                     {nested.label}
                                   </a>
                                 ))}
                               </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            </div>
          </div>

          {/* Action Hub (Right) */}
          <div className="hidden lg:flex flex-shrink-0 items-center gap-5">
            <button 
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-xl transition-all ${isDarkMode || !isScrolled ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-brand-blue/5 text-brand-blue hover:bg-brand-blue/10'}`}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 118.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>

            <button 
              className="text-[12px] font-black uppercase px-10 py-4 rounded-2xl hover:scale-105 transition-all shadow-xl whitespace-nowrap"
              style={{ 
                background: `linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-light) 100%)`,
                boxShadow: `0 10px 40px -10px var(--color-accent)`,
                color: 'var(--color-text-on-accent)',
              }}
            >
              Bli medlem
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-all ${isDarkMode || !isScrolled ? 'text-white' : 'text-brand-blue'}`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ backgroundColor: 'var(--color-dark)' }}
      >
        {/* Menu Content */}
        <div className="pt-24 pb-8 h-full overflow-y-auto">
          <nav>
            {NAV_ITEMS.map((item, idx) => (
              <MobileMenuItem
                key={idx}
                item={item}
                openItems={openMobileItems}
                toggleItem={toggleMobileItem}
              />
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="px-6 pt-8">
            <button 
              className="w-full text-[12px] font-black uppercase py-4 rounded-2xl transition-all shadow-xl"
              style={{ 
                background: `linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-light) 100%)`,
                color: 'var(--color-text-on-accent)',
              }}
            >
              Bli medlem
            </button>
          </div>

          {/* Mobile Dark Mode Toggle */}
          <div className="px-6 pt-4 flex justify-center">
            <button 
              onClick={toggleDarkMode}
              className="flex items-center gap-3 text-white/60 text-sm"
            >
              {isDarkMode ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" /></svg>
                  Bytt til lyst tema
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 118.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                  Bytt til mørkt tema
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNav;
