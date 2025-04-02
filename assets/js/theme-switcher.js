/**
 * Easter Egg Theme Switcher
 * -----------------------
 * A fun, hidden feature that allows users to change the website's theme
 * using keyboard sequences.
 * 
 * Available themes:
 * - Cosmic: A space-themed purple and blue color scheme
 * - Neon: Bright cyberpunk-inspired design with neon grid
 * - Hacker: Matrix-inspired green terminal look
 * - Light: A clean, light design for improved readability
 * - Retro: 80s/90s inspired design with scanlines
 */

// Theme switcher functionality
(function() {
  // Theme options
  const themes = {
    'default': { name: 'Default', hotkey: [] },
    'cosmic': { name: 'Cosmic', hotkey: ['c', 'o', 's'] },
    'neon': { name: 'Neon', hotkey: ['n', 'e', 'o'] },
    'hacker': { name: 'Hacker', hotkey: ['h', 'a', 'x'] },
    'light': { name: 'Light', hotkey: ['l', 'i', 't'] },
    'retro': { name: 'Retro', hotkey: ['r', 'e', 't'] }
  };
  
  // Keep track of current theme
  let currentTheme = 'default';
  
  // Keyboard sequence tracking
  let activeKeys = [];
  const keyTimeout = 1500; // ms before key sequence resets
  let keyTimeoutId = null;
  
  // Konami code sequence
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 
    'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 
    'ArrowLeft', 'ArrowRight', 
    'b', 'a'
  ];
  
  // Element selectors
  const htmlElement = document.documentElement;
  const konamiIndicator = document.querySelector('.konami-indicator');
  const hotkeyIndicator = document.querySelector('.hotkey-indicator');
  
  // Theme-specific visual elements
  const visualElements = {
    'neon': document.querySelector('.neon-grid'),
    'cosmic': document.querySelector('.light-rays'),
    'hacker': document.querySelector('.matrix-rain'),
    'retro': document.querySelector('.retro-scanlines')
  };
  
  // Helper functions
  function setTheme(themeName) {
    // Don't do anything if it's the same theme
    if (currentTheme === themeName) return;
    
    // Temporarily add transition class for animation
    htmlElement.classList.add('theme-transition');
    
    // Remove old theme attribute and set new one
    htmlElement.setAttribute('data-theme', themeName);
    currentTheme = themeName;
    
    // Hide all visual elements first
    Object.values(visualElements).forEach(el => {
      if (el) el.setAttribute('aria-hidden', 'true');
    });
    
    // Show the visual element for this theme if it exists
    if (visualElements[themeName]) {
      visualElements[themeName].removeAttribute('aria-hidden');
    }
    
    // Show notification
    showThemeNotification(themeName);
    
    // Save theme preference (could be extended to use localStorage)
    
    // Remove transition class after animation completes
    setTimeout(() => {
      htmlElement.classList.remove('theme-transition');
    }, 500);
  }
  
  function showThemeNotification(themeName) {
    // Create toast-like notification
    const notification = document.createElement('div');
    notification.className = 'theme-notification';
    notification.innerHTML = `
      <span>Theme Changed: <strong>${themes[themeName].name}</strong></span>
    `;
    document.body.appendChild(notification);
    
    // Animate notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);
    
    // Remove after animation
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 3000);
  }
  
  function showHelpIndicators() {
    // Show the keyboard helpers
    konamiIndicator.classList.add('visible');
    hotkeyIndicator.classList.add('visible');
    
    // Hide after a while
    setTimeout(() => {
      konamiIndicator.classList.remove('visible');
      hotkeyIndicator.classList.remove('visible');
    }, 10000);
  }
  
  // Add CSS for notification that's not in the CSS file
  const style = document.createElement('style');
  style.textContent = `
    .theme-notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transform: translateX(120%);
      transition: transform 0.3s ease;
      z-index: 10000;
    }
    
    .theme-notification.show {
      transform: translateX(0);
    }
    
    [data-theme]:not([data-theme="default"]) .theme-notification {
      background-color: var(--primary-color);
      color: var(--background-color);
    }
  `;
  document.head.appendChild(style);
  
  // Event Listeners
  document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    
    // Add key to active keys
    activeKeys.push(key);
    
    // Reset timeout
    if (keyTimeoutId) clearTimeout(keyTimeoutId);
    keyTimeoutId = setTimeout(() => {
      activeKeys = [];
    }, keyTimeout);
    
    // Check for Konami code (Arrow Up, Up, Down, Down, Left, Right, Left, Right, B, A)
    if (konamiCode.every((k, i) => activeKeys[activeKeys.length - konamiCode.length + i]?.toLowerCase() === k.toLowerCase())) {
      // Easter egg found!
      setTheme('neon'); // Konami code activates neon theme
      showHelpIndicators();
      activeKeys = [];
    }
    
    // Check for theme hotkeys
    Object.entries(themes).forEach(([themeName, themeData]) => {
      if (themeData.hotkey.length === 0) return;
      
      const lastKeys = activeKeys.slice(-themeData.hotkey.length);
      
      if (themeData.hotkey.every((k, i) => lastKeys[i] === k)) {
        setTheme(themeName);
        activeKeys = [];
      }
    });
  });
  
  // Double-tap Escape to reset theme
  let lastEscapeTime = 0;
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const now = new Date().getTime();
      
      if (now - lastEscapeTime < 500) {
        // Double-tap escape detected
        setTheme('default');
        lastEscapeTime = 0;
      } else {
        lastEscapeTime = now;
      }
    }
  });
  
  // Expose the theme switcher API globally in case we want to allow other interactions
  window.themeSwitcher = {
    setTheme,
    getCurrentTheme: () => currentTheme,
    getThemes: () => Object.keys(themes),
    showHelp: showHelpIndicators
  };
  
  // Easter egg hint - activate with certain mouse movement patterns
  let mousePatternTracker = 0;
  let mousePatternTimeout;
  
  document.addEventListener('mousemove', (event) => {
    // Check if mouse is moving in top-right corner of screen
    if (event.clientX > window.innerWidth * 0.9 && event.clientY < window.innerHeight * 0.1) {
      mousePatternTracker++;
      
      clearTimeout(mousePatternTimeout);
      mousePatternTimeout = setTimeout(() => {
        mousePatternTracker = 0;
      }, 1000);
      
      // After moving in corner for a bit, show helper
      if (mousePatternTracker > 15) {
        showHelpIndicators();
        mousePatternTracker = 0;
      }
    }
  });
})();