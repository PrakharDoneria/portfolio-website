export const createParticles = (container: HTMLElement, count: number) => {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('hero-particle');
    
    // Random size between 2px and 6px
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Random delay for floating animation
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    container.appendChild(particle);
  }
  
  return () => {
    const particles = container.querySelectorAll('.hero-particle');
    particles.forEach(particle => {
      container.removeChild(particle);
    });
  };
};
