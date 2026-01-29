
import React from 'react';

const RoleSection: React.FC = () => {
  const roles = [
    { title: 'Klubb', icon: '★', desc: 'Gir full administrator-tilgang på siden og kan opprette brukere til andre.' },
    { title: 'Gruppe/Gren', icon: '✦', desc: 'Sjef på gruppenivå har kun mulighet til å endre sitt eget gruppeside samt publisere nyheter under valgt gruppe.' },
    { title: 'Lag/Utøver', icon: '👕', desc: 'Sjef på lagnivå har kun mulighet til å endre sitt eget lag samt publisere nyheter lokalt for laget.' },
  ];

  return (
    <section className="py-32 bg-[#0b0e14]">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-5xl font-black mb-6 uppercase tracking-tight">FORSKJELLIG ROLLE,<br/>FORSKJELLIG TILGANG</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-20">
          Med innlogging kan du gi forskjellig tilgang etter hvilke roller man har. En trener vil dermed ha tilgang til å publisere innhold for sitt lag, mens en superbruker har tilgang til å blant annet å redigere menyer, moduler og hovedbilde.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role, i) => (
            <div key={i} className="bg-[#151a24] p-10 rounded-2xl border border-white/5 hover:border-red-500/50 transition-all text-left group">
              <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">
                {role.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{role.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{role.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoleSection;
