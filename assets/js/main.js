// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.close-btn');
const mobileLinks = document.querySelectorAll('.mobile-link');
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const skillsContainer = document.getElementById('skills-container');
const projectsContainer = document.getElementById('projects-container');
const apiPlatformsContainer = document.getElementById('api-platforms-container');
const contactForm = document.getElementById('contact-form');

// Cursor Movement
document.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;
  
  // Cursor dot follows cursor exactly
  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;
  
  // Cursor outline follows with slight delay
  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 200, fill: 'forwards' });
});

// Cursor effects on hover
document.querySelectorAll('a, button, .btn, input, textarea, .close-btn, .mobile-menu-btn').forEach(item => {
  item.addEventListener('mouseenter', () => {
    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
    cursorOutline.style.border = `2px solid var(--secondary)`;
    cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
  });
  
  item.addEventListener('mouseleave', () => {
    cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    cursorOutline.style.border = `2px solid var(--secondary)`;
    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});

// Navbar Scrolling Effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.add('open');
});

closeBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
});

// Close mobile menu when a link is clicked
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// Load Skills from JSON
async function loadSkills() {
  try {
    const response = await fetch('data/skills.json');
    const skillsData = await response.json();
    
    skillsData.forEach((category, index) => {
      const delay = index * 200;
      
      const categoryEl = document.createElement('div');
      categoryEl.classList.add('skill-category', 'glass-card');
      categoryEl.style.animation = `fadeInUp 0.5s ease forwards ${delay}ms`;
      categoryEl.style.opacity = '0';
      categoryEl.style.borderLeft = `5px solid ${category.iconColor}`;
      
      categoryEl.innerHTML = `
        <div class="category-header">
          <div class="category-icon" style="background-color: ${category.iconColor}20; color: ${category.iconColor}">
            <i class="fas ${category.icon}"></i>
          </div>
          <h3 class="category-title">${category.title}</h3>
        </div>
        <div class="category-skills">
          ${category.skills.map((skill, skillIndex) => `
            <div class="skill-item" data-delay="${delay + (skillIndex * 100)}">
              <div class="skill-info">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-percentage">${skill.percentage}%</span>
              </div>
              <div class="skill-progress">
                <div class="skill-bar" data-percentage="${skill.percentage}"></div>
              </div>
            </div>
          `).join('')}
        </div>
      `;
      
      skillsContainer.appendChild(categoryEl);
    });
    
    // Animate skill bars when section comes into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillBars = entry.target.querySelectorAll('.skill-bar');
          skillBars.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage');
            bar.style.width = `${percentage}%`;
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(document.getElementById('skills'));
    
  } catch (error) {
    console.error('Error loading skills:', error);
    skillsContainer.innerHTML = '<p class="error-message">Failed to load skills data.</p>';
  }
}

// Load Projects from JSON
async function loadProjects() {
  try {
    console.log('Loading projects...');
    const response = await fetch('data/projects.json');
    console.log('Projects fetch response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.status} ${response.statusText}`);
    }
    
    const projectsData = await response.json();
    console.log('Projects data loaded:', projectsData);
    console.log('Number of projects:', projectsData.length);
    
    if (!projectsContainer) {
      console.error('Projects container is null or undefined!');
      return;
    }
    
    // Clear any existing content
    projectsContainer.innerHTML = '';
    
    projectsData.forEach((project, index) => {
      console.log(`Processing project ${index + 1}:`, project.title);
      const delay = index * 200;
      
      const projectEl = document.createElement('div');
      projectEl.classList.add('project-card');
      
      // Set initial styles and animation
      projectEl.style.animation = `fadeInUp 0.5s ease forwards ${delay}ms`;
      
      projectEl.innerHTML = `
        <div class="card-inner">
          <div class="card-front" style="background-image: url('${project.image}')">
            <h3 class="project-title-overlay">${project.title}</h3>
          </div>
          <div class="card-back glass-card">
            <div>
              <h3 class="project-title">${project.title}</h3>
              <p class="project-description">${project.description}</p>
              <div class="project-tech">
                ${project.technologies.slice(0, 5).map(tech => `
                  <span class="tech-tag">${tech}</span>
                `).join('')}
                ${project.technologies.length > 5 ? `<span class="tech-tag">+${project.technologies.length - 5} more</span>` : ''}
              </div>
            </div>
            <div class="project-links">
              <a href="${project.demoLink}" target="_blank" class="btn btn-primary">Live Demo</a>
              <a href="${project.githubLink}" target="_blank" class="btn btn-outline">GitHub</a>
            </div>
          </div>
        </div>
      `;
      
      projectsContainer.appendChild(projectEl);
      console.log(`Added project ${index + 1} to DOM`);
    });
    
    console.log('All projects loaded successfully');
    
  } catch (error) {
    console.error('Error loading projects:', error);
    if (projectsContainer) {
      projectsContainer.innerHTML = '<p class="error-message">Failed to load projects data.</p>';
    }
  }
}

// Load API Showcases from JSON
async function loadAPIs() {
  try {
    const response = await fetch('data/apis.json');
    const apisData = await response.json();
    
    apisData.forEach((platform, index) => {
      const delay = index * 300;
      
      const platformEl = document.createElement('div');
      platformEl.classList.add('api-platform', 'glass-card');
      platformEl.style.animation = `fadeInUp 0.5s ease forwards ${delay}ms`;
      platformEl.style.opacity = '0';
      platformEl.style.borderLeftColor = platform.actionColor;
      
      platformEl.innerHTML = `
        <div class="platform-header">
          <div class="platform-logo" style="background-color: ${platform.actionColor}20; color: ${platform.actionColor}">
            <i class="fas ${platform.logo}"></i>
          </div>
          <div class="platform-info">
            <h3>${platform.platform}</h3>
            <p>${platform.description}</p>
            <div class="platform-action">
              <a href="${platform.actionLink}" target="_blank" class="btn btn-outline" style="border-color: ${platform.actionColor}">
                ${platform.actionText}
              </a>
            </div>
          </div>
        </div>
        <div class="api-cards">
          ${platform.apis.map((api, apiIndex) => `
            <div class="api-card" style="border-left-color: ${api.borderColor}">
              <h4>${api.title}</h4>
              <p>${api.description}</p>
              <div class="api-tags">
                ${api.tags.map(tag => `
                  <span class="api-tag">${tag}</span>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      `;
      
      apiPlatformsContainer.appendChild(platformEl);
    });
    
  } catch (error) {
    console.error('Error loading APIs:', error);
    apiPlatformsContainer.innerHTML = '<p class="error-message">Failed to load API data.</p>';
  }
}

// Contact Form Handling
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Form validation
    if (!name || !email || !subject || !message) {
      alert('Please fill all fields');
      return;
    }
    
    // Here you would normally send the form data to your server
    // For demonstration, we'll just show a success message
    alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
    contactForm.reset();
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Animation for sections as they come into view
function setupAnimations() {
  const animElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  animElements.forEach(element => {
    observer.observe(element);
  });
}

// Add fadeIn animations
function addFadeInAnimations() {
  // Define the CSS for fade-in animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .animated {
      animation: fadeInUp 0.5s ease forwards;
    }
  `;
  document.head.appendChild(style);
  
  // Add animation class to section headers
  document.querySelectorAll('.section-header').forEach(header => {
    header.classList.add('animate-on-scroll');
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded');
  
  // Check if DOM elements exist
  console.log('Skills container exists:', !!skillsContainer);
  console.log('Projects container exists:', !!projectsContainer);
  console.log('API platforms container exists:', !!apiPlatformsContainer);
  
  // Load data
  loadSkills();
  loadProjects();
  loadAPIs();
  addFadeInAnimations();
  setupAnimations();
  
  // Log project container
  if (projectsContainer) {
    console.log('Projects container ID:', projectsContainer.id);
    console.log('Projects container HTML before loading:', projectsContainer.innerHTML);
  } else {
    console.error('Projects container not found in the DOM!');
  }
  
  // Handle missing images with default gradient background
  document.querySelectorAll('.card-front').forEach(card => {
    const bgImage = card.style.backgroundImage;
    if (!bgImage || bgImage.includes('project1.jpg') || bgImage.includes('project2.jpg') || 
        bgImage.includes('project3.jpg') || bgImage.includes('project4.jpg')) {
      card.style.backgroundColor = '#121212';
      card.style.backgroundImage = 'linear-gradient(45deg, #bd00ff30, #00d8ff30)';
      
      // Add a project icon to the center
      const iconElement = document.createElement('i');
      iconElement.className = 'fas fa-code';
      iconElement.style.position = 'absolute';
      iconElement.style.top = '50%';
      iconElement.style.left = '50%';
      iconElement.style.transform = 'translate(-50%, -50%)';
      iconElement.style.fontSize = '3rem';
      iconElement.style.color = '#ffffff80';
      card.appendChild(iconElement);
    }
  });
  
  // After loading projects, check if they were added
  setTimeout(() => {
    if (projectsContainer) {
      console.log('Projects container HTML after loading:', projectsContainer.innerHTML);
      console.log('Number of projects:', projectsContainer.children.length);
    }
  }, 1000);
});