/**
 * Graph Animation for Hero Section
 * Creates an animated 2D connected graph with randomly moving balls and connecting lines
 */

class GraphAnimation {
    constructor(containerId, options = {}) {
        // Get the container element
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error(`Container with ID '${containerId}' not found`);
            return;
        }

        // Set default options
        this.options = {
            particleCount: options.particleCount || 20,
            particleSize: options.particleSize || 3,
            particleColor: options.particleColor || 'rgba(255, 138, 101, 0.7)',
            lineColor: options.lineColor || 'rgba(255, 138, 101, 0.2)',
            lineWidth: options.lineWidth || 1,
            speed: options.speed || 1,
            connectionDistance: options.connectionDistance || 150,
            responsive: options.responsive !== undefined ? options.responsive : true
        };

        // Create canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'graph-animation';
        this.ctx = this.canvas.getContext('2d');

        // Set canvas styles
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '0';
        this.canvas.style.pointerEvents = 'none'; // Make sure it doesn't interfere with clicks
        this.canvas.style.filter = 'blur(2px)'; // Add blurry glass effect
        this.canvas.style.opacity = '0.7'; // Slightly transparent to enhance background effect

        // Add canvas to container
        this.container.style.position = 'relative';
        this.container.insertBefore(this.canvas, this.container.firstChild);

        // Initialize particles
        this.particles = [];
        this.animationFrameId = null;
        this.resizeTimeout = null;

        // Initialize
        this.init();
    }

    init() {
        // Set canvas size
        this.setCanvasSize();

        // Create particles
        this.createParticles();

        // Start animation
        this.animate();

        // Add resize event listener
        if (this.options.responsive) {
            window.addEventListener('resize', () => {
                // Debounce resize event
                clearTimeout(this.resizeTimeout);
                this.resizeTimeout = setTimeout(() => {
                    this.setCanvasSize();
                }, 250);
            });
        }
    }

    setCanvasSize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    createParticles() {
        this.particles = [];
        const baseColor = this.options.particleColor.replace('rgba(', '').replace(')', '');
        const colorParts = baseColor.split(',');
        const r = parseInt(colorParts[0]);
        const g = parseInt(colorParts[1]);
        const b = parseInt(colorParts[2]);
        
        for (let i = 0; i < this.options.particleCount; i++) {
            // Create particles with slight variations in size and color
            const sizeVariation = Math.random() * 0.5 + 0.7; // 0.7 to 1.2 multiplier
            const opacityVariation = Math.random() * 0.3 + 0.3; // 0.3 to 0.6 opacity
            
            // Slight color variation for more visual interest
            const colorVariation = 15; // Max RGB variation
            const rVar = r + Math.floor(Math.random() * colorVariation * 2) - colorVariation;
            const gVar = g + Math.floor(Math.random() * colorVariation * 2) - colorVariation;
            const bVar = b + Math.floor(Math.random() * colorVariation * 2) - colorVariation;
            
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.options.speed,
                vy: (Math.random() - 0.5) * this.options.speed,
                size: this.options.particleSize * sizeVariation,
                color: `rgba(${rVar}, ${gVar}, ${bVar}, ${opacityVariation})`,
                pulseSpeed: Math.random() * 0.02 + 0.01, // For size pulsing effect
                pulseDirection: Math.random() > 0.5 ? 1 : -1, // Direction of pulse
                pulseFactor: 0 // Current pulse state (0 to 1)
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.updateParticles();
        this.drawConnections();
        this.drawParticles();

        // Request next frame
        this.animationFrameId = requestAnimationFrame(() => this.animate());
    }

    updateParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx = -particle.vx;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy = -particle.vy;
            }
            
            // Update pulse effect
            particle.pulseFactor += particle.pulseSpeed * particle.pulseDirection;
            if (particle.pulseFactor > 1) {
                particle.pulseFactor = 1;
                particle.pulseDirection = -1;
            } else if (particle.pulseFactor < 0) {
                particle.pulseFactor = 0;
                particle.pulseDirection = 1;
            }
        });
    }

    drawParticles() {
        this.particles.forEach(particle => {
            // Calculate pulsing size
            const pulseAmount = 0.3; // Maximum 30% size change
            const currentSize = particle.size * (1 + (pulseAmount * particle.pulseFactor));
            
            // Draw particle with glow effect
            this.ctx.beginPath();
            
            // Add subtle glow
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, currentSize * 2
            );
            
            // Extract color components for glow
            const colorMatch = particle.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]+)?\)/);
            if (colorMatch) {
                const r = colorMatch[1];
                const g = colorMatch[2];
                const b = colorMatch[3];
                const a = colorMatch[4] || 1;
                
                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${a})`);
                gradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${a * 0.3})`);
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
                
                // Draw glow
                this.ctx.arc(particle.x, particle.y, currentSize * 2, 0, Math.PI * 2);
                this.ctx.fillStyle = gradient;
                this.ctx.fill();
            }
            
            // Draw actual particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
        });
    }

    drawConnections() {
        // Create a layered effect with multiple connection distances
        const primaryDistance = this.options.connectionDistance;
        const secondaryDistance = primaryDistance * 0.7;
        
        // Draw secondary connections (thinner, more transparent)
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < primaryDistance) {
                    // Calculate opacity based on distance
                    const opacity = 0.8 * (1 - (distance / primaryDistance));
                    
                    // Draw line with gradient for more depth
                    const gradient = this.ctx.createLinearGradient(
                        this.particles[i].x, this.particles[i].y,
                        this.particles[j].x, this.particles[j].y
                    );
                    
                    const baseColor = this.options.lineColor.replace('rgba(', '').replace(')', '');
                    const colorParts = baseColor.split(',');
                    
                    gradient.addColorStop(0, `rgba(${colorParts[0]},${colorParts[1]},${colorParts[2]},${opacity * 1.2})`);
                    gradient.addColorStop(0.5, `rgba(${colorParts[0]},${colorParts[1]},${colorParts[2]},${opacity * 0.7})`);
                    gradient.addColorStop(1, `rgba(${colorParts[0]},${colorParts[1]},${colorParts[2]},${opacity * 1.2})`);
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = gradient;
                    this.ctx.lineWidth = this.options.lineWidth * (distance < secondaryDistance ? 1.2 : 0.8);
                    this.ctx.stroke();
                }
            }
        }
    }

    // Public methods
    start() {
        if (!this.animationFrameId) {
            this.animate();
        }
    }

    stop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    resize() {
        this.setCanvasSize();
    }

    updateOptions(newOptions) {
        this.options = { ...this.options, ...newOptions };
        this.createParticles();
    }
}

// Initialize the graph animation when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create graph animation in the introduction section
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Use darker colors for light mode, original colors for dark mode
    const graphAnimation = new GraphAnimation('introduction', {
        particleCount: 80,
        particleSize: 1.5,
        particleColor: isDarkMode ? 'rgba(255, 138, 101, 0.5)' : 'rgba(44, 62, 80, 0.7)', // Dark blue in light mode
        lineColor: isDarkMode ? 'rgba(255, 138, 101, 0.12)' : 'rgba(44, 62, 80, 0.25)', // Darker connections in light mode
        connectionDistance: 150,
        speed: 0.4
    });
    
    // Update colors when theme changes
    document.addEventListener('themeChanged', (e) => {
        const isDark = e.detail.isDarkMode;
        graphAnimation.updateOptions({
            particleColor: isDark ? 'rgba(255, 138, 101, 0.5)' : 'rgba(44, 62, 80, 0.7)',
            lineColor: isDark ? 'rgba(255, 138, 101, 0.12)' : 'rgba(44, 62, 80, 0.25)'
        });
    });
});