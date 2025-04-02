// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
  console.log('Main script loaded');
  
  // Set up event listeners and initialize site functionality
  setupMobileMenu();
  setupContactForm();
  setupCustomCursor();
  
  // Load data from JSON files
  loadSkills();
  loadProjects();
  loadAPIs();
  
  // Add theme toggle button
  setupThemeToggle();
});

// Mobile menu functionality
function setupMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu .close-btn');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  
  if (!mobileMenuBtn || !mobileMenu || !closeBtn) return;
  
  mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
  
  closeBtn.addEventListener('click', function() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });
}

// Contact form handling
function setupContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // In a real implementation, this would send the form data to a server
    // For now, we'll just show a success message
    
    const formData = new FormData(contactForm);
    let formValid = true;
    
    // Simple validation
    for (const [key, value] of formData.entries()) {
      if (!value.trim()) {
        formValid = false;
        break;
      }
    }
    
    if (formValid) {
      // For demo purposes, show a success message
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Message Sent!';
      submitBtn.classList.add('success');
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.classList.remove('success');
        contactForm.reset();
      }, 3000);
    }
  });
}

// Custom cursor
function setupCustomCursor() {
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorOutline = document.querySelector('.cursor-outline');
  
  if (!cursorDot || !cursorOutline) return;
  
  let mouseX = 0;
  let mouseY = 0;
  let dotX = 0;
  let dotY = 0;
  let outlineX = 0;
  let outlineY = 0;
  
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Add hover effect on interactive elements
    const target = e.target;
    if (
      target.tagName.toLowerCase() === 'a' || 
      target.tagName.toLowerCase() === 'button' ||
      target.classList.contains('project-card') ||
      target.closest('.project-card') ||
      target.closest('a') ||
      target.closest('button')
    ) {
      cursorOutline.classList.add('hover');
    } else {
      cursorOutline.classList.remove('hover');
    }
  });
  
  // Hide cursor when leaving the window
  document.addEventListener('mouseout', function(e) {
    if (e.relatedTarget === null) {
      cursorDot.style.opacity = '0';
      cursorOutline.style.opacity = '0';
    }
  });
  
  document.addEventListener('mouseover', function() {
    cursorDot.style.opacity = '1';
    cursorOutline.style.opacity = '1';
  });
  
  // Smooth cursor movement
  function updateCursor() {
    // Smooth follow effect
    dotX += (mouseX - dotX) * 0.8;
    dotY += (mouseY - dotY) * 0.8;
    outlineX += (mouseX - outlineX) * 0.3;
    outlineY += (mouseY - outlineY) * 0.3;
    
    cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
    cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
    
    requestAnimationFrame(updateCursor);
  }
  
  updateCursor();
  
  // Add click animation
  document.addEventListener('mousedown', function() {
    cursorDot.classList.add('click');
    cursorOutline.classList.add('click');
  });
  
  document.addEventListener('mouseup', function() {
    cursorDot.classList.remove('click');
    cursorOutline.classList.remove('click');
  });
}

// Load Skills from JSON
async function loadSkills() {
  try {
    const response = await fetch('data/skills.json');
    const skillsData = await response.json();
    
    const skillsContainer = document.getElementById('skills-container');
    if (!skillsContainer) return;
    
    skillsContainer.innerHTML = ''; // Clear container
    
    skillsData.forEach((category, index) => {
      const categoryEl = document.createElement('div');
      categoryEl.className = 'skill-category';
      categoryEl.style.animationDelay = `${index * 0.2}s`;
      
      // Create skill category header
      const header = document.createElement('div');
      header.className = 'skill-header';
      
      const icon = document.createElement('div');
      icon.className = 'skill-icon';
      icon.style.backgroundColor = `${category.iconColor}20`; // 20% opacity of the icon color
      icon.style.color = category.iconColor;
      icon.innerHTML = `<i class="fas ${category.icon}"></i>`;
      
      const title = document.createElement('h3');
      title.textContent = category.title;
      
      header.appendChild(icon);
      header.appendChild(title);
      
      // Create skill bars
      const skillBars = document.createElement('div');
      skillBars.className = 'skill-bars';
      
      category.skills.forEach(skill => {
        const skillBar = document.createElement('div');
        skillBar.className = 'skill-bar';
        
        const skillInfo = document.createElement('div');
        skillInfo.className = 'skill-info';
        
        const skillName = document.createElement('span');
        skillName.textContent = skill.name;
        
        const skillValue = document.createElement('span');
        skillValue.textContent = `${skill.percentage}%`;
        
        skillInfo.appendChild(skillName);
        skillInfo.appendChild(skillValue);
        
        const progress = document.createElement('div');
        progress.className = 'skill-progress';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'skill-progress-bar';
        progressBar.style.width = '0%';
        
        // Animate the width after a short delay
        setTimeout(() => {
          progressBar.style.width = `${skill.percentage}%`;
        }, 100);
        
        progress.appendChild(progressBar);
        
        skillBar.appendChild(skillInfo);
        skillBar.appendChild(progress);
        
        skillBars.appendChild(skillBar);
      });
      
      categoryEl.appendChild(header);
      categoryEl.appendChild(skillBars);
      
      skillsContainer.appendChild(categoryEl);
    });
    
  } catch (error) {
    console.error('Error loading skills:', error);
  }
}

// Load Projects from JSON
async function loadProjects() {
  try {
    const response = await fetch('data/projects.json');
    const projectsData = await response.json();
    
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;
    
    projectsContainer.innerHTML = ''; // Clear container
    
    projectsData.forEach((project, index) => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';
      projectCard.style.animationDelay = `${index * 0.2}s`;
      
      const cardInner = document.createElement('div');
      cardInner.className = 'project-card-inner';
      
      // Create front of card
      const cardFront = document.createElement('div');
      cardFront.className = 'project-card-front';
      
      // Use placeholder image if project image doesn't exist
      const imgSrc = project.image || 'assets/images/projects/placeholder.svg';
      
      const img = document.createElement('img');
      img.className = 'project-image';
      img.src = imgSrc;
      img.alt = project.title;
      img.onerror = function() {
        this.src = 'assets/images/projects/placeholder.svg';
      };
      
      const overlay = document.createElement('div');
      overlay.className = 'project-overlay';
      
      const title = document.createElement('h3');
      title.className = 'project-title';
      title.textContent = project.title;
      
      overlay.appendChild(title);
      cardFront.appendChild(img);
      cardFront.appendChild(overlay);
      
      // Create back of card
      const cardBack = document.createElement('div');
      cardBack.className = 'project-card-back';
      
      const backTitle = document.createElement('h3');
      backTitle.className = 'project-title';
      backTitle.textContent = project.title;
      
      const description = document.createElement('p');
      description.className = 'project-description';
      description.textContent = project.description;
      
      const techContainer = document.createElement('div');
      techContainer.className = 'project-tech';
      
      // Add technology tags
      project.technologies.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = tech;
        techContainer.appendChild(tag);
      });
      
      const links = document.createElement('div');
      links.className = 'project-links';
      
      const demoLink = document.createElement('a');
      demoLink.href = project.demoLink;
      demoLink.className = 'btn btn-primary';
      demoLink.textContent = 'Live Demo';
      demoLink.target = '_blank';
      
      const githubLink = document.createElement('a');
      githubLink.href = project.githubLink;
      githubLink.className = 'btn btn-outline';
      githubLink.textContent = 'GitHub';
      githubLink.target = '_blank';
      
      links.appendChild(demoLink);
      links.appendChild(githubLink);
      
      cardBack.appendChild(backTitle);
      cardBack.appendChild(description);
      cardBack.appendChild(techContainer);
      cardBack.appendChild(links);
      
      // Add front and back to card inner
      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      
      // Add card inner to card
      projectCard.appendChild(cardInner);
      
      // Add card to container
      projectsContainer.appendChild(projectCard);
    });
    
  } catch (error) {
    console.error('Error loading projects:', error);
  }
}

// Load APIs from JSON
async function loadAPIs() {
  try {
    const response = await fetch('data/apis.json');
    const apisData = await response.json();
    
    const apiPlatformsContainer = document.getElementById('api-platforms-container');
    if (!apiPlatformsContainer) return;
    
    apiPlatformsContainer.innerHTML = ''; // Clear container
    
    apisData.forEach((platform, platformIndex) => {
      const platformEl = document.createElement('div');
      platformEl.className = 'api-platform';
      platformEl.style.animationDelay = `${platformIndex * 0.3}s`;
      
      // Create platform header
      const header = document.createElement('div');
      header.className = 'platform-header';
      
      const logo = document.createElement('div');
      logo.className = 'platform-logo';
      logo.style.color = platform.actionColor;
      logo.innerHTML = `<i class="fas ${platform.logo}"></i>`;
      
      const info = document.createElement('div');
      info.className = 'platform-info';
      
      const title = document.createElement('h3');
      title.textContent = platform.platform;
      
      const description = document.createElement('p');
      description.className = 'platform-description';
      description.textContent = platform.description;
      
      info.appendChild(title);
      info.appendChild(description);
      
      header.appendChild(logo);
      header.appendChild(info);
      
      // Create API cards
      const cards = document.createElement('div');
      cards.className = 'api-cards';
      
      platform.apis.forEach((api, apiIndex) => {
        const card = document.createElement('div');
        card.className = 'api-card';
        card.style.borderLeftColor = api.borderColor;
        card.style.animationDelay = `${(platformIndex * 0.2) + (apiIndex * 0.1)}s`;
        
        const apiTitle = document.createElement('h4');
        apiTitle.textContent = api.title;
        
        const apiDescription = document.createElement('p');
        apiDescription.textContent = api.description;
        
        const apiTags = document.createElement('div');
        apiTags.className = 'api-tags';
        
        // Add API tags
        api.tags.forEach(tag => {
          const tagSpan = document.createElement('span');
          tagSpan.className = 'api-tag';
          tagSpan.textContent = tag;
          apiTags.appendChild(tagSpan);
        });
        
        card.appendChild(apiTitle);
        card.appendChild(apiDescription);
        card.appendChild(apiTags);
        
        cards.appendChild(card);
      });
      
      // Create platform action button
      const action = document.createElement('div');
      action.className = 'platform-action';
      
      const actionLink = document.createElement('a');
      actionLink.href = platform.actionLink;
      actionLink.className = 'btn btn-primary';
      actionLink.textContent = platform.actionText;
      actionLink.target = '_blank';
      actionLink.style.backgroundColor = platform.actionColor;
      actionLink.style.borderColor = platform.actionColor;
      
      action.appendChild(actionLink);
      
      // Add all elements to platform
      platformEl.appendChild(header);
      platformEl.appendChild(cards);
      platformEl.appendChild(action);
      
      // Add platform to container
      apiPlatformsContainer.appendChild(platformEl);
    });
    
  } catch (error) {
    console.error('Error loading APIs:', error);
  }
}

// Setup Theme Toggle Button
function setupThemeToggle() {
  // Create the theme toggle button
  const themeToggle = document.createElement('div');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = `
    <div class="theme-toggle-button">
      <i class="fas fa-paint-brush"></i>
    </div>
    <div class="theme-options">
      <div class="theme-option" data-theme="default" title="Default Theme">
        <i class="fas fa-circle"></i>
      </div>
      <div class="theme-option" data-theme="cosmic" title="Cosmic Theme">
        <i class="fas fa-moon"></i>
      </div>
      <div class="theme-option" data-theme="neon" title="Neon Theme">
        <i class="fas fa-bolt"></i>
      </div>
      <div class="theme-option" data-theme="hacker" title="Hacker Theme">
        <i class="fas fa-terminal"></i>
      </div>
      <div class="theme-option" data-theme="light" title="Light Theme">
        <i class="fas fa-sun"></i>
      </div>
      <div class="theme-option" data-theme="retro" title="Retro Theme">
        <i class="fas fa-gamepad"></i>
      </div>
    </div>
  `;
  
  // Add the toggle to the body
  document.body.appendChild(themeToggle);
  
  // Add event listeners
  const toggleButton = themeToggle.querySelector('.theme-toggle-button');
  const themeOptions = themeToggle.querySelector('.theme-options');
  
  toggleButton.addEventListener('click', () => {
    themeToggle.classList.toggle('open');
  });
  
  // Close theme options when clicking outside
  document.addEventListener('click', (e) => {
    if (!themeToggle.contains(e.target)) {
      themeToggle.classList.remove('open');
    }
  });
  
  // Theme option click handlers
  const themeOptionButtons = themeToggle.querySelectorAll('.theme-option');
  themeOptionButtons.forEach(button => {
    button.addEventListener('click', () => {
      const theme = button.getAttribute('data-theme');
      if (window.themeSwitcher) {
        window.themeSwitcher.setTheme(theme);
      }
      themeToggle.classList.remove('open');
    });
  });
  
  // Add styles for the theme toggle
  const style = document.createElement('style');
  style.textContent = `
    .theme-toggle {
      position: fixed;
      bottom: 30px;
      right: 30px;
      z-index: 9999;
    }
    
    .theme-toggle-button {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: var(--primary-color);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      font-size: 1.2rem;
      transition: all 0.3s ease;
    }
    
    .theme-toggle-button:hover {
      transform: scale(1.1);
    }
    
    .theme-options {
      position: absolute;
      bottom: 65px;
      right: 0;
      background-color: white;
      border-radius: 20px;
      padding: 15px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      gap: 10px;
      opacity: 0;
      transform: translateY(20px);
      pointer-events: none;
      transition: all 0.3s ease;
    }
    
    .theme-toggle.open .theme-options {
      opacity: 1;
      transform: translateY(0);
      pointer-events: all;
    }
    
    .theme-option {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1rem;
      transition: all 0.2s ease;
    }
    
    .theme-option:hover {
      transform: scale(1.2);
    }
    
    .theme-option[data-theme="default"] {
      background-color: #6C63FF;
      color: white;
    }
    
    .theme-option[data-theme="cosmic"] {
      background-color: #9d4edd;
      color: white;
    }
    
    .theme-option[data-theme="neon"] {
      background-color: #0aefff;
      color: black;
    }
    
    .theme-option[data-theme="hacker"] {
      background-color: #00ff41;
      color: black;
    }
    
    .theme-option[data-theme="light"] {
      background-color: #f5f5f7;
      color: #0070f3;
      border: 1px solid #ddd;
    }
    
    .theme-option[data-theme="retro"] {
      background-color: #ff6b6b;
      color: white;
    }
    
    /* When in a non-default theme, change the toggle button color */
    [data-theme="cosmic"] .theme-toggle-button {
      background-color: #9d4edd;
    }
    
    [data-theme="neon"] .theme-toggle-button {
      background-color: #0aefff;
      color: black;
    }
    
    [data-theme="hacker"] .theme-toggle-button {
      background-color: #00ff41;
      color: black;
    }
    
    [data-theme="light"] .theme-toggle-button {
      background-color: #0070f3;
    }
    
    [data-theme="retro"] .theme-toggle-button {
      background-color: #ff6b6b;
    }
  `;
  
  document.head.appendChild(style);
}

// Navbar visibility on scroll
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop && scrollTop > 150) {
    // Scrolling down & not at the top
    navbar.classList.add('hidden');
  } else {
    // Scrolling up or at the top
    navbar.classList.remove('hidden');
  }
  
  lastScrollTop = scrollTop;
  
  // Add solid background when not at the top
  if (scrollTop > 50) {
    navbar.classList.add('solid');
  } else {
    navbar.classList.remove('solid');
  }
});