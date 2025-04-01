import { useEffect, useRef } from 'react';

export default function About() {
  const infoCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (infoCardsRef.current) {
      const cards = infoCardsRef.current.querySelectorAll('.glass-card');
      cards.forEach((card) => {
        observer.observe(card);
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 relative bg-[#0a192f]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-4 font-rajdhani">
              <span className="text-[#00d8ff]">#</span> About Me
              <div className="h-px bg-gradient-to-r from-[#bd00ff] to-transparent flex-grow ml-4"></div>
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                I'm Prakhar Doneria, a developer and entrepreneur with a passion for technology and innovation.
                My journey in tech has led me to explore various domains including web development, app creation,
                and artificial intelligence.
              </p>
              <p>
                I take pride in creating robust APIs that power applications and services across the web.
                My work spans from AI-powered tools using models like Gemini Advance and GPT-4 to
                integration services for platforms like JioSaavn and Meta AI.
              </p>
              <p>
                When I'm not coding, you might find me playing piano, as music offers me a creative
                outlet to balance my technical pursuits.
              </p>
            </div>
            <div ref={infoCardsRef} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card p-4 rounded-lg opacity-0 transition-all duration-700" style={{transitionDelay: '0ms'}}>
                <div className="flex items-center gap-3">
                  <i className="fas fa-code text-[#00d8ff] text-2xl"></i>
                  <h3 className="font-medium text-lg">Development</h3>
                </div>
                <p className="mt-2 text-gray-300">Building elegant solutions with clean, efficient code</p>
              </div>
              <div className="glass-card p-4 rounded-lg opacity-0 transition-all duration-700" style={{transitionDelay: '200ms'}}>
                <div className="flex items-center gap-3">
                  <i className="fas fa-robot text-[#00d8ff] text-2xl"></i>
                  <h3 className="font-medium text-lg">AI & ML</h3>
                </div>
                <p className="mt-2 text-gray-300">Creating intelligent systems that learn and adapt</p>
              </div>
              <div className="glass-card p-4 rounded-lg opacity-0 transition-all duration-700" style={{transitionDelay: '400ms'}}>
                <div className="flex items-center gap-3">
                  <i className="fas fa-plug text-[#00d8ff] text-2xl"></i>
                  <h3 className="font-medium text-lg">API Development</h3>
                </div>
                <p className="mt-2 text-gray-300">Designing powerful interfaces for seamless integration</p>
              </div>
              <div className="glass-card p-4 rounded-lg opacity-0 transition-all duration-700" style={{transitionDelay: '600ms'}}>
                <div className="flex items-center gap-3">
                  <i className="fas fa-music text-[#00d8ff] text-2xl"></i>
                  <h3 className="font-medium text-lg">Music</h3>
                </div>
                <p className="mt-2 text-gray-300">Piano player and music enthusiast</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/5 order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-[#bd00ff] to-[#00d8ff] opacity-30 blur-xl"></div>
              <div className="overflow-hidden rounded-xl relative">
                <img 
                  src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt="Prakhar Doneria" 
                  className="w-full object-cover aspect-square grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] to-transparent opacity-60"></div>
                <div className="absolute inset-0 border-2 border-[#00d8ff] rounded-xl transform rotate-3 scale-105"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
