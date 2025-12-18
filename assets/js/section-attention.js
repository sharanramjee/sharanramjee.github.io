/**
 * Section Attention Visualization
 * Word-level attention lines within the same line/sentence
 * Curved parabolic lines connecting hovered word to other words
 */

(function() {
  'use strict';

  const ATTENTION_COLORS = ['#ff69b4', '#ffa500', '#7fff00'];

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
        '.experience-item__company',
        '.experience-item__role',
        '.experience-item__highlights li',
        '.publication-item__title',
        '.publication-item__venue',
        '.teaching-item__role',
        '.teaching-item__context',
        '.leadership-item__org',
        '.leadership-item__role',
        '.talk-item__title',
        '.talk-item__venue',
        '.research-item__area',
        '.project-group__query',
        '.project-group__key',
        '.project-item',
        '.skill-item__name',
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

      const text = element.textContent;
      const words = text.split(/(\s+)/);

      element.innerHTML = '';

      words.forEach((word, index) => {
        if (word.trim() === '') {
          element.appendChild(document.createTextNode(word));
        } else {
          const span = document.createElement('span');
          span.className = 'attention-word';
          span.textContent = word;
          span.dataset.wordIndex = index;

          span.addEventListener('mouseenter', () => this.handleWordHover(span));
          span.addEventListener('mouseleave', () => this.handleWordLeave());

          element.appendChild(span);
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
      path.setAttribute('stroke-width', 1 + weight * 2.5);
      path.setAttribute('stroke-opacity', 0.15 + weight * 0.25);
      path.setAttribute('stroke-linecap', 'round');

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
      background: rgba(255, 105, 180, 0.15);
    }

    .attention-word--active {
      background: rgba(255, 105, 180, 0.25) !important;
    }
  `;
  document.head.appendChild(style);

  new WordAttention();
})();
