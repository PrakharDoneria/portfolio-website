// Particles Animation
document.addEventListener('DOMContentLoaded', function() {
  console.log('Particles script loaded');
  initParticles();
});

function initParticles() {
  const particlesContainer = document.getElementById('particles-container');
  if (!particlesContainer) return;
  
  // Configuration options
  const options = {
    particleCount: 100,
    color: '#ffffff',
    minSize: 1,
    maxSize: 3,
    speed: 0.5,
    connectParticles: true,
    connectDistance: 150,
    responsiveBreakpoint: 768
  };
  
  // Create particles
  createParticles(particlesContainer, options);
}

function createParticles(container, options) {
  const isMobile = window.innerWidth <= options.responsiveBreakpoint;
  const count = isMobile ? Math.floor(options.particleCount / 2) : options.particleCount;
  const particles = [];
  
  // Clear any existing particles
  container.innerHTML = '';
  
  // Create a canvas element
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas size to match container
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;
  
  // Append canvas to container
  container.appendChild(canvas);
  
  // Resize handling
  window.addEventListener('resize', function() {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
  });
  
  // Create particle objects
  for (let i = 0; i < count; i++) {
    particles.push(createParticle(canvas, options));
  }
  
  // Animation loop
  function animate() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particles.forEach(particle => {
      // Move particle
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.vx = -particle.vx;
      }
      
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.vy = -particle.vy;
      }
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });
    
    // Draw connections between particles
    if (options.connectParticles) {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < options.connectDistance) {
            // Calculate line opacity based on distance
            const opacity = 1 - (distance / options.connectDistance);
            
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

function createParticle(canvas, options) {
  // Random size between min and max
  const size = Math.random() * (options.maxSize - options.minSize) + options.minSize;
  
  // Random position within canvas
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  
  // Random velocity
  const vx = (Math.random() - 0.5) * options.speed;
  const vy = (Math.random() - 0.5) * options.speed;
  
  // Create particle object
  return {
    x,
    y,
    vx,
    vy,
    size,
    color: options.color
  };
}