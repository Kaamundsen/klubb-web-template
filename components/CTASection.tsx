
import React from 'react';

const CTASection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="gradient-demo rounded-[40px] py-20 px-10 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-5xl lg:text-7xl font-black mb-6 uppercase tracking-tight">
              GRATIS OG<br/>UFORPLIKTENDE DEMO
            </h2>
            <p className="text-white/90 font-medium mb-12 max-w-xl mx-auto">
              Book en 30-minutters demo av Klubbnettside og opplev selv hvor enkelt alt kan være.
            </p>
            <button className="bg-white text-black px-12 py-5 rounded-full font-black uppercase text-sm tracking-widest hover:scale-105 transition-transform shadow-xl">
              Book Demo
            </button>
          </div>
          
          {/* Background shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
