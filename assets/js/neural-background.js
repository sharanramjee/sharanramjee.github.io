/**
 * Neural Network Background
 * LiDAR-style 3D neural network architectures that morph as you scroll
 */

(function() {
  'use strict';

  // Neural network architecture point clouds
  const ARCHITECTURES = {

    // Multi-Layer Perceptron - classic vertical columns with line connections
    mlp: (count) => {
      const points = [];

      // Layers closer together so proximity-based lines connect them
      const layers = [
        { x: -0.32, neurons: 5 },   // Input layer
        { x: -0.11, neurons: 7 },   // Hidden 1
        { x: 0.11, neurons: 7 },    // Hidden 2
        { x: 0.32, neurons: 4 },    // Output layer
      ];

      const layerHeight = 0.5;

      // Pre-compute all neuron positions
      const allNeurons = [];
      layers.forEach((layer) => {
        for (let n = 0; n < layer.neurons; n++) {
          const neuronY = layer.neurons === 1
            ? 0
            : ((n / (layer.neurons - 1)) - 0.5) * layerHeight;
          allNeurons.push({ x: layer.x, y: neuronY });
        }
      });

      // All points go to neuron clusters - connections drawn as lines automatically
      for (let i = 0; i < count; i++) {
        const neuron = allNeurons[i % allNeurons.length];
        const r = Math.random() * 0.025;
        const a = Math.random() * Math.PI * 2;
        points.push({
          x: neuron.x + (Math.random() - 0.5) * 0.01,
          y: neuron.y + Math.cos(a) * r,
          z: (Math.random() - 0.5) * 0.02
        });
      }

      return points;
    },

    // Giant sphere for hero section - fills the screen
    sphere: (count) => {
      const points = [];
      const radius = 1.3; // Large radius to fill screen

      // Distribute points evenly on sphere surface using fibonacci sphere
      const goldenRatio = (1 + Math.sqrt(5)) / 2;

      for (let i = 0; i < count; i++) {
        const theta = 2 * Math.PI * i / goldenRatio;
        const phi = Math.acos(1 - 2 * (i + 0.5) / count);

        points.push({
          x: radius * Math.sin(phi) * Math.cos(theta),
          y: radius * Math.sin(phi) * Math.sin(theta),
          z: radius * Math.cos(phi) // True sphere
        });
      }

      return points;
    },

    // CNN architecture - stacked filter plates
    cnn: (count) => {
      const points = [];

      // Each layer has multiple filter plates stacked in depth
      const layers = [
        { x: -0.55, w: 0.45, h: 0.5, filters: 1 },    // Input image (single plate)
        { x: -0.3, w: 0.38, h: 0.42, filters: 3 },    // Conv1 (3 filters)
        { x: -0.05, w: 0.28, h: 0.32, filters: 4 },   // Conv2 (4 filters)
        { x: 0.18, w: 0.2, h: 0.24, filters: 5 },     // Conv3 (5 filters)
        { x: 0.38, w: 0.12, h: 0.16, filters: 4 },    // Conv4 (4 filters)
        { x: 0.55, w: 0.06, h: 0.35, filters: 1 },    // FC (single column)
      ];

      const totalFilters = layers.reduce((sum, l) => sum + l.filters, 0);
      const pointsPerFilter = Math.floor(count / totalFilters);

      layers.forEach(layer => {
        const filterSpacing = 0.06;
        const startZ = -(layer.filters - 1) * filterSpacing / 2;

        for (let f = 0; f < layer.filters; f++) {
          const filterZ = startZ + f * filterSpacing;

          // Points distributed on this filter plate (flat in z)
          for (let p = 0; p < pointsPerFilter; p++) {
            // Grid-like distribution on the plate
            const gridSize = Math.ceil(Math.sqrt(pointsPerFilter));
            const row = Math.floor(p / gridSize);
            const col = p % gridSize;

            const x = layer.x + ((col / (gridSize - 1)) - 0.5) * layer.w * 0.9;
            const y = ((row / (gridSize - 1)) - 0.5) * layer.h * 0.9;

            // Add slight noise but keep mostly flat
            points.push({
              x: x + (Math.random() - 0.5) * 0.02,
              y: y + (Math.random() - 0.5) * 0.02,
              z: filterZ + (Math.random() - 0.5) * 0.01
            });
          }
        }
      });

      return points.slice(0, count);
    },

    // Autoencoder (encoder-decoder) - vertical plates that compress then expand
    autoencoder: (count) => {
      const points = [];

      // Symmetric encoder-decoder structure - plates at each x position
      const layers = [
        { x: -0.6, h: 0.45, w: 0.35 },  // Input plate (tall)
        { x: -0.38, h: 0.35, w: 0.28 }, // Encode 1
        { x: -0.18, h: 0.25, w: 0.2 },  // Encode 2
        { x: 0.0, h: 0.12, w: 0.1 },    // Latent (bottleneck - smallest)
        { x: 0.18, h: 0.25, w: 0.2 },   // Decode 1
        { x: 0.38, h: 0.35, w: 0.28 },  // Decode 2
        { x: 0.6, h: 0.45, w: 0.35 },   // Output plate (tall)
      ];

      const pointsPerLayer = Math.floor(count * 0.85 / layers.length);

      layers.forEach(layer => {
        for (let p = 0; p < pointsPerLayer; p++) {
          // Grid distribution on vertical plate (flat in x)
          const gridSize = Math.ceil(Math.sqrt(pointsPerLayer));
          const row = Math.floor(p / gridSize);
          const col = p % gridSize;

          points.push({
            x: layer.x + (Math.random() - 0.5) * 0.015, // Very flat in x
            y: ((row / (gridSize - 1)) - 0.5) * layer.h,
            z: ((col / (gridSize - 1)) - 0.5) * layer.w
          });
        }
      });

      // Connections between adjacent layers
      while (points.length < count) {
        const layerIdx = Math.floor(Math.random() * (layers.length - 1));
        const l1 = layers[layerIdx];
        const l2 = layers[layerIdx + 1];
        const t = Math.random();
        points.push({
          x: l1.x + (l2.x - l1.x) * t,
          y: (Math.random() - 0.5) * Math.min(l1.h, l2.h) * 0.6,
          z: (Math.random() - 0.5) * Math.min(l1.w, l2.w) * 0.6
        });
      }

      return points.slice(0, count);
    },

    // GAN (Generator + Discriminator) - expanding then contracting plates
    gan: (count) => {
      const points = [];

      // Generator layers (left side) - expanding plates
      const genLayers = [
        { x: -0.55, h: 0.08, w: 0.06 },  // Noise input (small)
        { x: -0.38, h: 0.18, w: 0.14 },  // Gen layer 1
        { x: -0.2, h: 0.28, w: 0.22 },   // Gen layer 2
        { x: 0.0, h: 0.38, w: 0.3 },     // Generated output (large)
      ];

      // Discriminator layers (right side) - contracting plates
      const discLayers = [
        { x: 0.2, h: 0.38, w: 0.3 },     // Input (matches generator output)
        { x: 0.38, h: 0.28, w: 0.22 },   // Disc layer 1
        { x: 0.52, h: 0.18, w: 0.14 },   // Disc layer 2
        { x: 0.65, h: 0.08, w: 0.06 },   // Real/Fake output (small)
      ];

      const allLayers = [...genLayers, ...discLayers];
      const pointsPerLayer = Math.floor(count * 0.85 / allLayers.length);

      allLayers.forEach(layer => {
        for (let p = 0; p < pointsPerLayer; p++) {
          // Grid distribution on vertical plate (flat in x)
          const gridSize = Math.ceil(Math.sqrt(pointsPerLayer));
          const row = Math.floor(p / gridSize);
          const col = p % gridSize;

          points.push({
            x: layer.x + (Math.random() - 0.5) * 0.015, // Very flat in x
            y: ((row / (gridSize - 1)) - 0.5) * layer.h,
            z: ((col / (gridSize - 1)) - 0.5) * layer.w
          });
        }
      });

      // Connections within generator
      while (points.length < count * 0.92) {
        const layerIdx = Math.floor(Math.random() * (genLayers.length - 1));
        const l1 = genLayers[layerIdx];
        const l2 = genLayers[layerIdx + 1];
        const t = Math.random();
        points.push({
          x: l1.x + (l2.x - l1.x) * t,
          y: (Math.random() - 0.5) * l2.h * 0.5,
          z: (Math.random() - 0.5) * l2.w * 0.5
        });
      }

      // Connections within discriminator
      while (points.length < count) {
        const layerIdx = Math.floor(Math.random() * (discLayers.length - 1));
        const l1 = discLayers[layerIdx];
        const l2 = discLayers[layerIdx + 1];
        const t = Math.random();
        points.push({
          x: l1.x + (l2.x - l1.x) * t,
          y: (Math.random() - 0.5) * l1.h * 0.5,
          z: (Math.random() - 0.5) * l1.w * 0.5
        });
      }

      return points.slice(0, count);
    },

    // ResNet with skip connections - stacked conv plates with skip paths
    resnet: (count) => {
      const points = [];

      // Each residual block has 2 conv layers (plates) stacked vertically
      const blocks = [
        { x: -0.55, h: 0.32, w: 0.28 },  // Block 1
        { x: -0.2, h: 0.28, w: 0.24 },   // Block 2
        { x: 0.15, h: 0.24, w: 0.2 },    // Block 3
        { x: 0.5, h: 0.2, w: 0.16 },     // Block 4
      ];

      const pointsPerBlock = Math.floor(count * 0.7 / blocks.length);

      blocks.forEach((block, blockIdx) => {
        // Two conv layer plates per block (top and bottom)
        for (let layer = 0; layer < 2; layer++) {
          const layerY = layer === 0 ? -0.12 : 0.12;
          const pointsPerPlate = Math.floor(pointsPerBlock / 2);

          for (let p = 0; p < pointsPerPlate; p++) {
            const gridSize = Math.ceil(Math.sqrt(pointsPerPlate));
            const row = Math.floor(p / gridSize);
            const col = p % gridSize;

            points.push({
              x: block.x + (Math.random() - 0.5) * 0.015, // Flat in x
              y: layerY + ((row / (gridSize - 1)) - 0.5) * block.h * 0.35,
              z: ((col / (gridSize - 1)) - 0.5) * block.w
            });
          }
        }

        // Skip connection (arc around the block)
        if (blockIdx < blocks.length - 1) {
          const nextBlock = blocks[blockIdx + 1];
          const skipPoints = Math.floor(count * 0.04);

          for (let s = 0; s < skipPoints; s++) {
            const t = s / skipPoints;
            const arcY = 0.32 * Math.sin(t * Math.PI); // Arc over the block
            points.push({
              x: block.x + (nextBlock.x - block.x) * t,
              y: arcY,
              z: 0.18 + (Math.random() - 0.5) * 0.02
            });
          }
        }
      });

      // Internal block connections (between top and bottom plates)
      while (points.length < count) {
        const blockIdx = Math.floor(Math.random() * blocks.length);
        const block = blocks[blockIdx];
        const t = Math.random();

        points.push({
          x: block.x + (Math.random() - 0.5) * 0.01,
          y: -0.12 + t * 0.24,
          z: (Math.random() - 0.5) * block.w * 0.6
        });
      }

      return points.slice(0, count);
    },

    // LSTM/RNN with recurrent connections - vertical cell plates at each timestep
    lstm: (count) => {
      const points = [];
      const timesteps = 5;
      const pointsPerStep = Math.floor(count * 0.7 / timesteps);

      for (let t = 0; t < timesteps; t++) {
        const cellX = (t / (timesteps - 1)) * 1.2 - 0.6;

        // LSTM cell as vertical plate (flat in x)
        const cellH = 0.32;
        const cellW = 0.18;

        for (let p = 0; p < pointsPerStep; p++) {
          const gridSize = Math.ceil(Math.sqrt(pointsPerStep));
          const row = Math.floor(p / gridSize);
          const col = p % gridSize;

          points.push({
            x: cellX + (Math.random() - 0.5) * 0.015, // Flat in x
            y: ((row / (gridSize - 1)) - 0.5) * cellH,
            z: ((col / (gridSize - 1)) - 0.5) * cellW
          });
        }

        // Recurrent connection (arc to next cell)
        if (t < timesteps - 1) {
          const nextX = ((t + 1) / (timesteps - 1)) * 1.2 - 0.6;
          const loopPoints = Math.floor(count * 0.035);

          for (let l = 0; l < loopPoints; l++) {
            const lt = l / loopPoints;
            const arcY = 0.28 * Math.sin(lt * Math.PI); // Arc above
            points.push({
              x: cellX + (nextX - cellX) * lt,
              y: arcY,
              z: 0.12 + (Math.random() - 0.5) * 0.02
            });
          }
        }
      }

      // Hidden state flow (horizontal line at bottom)
      while (points.length < count) {
        const t = Math.random();
        points.push({
          x: -0.6 + t * 1.2,
          y: -0.22 + (Math.random() - 0.5) * 0.015,
          z: (Math.random() - 0.5) * 0.04
        });
      }

      return points.slice(0, count);
    },

    // U-Net architecture - feature map plates in U-shape with skip connections
    unet: (count) => {
      const points = [];

      // Encoder path (left, going down) - contracting plates
      const encoderLevels = [
        { x: -0.5, y: 0.32, h: 0.22, w: 0.18 },   // Large input
        { x: -0.32, y: 0.12, h: 0.18, w: 0.15 },  // Encode 1
        { x: -0.15, y: -0.1, h: 0.14, w: 0.12 },  // Encode 2
        { x: 0, y: -0.3, h: 0.1, w: 0.08 },       // Bottleneck (smallest)
      ];

      // Decoder path (right, going up) - expanding plates
      const decoderLevels = [
        { x: 0.15, y: -0.1, h: 0.14, w: 0.12 },   // Decode 1
        { x: 0.32, y: 0.12, h: 0.18, w: 0.15 },   // Decode 2
        { x: 0.5, y: 0.32, h: 0.22, w: 0.18 },    // Large output
      ];

      const allLevels = [...encoderLevels, ...decoderLevels];
      const pointsPerLevel = Math.floor(count * 0.7 / allLevels.length);

      allLevels.forEach(level => {
        for (let p = 0; p < pointsPerLevel; p++) {
          const gridSize = Math.ceil(Math.sqrt(pointsPerLevel));
          const row = Math.floor(p / gridSize);
          const col = p % gridSize;

          points.push({
            x: level.x + (Math.random() - 0.5) * 0.015, // Flat in x
            y: level.y + ((row / (gridSize - 1)) - 0.5) * level.h * 0.8,
            z: ((col / (gridSize - 1)) - 0.5) * level.w
          });
        }
      });

      // Skip connections (horizontal arcs)
      for (let i = 0; i < 3; i++) {
        const enc = encoderLevels[i];
        const dec = decoderLevels[2 - i];
        const skipPoints = Math.floor(count * 0.055);

        for (let s = 0; s < skipPoints; s++) {
          const t = s / skipPoints;
          const arcZ = 0.15 * Math.sin(t * Math.PI); // Arc forward in z
          points.push({
            x: enc.x + (dec.x - enc.x) * t,
            y: enc.y + (Math.random() - 0.5) * 0.02,
            z: arcZ + (Math.random() - 0.5) * 0.015
          });
        }
      }

      // Vertical connections within encoder/decoder
      while (points.length < count) {
        const side = Math.random() < 0.5 ? -1 : 1;
        const levels = side < 0 ? encoderLevels : decoderLevels;
        const idx = Math.floor(Math.random() * (levels.length - 1));
        const l1 = levels[idx];
        const l2 = levels[idx + 1];
        const t = Math.random();

        points.push({
          x: l1.x + (l2.x - l1.x) * t,
          y: l1.y + (l2.y - l1.y) * t,
          z: (Math.random() - 0.5) * 0.04
        });
      }

      return points.slice(0, count);
    },

    // Diffusion model (noise to image) - plates from noisy to clean
    diffusion: (count) => {
      const points = [];
      const steps = 6;
      const pointsPerStep = Math.floor(count / steps);

      for (let s = 0; s < steps; s++) {
        const stepX = (s / (steps - 1)) * 1.2 - 0.6;
        const noiseLevel = 1 - s / (steps - 1); // decreasing noise (1 = noisy, 0 = clean)

        // Plate dimensions (constant, noise affects point positions)
        const plateH = 0.38;
        const plateW = 0.28;

        for (let p = 0; p < pointsPerStep; p++) {
          const gridSize = Math.ceil(Math.sqrt(pointsPerStep));
          const row = Math.floor(p / gridSize);
          const col = p % gridSize;

          // Base grid position on plate
          const baseY = ((row / (gridSize - 1)) - 0.5) * plateH;
          const baseZ = ((col / (gridSize - 1)) - 0.5) * plateW;

          // Add noise based on step (more noise = more scattered from plate)
          const noiseX = (Math.random() - 0.5) * 0.12 * noiseLevel;
          const noiseY = (Math.random() - 0.5) * 0.25 * noiseLevel;
          const noiseZ = (Math.random() - 0.5) * 0.2 * noiseLevel;

          points.push({
            x: stepX + noiseX + (Math.random() - 0.5) * 0.015 * (1 - noiseLevel),
            y: baseY + noiseY,
            z: baseZ + noiseZ
          });
        }
      }

      return points.slice(0, count);
    },

    // Donut (torus)
    donut: (count) => {
      const points = [];
      const R = 0.4; // Distance from center to tube center
      const r = 0.15; // Tube radius

      // Golden angle for even distribution
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));

      for (let i = 0; i < count; i++) {
        // u goes around the tube
        const u = (i * goldenAngle) % (Math.PI * 2);
        // v goes around the torus
        const v = (i / count) * Math.PI * 2;

        // Torus parametric equations
        const x = (R + r * Math.cos(u)) * Math.cos(v);
        const y = (R + r * Math.cos(u)) * Math.sin(v);
        const z = r * Math.sin(u);

        points.push({ x, y, z });
      }

      return points;
    },

    // DNA double helix - all points distributed across structure
    dna: (count) => {
      const points = [];
      const radius = 0.25;
      const height = 0.8;
      const turns = 2.5;

      for (let i = 0; i < count; i++) {
        const t = i / count;
        const y = (t - 0.5) * height * 2;
        const baseAngle = t * Math.PI * 2 * turns;

        // Alternate between strand 1, strand 2, and rungs
        const type = i % 3;

        if (type === 0) {
          // First strand
          points.push({
            x: Math.cos(baseAngle) * radius,
            y: y,
            z: Math.sin(baseAngle) * radius
          });
        } else if (type === 1) {
          // Second strand (offset by π)
          points.push({
            x: Math.cos(baseAngle + Math.PI) * radius,
            y: y,
            z: Math.sin(baseAngle + Math.PI) * radius
          });
        } else {
          // Rung connecting the strands
          const rungPos = Math.random();
          const rungAngle = baseAngle + rungPos * Math.PI;
          points.push({
            x: Math.cos(rungAngle) * radius,
            y: y,
            z: Math.sin(rungAngle) * radius
          });
        }
      }

      return points;
    },

    // Möbius strip - evenly distributed points, tilted
    mobius: (count) => {
      const points = [];
      const radius = 0.45;
      const width = 0.15;
      const tiltAngle = Math.PI * 0.25; // Tilt 45 degrees

      // Use golden angle for even distribution along the strip
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));

      for (let i = 0; i < count; i++) {
        // Evenly distribute u around the strip using golden angle
        const u = (i * goldenAngle) % (Math.PI * 2);
        // Evenly distribute v across width
        const v = ((i / count) * 2 - 1) * 0.95;

        // Möbius strip parametric equations
        const halfU = u / 2;
        let x = (radius + v * width * Math.cos(halfU)) * Math.cos(u);
        let z = (radius + v * width * Math.cos(halfU)) * Math.sin(u);
        let y = v * width * Math.sin(halfU);

        // Tilt around x-axis
        const cosT = Math.cos(tiltAngle);
        const sinT = Math.sin(tiltAngle);
        const newY = y * cosT - z * sinT;
        const newZ = y * sinT + z * cosT;

        points.push({ x, y: newY, z: newZ });
      }

      return points;
    }
  };

  // Map sections to architectures
  const SECTION_ARCHITECTURES = {
    'hero': 'sphere',
    'industry': 'autoencoder',
    'research': 'mobius',
    'publications': 'resnet',
    'projects': 'dna',
    'teaching': 'mlp',
    'leadership': 'donut',
    'talks': 'unet',
    'skills': 'autoencoder'
  };

  class NeuralBackground {
    constructor() {
      this.canvas = null;
      this.ctx = null;
      this.nodes = [];
      this.nodeCount = 250;
      this.scrollY = 0;
      this.lastScrollY = 0;
      this.scrollVelocity = 0;
      this.mouseX = -1000;
      this.mouseY = -1000;
      this.synapses = [];
      this.connectionDistance = 60;
      this.currentArch = 'transformer';
      this.targetPositions = [];
      this.rotationY = 0;

      this.init();
    }

    init() {
      this.createCanvas();
      this.initNodes();
      this.generateArchTargets('transformer');
      this.bindEvents();
      this.animate();
    }

    createCanvas() {
      this.canvas = document.createElement('canvas');
      this.canvas.className = 'neural-background';
      this.canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        pointer-events: none;
      `;
      document.body.prepend(this.canvas);
      this.ctx = this.canvas.getContext('2d');

      window.addEventListener('mousemove', (e) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.checkNodeHover();
      });

      this.resize();
    }

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    initNodes() {
      const width = window.innerWidth;
      const height = window.innerHeight;

      for (let i = 0; i < this.nodeCount; i++) {
        this.nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random(),
          vx: 0,
          vy: 0,
          vz: 0,
          baseRadius: 1.5 + Math.random() * 2,
          lastFired: 0
        });
      }
    }

    generateArchTargets(archName) {
      const arch = ARCHITECTURES[archName] || ARCHITECTURES.mlp;
      const points3D = arch(this.nodeCount);

      this.targetPositions = points3D.map(p => ({
        x: p.x,
        y: p.y,
        z: p.z
      }));
    }

    project3Dto2D(x3d, y3d, z3d) {
      const cosR = Math.cos(this.rotationY);
      const sinR = Math.sin(this.rotationY);
      const rotatedX = x3d * cosR - z3d * sinR;
      const rotatedZ = x3d * sinR + z3d * cosR;

      const fov = 1.8;
      const depth = rotatedZ + 2.5;
      const scale = fov / depth;

      const centerX = this.canvas.width / 2;
      const centerY = this.canvas.height / 2;
      const projectionScale = Math.min(this.canvas.width, this.canvas.height) * 0.45;

      return {
        x: centerX + rotatedX * projectionScale * scale,
        y: centerY - y3d * projectionScale * scale,
        z: rotatedZ,
        scale: scale
      };
    }

    bindEvents() {
      window.addEventListener('resize', () => this.resize());

      window.addEventListener('scroll', () => {
        this.scrollY = window.scrollY;
        this.detectCurrentSection();
      });

      this.detectCurrentSection();
    }

    detectCurrentSection() {
      const sections = document.querySelectorAll('.attention-section[id]');
      const scrollPos = window.scrollY + window.innerHeight / 2;

      let newArch = 'transformer';

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          newArch = SECTION_ARCHITECTURES[id] || 'mlp';
        }
      });

      if (newArch !== this.currentArch) {
        this.currentArch = newArch;
        this.generateArchTargets(newArch);
      }
    }

    checkNodeHover() {
      const now = Date.now();
      if (this.synapses.length > 30) return;

      for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        const dx = this.mouseX - node.x;
        const dy = this.mouseY - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 40 && now - node.lastFired > 800) {
          node.lastFired = now;
          this.fireSynapse(i, 1.0, 0);
          break;
        }
      }
    }

    fireSynapse(sourceIndex, intensity, depth) {
      if (depth > 3 || intensity < 0.2) return;

      const source = this.nodes[sourceIndex];

      for (let i = 0; i < this.nodes.length; i++) {
        if (i === sourceIndex) continue;

        const target = this.nodes[i];
        const dx = target.x - source.x;
        const dy = target.y - source.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.connectionDistance * 2) {
          this.synapses.push({
            sourceIndex,
            targetIndex: i,
            progress: 0,
            speed: 0.04 + Math.random() * 0.02,
            intensity,
            depth,
            arrived: false
          });
        }
      }
    }

    updateSynapses() {
      const now = Date.now();

      for (let i = this.synapses.length - 1; i >= 0; i--) {
        const synapse = this.synapses[i];
        synapse.progress += synapse.speed;

        if (synapse.progress >= 1 && !synapse.arrived) {
          synapse.arrived = true;
          const newIntensity = synapse.intensity * 0.5;
          if (newIntensity > 0.2 && Math.random() < 0.4 && this.synapses.length < 40) {
            const targetNode = this.nodes[synapse.targetIndex];
            if (targetNode && now - targetNode.lastFired > 200) {
              targetNode.lastFired = now;
              this.fireSynapse(synapse.targetIndex, newIntensity, synapse.depth + 1);
            }
          }
        }

        if (synapse.progress > 1.1) {
          this.synapses.splice(i, 1);
        }
      }
    }

    animate() {
      this.update();
      this.updateSynapses();
      this.draw();
      requestAnimationFrame(() => this.animate());
    }

    update() {
      this.rotationY += 0.004;

      this.scrollVelocity = (this.scrollY - this.lastScrollY) * 0.1;
      this.scrollVelocity = Math.max(-10, Math.min(10, this.scrollVelocity));
      this.lastScrollY = this.scrollY;

      this.nodes.forEach((node, i) => {
        const target = this.targetPositions[i];
        if (!target) return;

        const targetScreen = this.project3Dto2D(target.x, target.y, target.z);

        const dx = targetScreen.x - node.x;
        const dy = targetScreen.y - node.y;
        const dz = target.z - node.z;

        node.vx += dx * 0.025;
        node.vy += dy * 0.025;
        node.vz += dz * 0.025;

        node.vy -= this.scrollVelocity * 0.4;

        node.vx += (Math.random() - 0.5) * 0.2;
        node.vy += (Math.random() - 0.5) * 0.2;

        node.vx *= 0.9;
        node.vy *= 0.9;
        node.vz *= 0.9;

        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        node.z = Math.max(-1, Math.min(1, node.z));
      });
    }

    getDepthColor(z, isActive) {
      const t = (z + 1) / 2;

      if (isActive) {
        return `rgb(80, 60, 45)`;
      }

      const r = Math.floor(45 + t * 55);
      const g = Math.floor(32 + t * 43);
      const b = Math.floor(22 + t * 33);

      return `rgb(${r}, ${g}, ${b})`;
    }

    draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      const time = Date.now();

      // No z-sorting - random order creates ambiguous rotation illusion
      const sortedIndices = this.nodes.map((n, i) => i);

      // Draw connections
      this.ctx.lineWidth = 1;
      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = i + 1; j < this.nodes.length; j++) {
          const nodeA = this.nodes[i];
          const nodeB = this.nodes[j];
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < this.connectionDistance) {
            const avgZ = (nodeA.z + nodeB.z) / 2;
            const opacity = (1 - dist / this.connectionDistance) * 0.2 * ((avgZ + 1) / 2 + 0.3);

            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(74, 55, 40, ${opacity})`;
            this.ctx.moveTo(nodeA.x, nodeA.y);
            this.ctx.lineTo(nodeB.x, nodeB.y);
            this.ctx.stroke();
          }
        }
      }

      // Draw synapses
      this.synapses.forEach(synapse => {
        const source = this.nodes[synapse.sourceIndex];
        const target = this.nodes[synapse.targetIndex];
        if (!source || !target) return;

        const progress = Math.min(synapse.progress, 1);
        const pulseX = source.x + (target.x - source.x) * progress;
        const pulseY = source.y + (target.y - source.y) * progress;
        const fadeOut = synapse.progress > 1 ? 1 - (synapse.progress - 1) / 0.1 : 1;
        const alpha = synapse.intensity * fadeOut;
        const size = 2.5 + synapse.intensity * 2.5;

        this.ctx.beginPath();
        this.ctx.fillStyle = `rgba(55, 40, 28, ${alpha * 0.9})`;
        this.ctx.arc(pulseX, pulseY, size, 0, Math.PI * 2);
        this.ctx.fill();
      });

      // Draw nodes
      sortedIndices.forEach(i => {
        const node = this.nodes[i];
        const timeSinceFired = time - node.lastFired;
        const isActive = timeSinceFired < 300;

        // No depth scaling - creates ambiguous rotation illusion
        const radius = node.baseRadius;
        const depthOpacity = 0.7;

        const color = this.getDepthColor(0, isActive); // Uniform color

        if (isActive) {
          const glowIntensity = 1 - (timeSinceFired / 300);
          this.ctx.beginPath();
          this.ctx.fillStyle = `rgba(55, 40, 28, ${glowIntensity * 0.25})`;
          this.ctx.arc(node.x, node.y, radius * 3, 0, Math.PI * 2);
          this.ctx.fill();
        }

        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.globalAlpha = depthOpacity;
        this.ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.globalAlpha = 1;
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new NeuralBackground());
  } else {
    new NeuralBackground();
  }
})();
