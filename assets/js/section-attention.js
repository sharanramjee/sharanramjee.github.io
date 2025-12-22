/**
 * Section Attention Visualization
 * Word-level attention lines within the same line/sentence
 * Curved parabolic lines connecting hovered word to other words
 */

(function() {
  'use strict';

  // Vintage sepia/brown colors for treasure map look
  const ATTENTION_COLORS = ['#8b7355', '#6b5344', '#4a3728'];

  class WordAttention {
    constructor() {
      this.svg = null;
      this.currentHovered = null;
      this.init();
    }

    init() {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.setup());
      } else {
        this.setup();
      }
    }

    setup() {
      this.createGlobalSVG();
      this.processContentSections();

      window.addEventListener('resize', () => this.clearLines());
      window.addEventListener('scroll', () => {
        if (this.currentHovered) {
          this.drawAttentionLines(this.currentHovered);
        }
      });
    }

    createGlobalSVG() {
      this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      this.svg.setAttribute('class', 'word-attention-svg');
      this.svg.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: visible;
      `;
      document.body.appendChild(this.svg);
    }

    processContentSections() {
      const selectors = [
        '.experience-company__name',
        '.experience-position__role',
        '.experience-position__highlights li',
        '.experience-position__tech-items',
        '.publication-title',
        '.publication-venue',
        '.award-item__title',
        '.award-item__org',
        '.project-item__title',
        '.project-item__type',
        '.patent-title',
        '.hero__blurb p'
      ];

      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
          this.wrapWordsInSpans(element);
        });
      });
    }

    wrapWordsInSpans(element) {
      if (element.dataset.wordsProcessed) return;
      element.dataset.wordsProcessed = 'true';

      let wordIndex = 0;
      this.processNode(element, wordIndex);
    }

    processNode(element, wordIndex) {
      const childNodes = Array.from(element.childNodes);

      childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent;
          const words = text.split(/(\s+)/);

          const fragment = document.createDocumentFragment();
          words.forEach(word => {
            if (word.trim() === '') {
              fragment.appendChild(document.createTextNode(word));
            } else {
              const span = document.createElement('span');
              span.className = 'attention-word';
              span.textContent = word;
              span.dataset.wordIndex = wordIndex++;

              span.addEventListener('mouseenter', () => this.handleWordHover(span));
              span.addEventListener('mouseleave', () => this.handleWordLeave());

              fragment.appendChild(span);
            }
          });

          node.parentNode.replaceChild(fragment, node);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          // Recursively process child elements (like <strong>)
          this.processNode(node, wordIndex);
        }
      });
    }

    handleWordHover(hoveredWord) {
      this.currentHovered = hoveredWord;
      hoveredWord.classList.add('attention-word--active');
      this.drawAttentionLines(hoveredWord);
    }

    handleWordLeave() {
      if (this.currentHovered) {
        this.currentHovered.classList.remove('attention-word--active');
      }
      this.currentHovered = null;
      this.clearLines();
    }

    drawAttentionLines(hoveredWord) {
      this.clearLines();

      const hoveredRect = hoveredWord.getBoundingClientRect();
      const hoveredX = hoveredRect.left + hoveredRect.width / 2;
      const hoveredY = hoveredRect.top;

      const lineElement = hoveredWord.parentElement;
      const wordsInLine = lineElement.querySelectorAll('.attention-word');

      wordsInLine.forEach((word, index) => {
        if (word === hoveredWord) return;

        const wordRect = word.getBoundingClientRect();
        const wordX = wordRect.left + wordRect.width / 2;
        const wordY = wordRect.top;

        const distance = Math.abs(wordX - hoveredX);
        const maxDist = 400;
        const baseWeight = Math.max(0.2, 1 - (distance / maxDist));
        const weight = baseWeight * (0.6 + Math.random() * 0.4);

        const colorIndex = index % ATTENTION_COLORS.length;
        const color = ATTENTION_COLORS[colorIndex];

        this.drawParabola(hoveredX, hoveredY, wordX, wordY, weight, color);
      });
    }

    drawParabola(x1, y1, x2, y2, weight, color) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

      const midX = (x1 + x2) / 2;
      const distance = Math.abs(x2 - x1);

      // Curve goes upward (above the text)
      const curveHeight = Math.min(distance * 0.4, 60) + 15;
      const ctrlY = Math.min(y1, y2) - curveHeight;

      const d = `M ${x1} ${y1} Q ${midX} ${ctrlY} ${x2} ${y2}`;

      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', color);
      path.setAttribute('stroke-width', 1.5 + weight * 2);
      path.setAttribute('stroke-opacity', 0.4 + weight * 0.4);
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-dasharray', '4, 6'); // Dotted line like treasure map

      this.svg.appendChild(path);
    }

    clearLines() {
      while (this.svg.firstChild) {
        this.svg.removeChild(this.svg.firstChild);
      }
    }
  }

  // Add CSS for word spans
  const style = document.createElement('style');
  style.textContent = `
    .attention-word {
      cursor: pointer;
      transition: all 0.15s ease;
      border-radius: 2px;
      padding: 0 1px;
    }

    .attention-word:hover {
      background: rgba(74, 55, 40, 0.12);
    }

    .attention-word--active {
      background: rgba(74, 55, 40, 0.2) !important;
    }
  `;
  document.head.appendChild(style);

  new WordAttention();
})();
