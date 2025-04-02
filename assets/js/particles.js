// Particle effect for the hero section
function createParticles() {
  const container = document.getElementById('particles-container');
  if (!container) return;
  
  const particleCount = 50;
  const particles = [];
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    createParticle();
  }
  
  function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('hero-particle');
    
    // Random size between 5 and 25px
    const size = Math.random() * 20 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    
    // Random animation duration and delay
    const animDuration = Math.random() * 10 + 5;
    const animDelay = Math.random() * 5;
    particle.style.animation = `float ${animDuration}s infinite ${animDelay}s`;
    
    // Random opacity
    const opacity = Math.random() * 0.15 + 0.05;
    particle.style.opacity = opacity;
    
    container.appendChild(particle);
    particles.push({
      element: particle,
      x: posX,
      y: posY,
      size: size,
      speedX: Math.random() * 0.2 - 0.1,
      speedY: Math.random() * 0.2 - 0.1
    });
  }
  
  // Particle movement
  function animateParticles() {
    particles.forEach(particle => {
      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Boundary check
      if (particle.x < -10) particle.x = 110;
      if (particle.x > 110) particle.x = -10;
      if (particle.y < -10) particle.y = 110;
      if (particle.y > 110) particle.y = -10;
      
      // Apply new position
      particle.element.style.left = `${particle.x}%`;
      particle.element.style.top = `${particle.y}%`;
    });
    
    requestAnimationFrame(animateParticles);
  }
  
  // Start animation
  animateParticles();
}

// Initialize particles when the DOM is loaded
document.addEventListener('DOMContentLoaded', createParticles);