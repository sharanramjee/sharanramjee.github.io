/**
 * Attention Visualizer - Main Controller
 * Coordinates all attention-themed visualizations
 */

(function() {
  'use strict';

  class AttentionVisualizer {
    constructor() {
      this.sectionVizs = new Map();
      this.currentSection = 'hero';
      this.initialized = false;
    }

    init() {
      if (this.initialized) return;

      this.setupSmoothScroll();
      this.setupKeyboardNav();
      this.logEasterEgg();

      this.initialized = true;
      console.log('%c Attention mechanism initialized', 'color: #ff69b4; font-weight: bold;');
    }

    setupSmoothScroll() {
      // Enable smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const href = anchor.getAttribute('href');
          if (href === '#') return;

          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    }

    setupKeyboardNav() {
      // j/k navigation like Vim
      const sections = [
        'hero', 'industry', 'research', 'publications',
        'projects', 'teaching', 'leadership', 'talks', 'skills'
      ];

      document.addEventListener('keydown', (e) => {
        // Don't interfere with input fields
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
          return;
        }

        const currentIndex = sections.indexOf(this.currentSection);

        if (e.key === 'j' || e.key === 'ArrowDown') {
          // Next section
          const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
          this.navigateToSection(sections[nextIndex]);
        } else if (e.key === 'k' || e.key === 'ArrowUp') {
          // Previous section
          const prevIndex = Math.max(currentIndex - 1, 0);
          this.navigateToSection(sections[prevIndex]);
        } else if (e.key === 'g') {
          // Go to top
          this.navigateToSection('hero');
        } else if (e.key === 'G') {
          // Go to bottom
          this.navigateToSection('skills');
        }
      });
    }

    navigateToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        this.currentSection = sectionId;
      }
    }

    setCurrentSection(sectionId) {
      this.currentSection = sectionId;
    }

    logEasterEgg() {
      // Fun console message for ML folks
      console.log(`
%c    _   _   _             _   _
%c   / \\ | |_| |_ ___ _ __ | |_(_) ___  _ __
%c  / _ \\| __| __/ _ \\ '_ \\| __| |/ _ \\| '_ \\
%c / ___ \\ |_| ||  __/ | | | |_| | (_) | | | |
%c/_/   \\_\\__|\\__\\___|_| |_|\\__|_|\\___/|_| |_|
      `,
      'color: #ff69b4',
      'color: #ff8c00',
      'color: #ffa500',
      'color: #90ee90',
      'color: #7fff00'
      );

      console.log('%c softmax(Q @ K.T / sqrt(d_k)) @ V', 'color: #888; font-style: italic;');
      console.log('%c KL divergence minimized. Model converged.', 'color: #7fff00;');
      console.log('%c Use j/k to navigate sections (Vim style)', 'color: #888;');
    }

    // Temperature easter egg - affects animation speed
    setTemperature(temp) {
      document.documentElement.style.setProperty('--attention-temp', temp);

      // Adjust animation speeds
      const duration = 800 / temp;
      document.documentElement.style.setProperty('--animation-duration', `${duration}ms`);

      console.log(`%c Temperature set to ${temp}`, 'color: #ffa500;');

      if (temp > 1.5) {
        console.log('%c High temperature: increased randomness in attention', 'color: #ff6b6b;');
      } else if (temp < 0.5) {
        console.log('%c Low temperature: sharper attention distribution', 'color: #4ecdc4;');
      }
    }
  }

  // Initialize
  function init() {
    const visualizer = new AttentionVisualizer();
    visualizer.init();

    // Expose globally
    window.AttentionVisualizer = visualizer;

    // Easter egg: temperature control via URL param
    const urlParams = new URLSearchParams(window.location.search);
    const temp = parseFloat(urlParams.get('temperature'));
    if (!isNaN(temp) && temp > 0) {
      visualizer.setTemperature(temp);
    }

    // Easter egg: expose temperature function
    window.setTemperature = (t) => visualizer.setTemperature(t);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
