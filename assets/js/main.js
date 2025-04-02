// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
  console.log('Main script loaded');
  
  // Set up event listeners and initialize site functionality
  setupMobileMenu();
  setupContactForm();
  setupCustomCursor();
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