
import React from 'react';

const StatsSection: React.FC = () => {
  return (
    <section className="py-32 bg-brand-dark">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="bg-brand-blue/30 backdrop-blur-3xl p-16 rounded-[3rem] border border-white/5 relative overflow-hidden group">
            <h3 className="text-brand-red font-black uppercase tracking-[0.3em] text-[10px] mb-10">Anerkjent partner</h3>
            <div className="flex flex-wrap gap-12 items-center">
              <div className="flex flex-col items-center group-hover:scale-105 transition-transform">
                <span className="font-black text-2xl italic leading-none text-white">NORGES</span>
                <span className="text-[10px] font-bold tracking-[0.4em] text-gray-400">IDRETTSFORBUND</span>
              </div>
              <div className="flex flex-col items-start group-hover:scale-105 transition-transform">
                <span className="font-black text-2xl italic leading-none text-white">NORSK</span>
                <span className="text-[10px] font-bold tracking-[0.3em] text-gray-400">LIGAFOTBALL</span>
              </div>
            </div>
            {/* Ambient light */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-red/10 rounded-full blur-[80px]"></div>
          </div>

          <div>
            <div className="w-12 h-1.5 bg-brand-red rounded-full mb-8"></div>
            <h2 className="text-5xl lg:text-6xl font-black mb-10 leading-[1.1] tracking-tighter">KLUBBENS<br/>BESTE MEDSPILLER</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Vi i <span className="text-white font-bold">Klubbnettside.no</span> brenner for idretten. Vår misjon er å forenkle hverdagen for ildsjeler, trenere og utøvere gjennom smarte digitale løsninger.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              Med vår unike kombinasjon av sportserfaring og teknisk ekspertise får du en rådgiver som forstår dine behov – helt fra banen til styrerommet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;