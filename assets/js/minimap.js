/**
 * Attention Minimap Navigation
 * Corner navigation that syncs with scroll position
 */

(function() {
  'use strict';

  const SECTIONS = [
    { id: 'hero', label: 'Home' },
    { id: 'industry', label: 'Industry' },
    { id: 'research', label: 'Research' },
    { id: 'publications', label: 'Publications' },
    { id: 'projects', label: 'Projects' },
    { id: 'teaching', label: 'Teaching' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'talks', label: 'Talks' },
    { id: 'skills', label: 'Skills' }
  ];

  class AttentionMinimap {
    constructor() {
      this.container = document.getElementById('attention-minimap');
      this.nodesGroup = document.getElementById('minimap-nodes');
      this.connectionsGroup = document.getElementById('minimap-connections');
      this.tooltip = document.getElementById('minimap-tooltip');

      if (!this.container) return;

      this.currentSection = 'hero';
      this.observer = null;

      this.init();
    }

    init() {
      this.drawConnections();
      this.bindEvents();
      this.setupIntersectionObserver();
      this.updateVisibility();
    }

    drawConnections() {
      if (!this.connectionsGroup) return;

      // Draw lines from center to each node
      const nodes = this.nodesGroup.querySelectorAll('.attention-minimap__node');

      nodes.forEach(node => {
        const cx = parseFloat(node.getAttribute('cx'));
        const cy = parseFloat(node.getAttribute('cy'));

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', '50');
        line.setAttribute('y1', '50');
        line.setAttribute('x2', cx);
        line.setAttribute('y2', cy);
        line.setAttribute('data-section', node.dataset.section);

        this.connectionsGroup.appendChild(line);
      });
    }

    bindEvents() {
      // Node click events
      const nodes = this.nodesGroup.querySelectorAll('.attention-minimap__node');

      nodes.forEach(node => {
        const sectionId = node.dataset.section;

        node.addEventListener('click', (e) => {
          e.stopPropagation();
          this.navigateToSection(sectionId);
        });

        node.addEventListener('mouseenter', () => {
          this.showTooltip(sectionId);
        });

        node.addEventListener('mouseleave', () => {
          this.hideTooltip();
        });
      });

      // Center click goes to hero
      const center = this.container.querySelector('.attention-minimap__center');
      if (center) {
        center.addEventListener('click', (e) => {
          e.stopPropagation();
          this.navigateToSection('hero');
        });
      }

      // Container click (fallback)
      this.container.addEventListener('click', () => {
        // Could expand minimap on mobile
      });

      // Keyboard navigation
      this.container.setAttribute('tabindex', '0');
      this.container.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.toggleExpanded();
        }
      });
    }

    setupIntersectionObserver() {
      const options = {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.setActiveSection(entry.target.id);
          }
        });
      }, options);

      // Observe all sections
      SECTIONS.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          this.observer.observe(element);
        }
      });
    }

    setActiveSection(sectionId) {
      if (this.currentSection === sectionId) return;

      this.currentSection = sectionId;

      // Update node states
      const nodes = this.nodesGroup.querySelectorAll('.attention-minimap__node');
      nodes.forEach(node => {
        if (node.dataset.section === sectionId) {
          node.classList.add('attention-minimap__node--active');
        } else {
          node.classList.remove('attention-minimap__node--active');
        }
      });

      // Update connection lines
      const lines = this.connectionsGroup.querySelectorAll('line');
      lines.forEach(line => {
        if (line.dataset.section === sectionId) {
          line.classList.add('active');
        } else {
          line.classList.remove('active');
        }
      });

      // Update token network if available
      if (window.TokenNetwork && window.TokenNetwork.setActiveSection) {
        window.TokenNetwork.setActiveSection(sectionId);
      }

      // Update visibility
      this.updateVisibility();
    }

    updateVisibility() {
      // Hide minimap on hero, show elsewhere
      if (this.currentSection === 'hero') {
        this.container.classList.add('attention-minimap--hidden');
      } else {
        this.container.classList.remove('attention-minimap--hidden');
      }
    }

    navigateToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }

    showTooltip(sectionId) {
      const section = SECTIONS.find(s => s.id === sectionId);
      if (section && this.tooltip) {
        this.tooltip.textContent = section.label;
        this.tooltip.style.opacity = '1';
        this.tooltip.style.visibility = 'visible';
      }
    }

    hideTooltip() {
      if (this.tooltip) {
        this.tooltip.style.opacity = '0';
        this.tooltip.style.visibility = 'hidden';
      }
    }

    toggleExpanded() {
      this.container.classList.toggle('attention-minimap--expanded');
    }

    destroy() {
      if (this.observer) {
        this.observer.disconnect();
      }
    }
  }

  // Initialize when DOM is ready
  function init() {
    const minimap = new AttentionMinimap();

    // Expose for external use
    window.AttentionMinimap = minimap;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
