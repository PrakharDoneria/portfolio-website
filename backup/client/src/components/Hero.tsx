import { useEffect, useRef, useState } from 'react';
import { initScene } from '@/lib/three-utils';
import { createParticles } from '@/lib/particles';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      createParticles(containerRef.current, 50);
    }

    // Fade in animations
    setTimeout(() => {
      setShowContent(true);
    }, 300);

    setTimeout(() => {
      setShowScroll(true);
    }, 1000);

    // Initialize Three.js scene
    let cleanup: (() => void) | undefined;
    if (containerRef.current) {
      cleanup = initScene(containerRef.current);
    }

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-animated">
      <div ref={containerRef} className="absolute inset-0 z-0"></div>
      <div className={`container mx-auto px-6 z-10 transition-opacity duration-800 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <div className="max-w-3xl">
          <h3 className="text-[#00ffd5] font-mono mb-3 tracking-wider">Hi, my name is</h3>
          <h1 className="text-5xl md:text-7xl font-bold mb-3 font-rajdhani text-shadow">Prakhar Doneria</h1>
          <div className="typing-container">
            <h2 className="typing-text text-3xl md:text-5xl font-bold mb-6 text-gray-300 font-rajdhani">Developer & Entrepreneur</h2>
          </div>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl">
            I specialize in creating powerful APIs, developing modern web & mobile applications, 
            and exploring the frontiers of artificial intelligence.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a href="#projects" className="px-8 py-3 bg-[#bd00ff] text-white rounded-lg shadow-lg hover:bg-[#bd00ff]/80 transition-all font-medium">View My Work</a>
            <a href="#contact" className="px-8 py-3 border border-[#00d8ff] text-white rounded-lg hover:bg-[#00d8ff]/20 transition-all font-medium">Get In Touch</a>
          </div>
        </div>
      </div>
      <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow transition-opacity duration-1000 ${showScroll ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2 text-gray-300">Scroll Down</span>
          <svg width="16" height="30" viewBox="0 0 16 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.29289 29.7071C7.68342 30.0976 8.31658 30.0976 8.70711 29.7071L15.0711 23.3431C15.4616 22.9526 15.4616 22.3195 15.0711 21.9289C14.6805 21.5384 14.0474 21.5384 13.6569 21.9289L8 27.5858L2.34315 21.9289C1.95262 21.5384 1.31946 21.5384 0.928932 21.9289C0.538407 22.3195 0.538407 22.9526 0.928932 23.3431L7.29289 29.7071ZM7 0V29H9V0H7Z" fill="white"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
