/**
 * Navigation with Momentum Scrolling
 * Smooth scroll with inertia/momentum effect
 */

(function() {
  'use strict';

  const sections = document.querySelectorAll('.attention-section[id]');
  const navLinks = document.querySelectorAll('.attention-nav__link');
  const navOffset = 70;

  // Easing function for momentum effect (ease-out with overshoot)
  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  // Easing with slight overshoot for inertia feel
  function easeOutBack(t) {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }

  // Custom smooth scroll with momentum
  function smoothScrollTo(targetY, duration = 1000) {
    const startY = window.scrollY;
    const difference = targetY - startY;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Use easeOutExpo for smooth deceleration (momentum feel)
      const easedProgress = easeOutExpo(progress);

      window.scrollTo(0, startY + difference * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // Handle nav link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const targetY = targetSection.offsetTop - navOffset;
        const distance = Math.abs(targetY - window.scrollY);

        // Duration based on distance (longer for further scrolls)
        const duration = Math.min(800 + distance * 0.3, 1500);

        smoothScrollTo(targetY, duration);
      }
    });
  });

  // Also handle logo click
  const logo = document.querySelector('.attention-nav__logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScrollTo(0, 800);
    });
  }

  // Highlight active nav based on scroll
  function highlightNav() {
    const scrollPos = window.scrollY + 150;

    let currentSection = '';

    sections.forEach(section => {
      const top = section.offsetTop - navOffset;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('attention-nav__link--active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('attention-nav__link--active');
      }
    });
  }

  // Throttle scroll handler for performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        highlightNav();
        ticking = false;
      });
      ticking = true;
    }
  });

  highlightNav();
})();
