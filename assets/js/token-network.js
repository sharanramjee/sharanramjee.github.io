/**
 * Token Network Visualization
 * Creates the hero section token network with attention lines
 */

(function() {
  'use strict';

  // Token data
  const TOKENS = [
    { id: 'industry', label: 'Industry', icon: 'briefcase', section: '#industry', angle: 0 },
    { id: 'research', label: 'Research', icon: 'flask', section: '#research', angle: 45 },
    { id: 'publications', label: 'Publications', icon: 'file-alt', section: '#publications', angle: 90 },
    { id: 'projects', label: 'Projects', icon: 'code', section: '#projects', angle: 135 },
    { id: 'teaching', label: 'Teaching', icon: 'chalkboard-teacher', section: '#teaching', angle: 180 },
    { id: 'leadership', label: 'Leadership', icon: 'users', section: '#leadership', angle: 225 },
    { id: 'talks', label: 'Talks', icon: 'microphone', section: '#talks', angle: 270 },
    { id: 'skills', label: 'Skills', icon: 'cogs', section: '#skills', angle: 315 }
  ];

  // Configuration
  const CONFIG = {
    orbitRadius: 0.42, // Percentage of min(width, height) - pushed out more
    centerX: 0.5,
    centerY: 0.5,
    lineColors: ['pink', 'orange', 'green'],
    animationDuration: 300,
    pulseSpeed: 2000
  };

  let attentionWeights = {};
  let currentSection = null;
  let animationFrame = null;

  class TokenNetwork {
    constructor() {
      this.container = document.getElementById('hero-token-network');
      this.svg = document.getElementById('hero-token-svg');
      this.linesGroup = document.getElementById('attention-lines');
      this.labelsContainer = document.getElementById('token-labels');

      if (!this.container) return;

      this.init();
    }

    init() {
      // Initialize attention weights
      TOKENS.forEach(token => {
        attentionWeights[token.id] = 0.25;
      });

      this.positionTokens();
      this.drawAttentionLines();
      this.bindEvents();
      this.startPulseAnimation();

      // Handle resize
      window.addEventListener('resize', this.handleResize.bind(this));
    }

    positionTokens() {
      const rect = this.container.getBoundingClientRect();
      const centerX = rect.width * CONFIG.centerX;
      const centerY = rect.height * CONFIG.centerY;
      const radius = Math.min(rect.width, rect.height) * CONFIG.orbitRadius;

      TOKENS.forEach(token => {
        const button = this.labelsContainer.querySelector(`[data-section="${token.id}"]`);
        if (!button) return;

        const angleRad = (token.angle - 90) * (Math.PI / 180);
        const x = centerX + radius * Math.cos(angleRad);
        const y = centerY + radius * Math.sin(angleRad);

        // Store position for line drawing
        token.x = x;
        token.y = y;

        // Position the button (account for button size)
        const buttonRect = button.getBoundingClientRect();
        button.style.left = `${x - buttonRect.width / 2}px`;
        button.style.top = `${y - buttonRect.height / 2}px`;
      });

      // Store center position
      this.centerX = centerX;
      this.centerY = centerY;
    }

    drawAttentionLines() {
      if (!this.linesGroup) return;

      // Clear existing lines
      this.linesGroup.innerHTML = '';

      // Use viewBox coordinates (800x600)
      const centerX = 400;
      const centerY = 300;
      const rect = this.container.getBoundingClientRect();

      TOKENS.forEach((token, index) => {
        // Convert pixel position to viewBox coordinates
        const x = (token.x / rect.width) * 800;
        const y = (token.y / rect.height) * 600;
        const weight = attentionWeights[token.id] || 0.25;
        const colorIndex = index % CONFIG.lineColors.length;
        const color = CONFIG.lineColors[colorIndex];

        // Create curved line (quadratic bezier)
        const midX = (centerX + x) / 2;
        const midY = (centerY + y) / 2;
        const controlOffset = 30;

        // Perpendicular offset for curve
        const angle = Math.atan2(y - centerY, x - centerX);
        const perpAngle = angle + Math.PI / 2;
        const ctrlX = midX + controlOffset * Math.cos(perpAngle);
        const ctrlY = midY + controlOffset * Math.sin(perpAngle);

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M ${centerX} ${centerY} Q ${ctrlX} ${ctrlY} ${x} ${y}`);
        path.setAttribute('class', `attention-line attention-line--${color}`);
        path.setAttribute('data-token', token.id);
        path.style.opacity = weight;
        path.style.strokeWidth = 2 + weight * 3;

        this.linesGroup.appendChild(path);
      });
    }

    updateAttentionWeights(hoveredToken = null, activeSection = null) {
      TOKENS.forEach(token => {
        let weight = 0.25; // Base weight

        if (hoveredToken === token.id) {
          weight = 0.9;
        } else if (activeSection === token.id) {
          weight = 0.75;
        } else if (hoveredToken || activeSection) {
          weight = 0.15;
        }

        attentionWeights[token.id] = weight;

        // Update line
        const line = this.linesGroup.querySelector(`[data-token="${token.id}"]`);
        if (line) {
          line.style.opacity = weight;
          line.style.strokeWidth = 1 + weight * 3;

          if (weight > 0.5) {
            line.classList.add('attention-line--active');
          } else {
            line.classList.remove('attention-line--active');
          }
        }

        // Update button
        const button = this.labelsContainer.querySelector(`[data-section="${token.id}"]`);
        if (button) {
          if (weight > 0.5) {
            button.classList.add('attention-token--active');
          } else {
            button.classList.remove('attention-token--active');
          }
        }
      });
    }

    bindEvents() {
      // Token hover events
      const buttons = this.labelsContainer.querySelectorAll('.attention-token');
      buttons.forEach(button => {
        const sectionId = button.dataset.section;

        button.addEventListener('mouseenter', () => {
          this.updateAttentionWeights(sectionId, currentSection);
        });

        button.addEventListener('mouseleave', () => {
          this.updateAttentionWeights(null, currentSection);
        });

        button.addEventListener('click', (e) => {
          e.preventDefault();
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        });

        // Keyboard accessibility
        button.addEventListener('keypress', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const section = document.getElementById(sectionId);
            if (section) {
              section.scrollIntoView({ behavior: 'smooth' });
            }
          }
        });
      });
    }

    startPulseAnimation() {
      let phase = 0;

      const animate = () => {
        phase += 0.015;

        // Subtle pulse on base opacity
        TOKENS.forEach((token, index) => {
          if (attentionWeights[token.id] < 0.5) {
            const pulse = 0.3 + 0.1 * Math.sin(phase + index * 0.7);
            const line = this.linesGroup.querySelector(`[data-token="${token.id}"]`);
            if (line && !line.classList.contains('attention-line--active')) {
              line.style.opacity = pulse;
            }
          }
        });

        animationFrame = requestAnimationFrame(animate);
      };

      animate();
    }

    handleResize() {
      // Debounce resize
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.positionTokens();
        this.drawAttentionLines();
      }, 100);
    }

    setActiveSection(sectionId) {
      currentSection = sectionId;
      this.updateAttentionWeights(null, sectionId);
    }

    destroy() {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      window.removeEventListener('resize', this.handleResize);
    }
  }

  // Initialize when DOM is ready
  function init() {
    const network = new TokenNetwork();

    // Expose for external use
    window.TokenNetwork = network;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
