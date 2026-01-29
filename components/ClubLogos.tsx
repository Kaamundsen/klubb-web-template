
import React from 'react';

const ClubLogos: React.FC = () => {
  const logos = Array.from({ length: 12 }, (_, i) => `https://picsum.photos/seed/logo${i}/200/200`);
  
  return (
    <section className="py-32 bg-[#0b0e14] relative overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-4">Klubbnettside løsninger vokser</p>
        <h2 className="text-5xl font-black mb-20 uppercase tracking-tighter">OVER 300 KLUBBER</h2>
        
        <div className="relative h-[400px] flex items-center justify-center">
          {/* Circular Cluster Effect Simulation */}
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 max-w-4xl mx-auto">
            {logos.map((logo, i) => (
              <div key={i} className="aspect-square bg-[#151a24] rounded-full p-4 border border-white/10 hover:border-red-500/50 transition-all flex items-center justify-center group overflow-hidden shadow-xl">
                 <img src={logo} alt="Club" className="w-12 h-12 rounded-full grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all" />
              </div>
            ))}
          </div>
          
          {/* Abstract circles in background */}
          <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-20">
            <div className="w-[300px] h-[300px] border border-red-500 rounded-full animate-ping"></div>
            <div className="absolute w-[500px] h-[500px] border border-white/10 rounded-full"></div>
            <div className="absolute w-[700px] h-[700px] border border-white/5 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubLogos;
