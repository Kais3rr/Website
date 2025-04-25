// RainEffect.js - Creates a responsive rain effect that follows mouse movement
class RainEffect {
    constructor() {
        console.log("Initializing Rain Effect"); // Debug log
        
        // Get the existing canvas element
        this.canvas = document.getElementById('rain-canvas');
        if (!this.canvas) {
            console.error("Rain canvas element not found!");
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        
        // Rain properties
        this.drops = [];
        this.maxDrops = 250; // Reduced number of raindrops
        this.dropLength = 30; // Shorter rain drops
        this.dropWidth = 2; // Thinner rain drops
        this.dropColor = 'rgba(255, 255, 255, 0.7)'; // Slightly transparent white rain
        this.speed = 15; // Slower falling speed
        
        // Track mouse for angle control
        this.mouseX = window.innerWidth / 2;
        this.mouseY = window.innerHeight / 2;
        this.maxTilt = 1.2; // Increased maximum angle of tilt (radians) for more dramatic effect
        this.angle = 0; // Current rain angle
        
        // Initialize
        this.resize();
        this.createDrops();
        this.setupListeners();
        this.animate();
        
        console.log("Rain Effect initialized"); // Debug log
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }
    
    createDrops() {
        this.drops = [];
        for (let i = 0; i < this.maxDrops; i++) {
            this.drops.push({
                x: Math.random() * this.width * 1.5 - this.width * 0.25,
                y: Math.random() * this.height,
                length: this.dropLength + Math.random() * 10,
                speed: this.speed + Math.random() * 5
            });
        }
    }
    
    setupListeners() {
        // Track mouse movement
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            // Calculate rain angle based on mouse position
            // Map mouse X position to angle range
            const xRatio = this.mouseX / this.width;
            this.angle = (xRatio - 0.5) * this.maxTilt;
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.resize();
            this.createDrops();
        });
    }
    
    updateDrops() {
        for (let i = 0; i < this.drops.length; i++) {
            const drop = this.drops[i];
            
            // Update position with speed and angle
            drop.y += drop.speed;
            drop.x += drop.speed * Math.sin(this.angle);
            
            // Reset drops that go off-screen
            if (drop.y > this.height) {
                drop.y = -drop.length;
                drop.x = Math.random() * this.width * 1.5 - this.width * 0.25;
            }
            if (drop.x > this.width + drop.length) {
                drop.x = -drop.length;
            } else if (drop.x < -drop.length) {
                drop.x = this.width + drop.length;
            }
        }
    }
    
    drawDrops() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // No background overlay for maximum transparency
        
        // More visible rain effect
        for (let i = 0; i < this.drops.length; i++) {
            const drop = this.drops[i];
            
            // Draw each raindrop as its own path for better visibility
            this.ctx.beginPath();
            
            // Draw the raindrop line at the current angle
            const endX = drop.x + Math.sin(this.angle) * drop.length;
            const endY = drop.y + Math.cos(this.angle) * drop.length;
            
            // Draw with line and glow effect for better visibility
            this.ctx.moveTo(drop.x, drop.y);
            this.ctx.lineTo(endX, endY);
            
            // Make raindrops very transparent for a subtle effect
            const opacity = 0.2 + Math.random() * 0.2; // Much lower opacity
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            this.ctx.lineWidth = this.dropWidth + (Math.random() > 0.95 ? 1 : 0); // Even fewer thick drops
            
            // Remove glow effect for more transparency
            this.ctx.shadowColor = 'transparent';
            this.ctx.shadowBlur = 0;
            
            this.ctx.stroke();
            this.ctx.shadowBlur = 0; // Reset shadow for next drop
        }
    }
    
    animate() {
        this.updateDrops();
        this.drawDrops();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize the rain effect when the page loads
window.addEventListener('load', () => {
    new RainEffect();
});