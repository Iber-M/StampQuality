/**
 * Industrial Quality Scanner Effect
 * Renders a technical grid that responds to mouse proximity, simulating an inspection tool.
 */

const canvas = document.getElementById('inspection-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let mouse = { x: -1000, y: -1000 };
let nodes = [];
const GRID_SPACING = 80;
const CONNECTION_DIST = 150;
const MOUSE_RADIUS = 250;

// Industrial Palette
const COLORS = {
    bg: '#0B0C10',
    line: 'rgba(197, 198, 199, 0.05)',   // Very faint silver
    activeLine: 'rgba(158, 66, 68, 0.4)',  // Burgundy
    node: 'rgba(197, 198, 199, 0.3)',      // Silver
    activeNode: '#9E4244',                 // Bright Burgundy
    glow: 'rgba(114, 47, 55, 0.6)'         // Glow
};

class Node {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.size = 2;
        this.active = false;
    }

    draw() {
        // Calculate distance to mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let alpha = 0.3;
        let color = COLORS.node;
        let size = this.size;

        if (dist < MOUSE_RADIUS) {
            const intensity = 1 - (dist / MOUSE_RADIUS);
            alpha = 0.3 + (intensity * 0.7);
            color = COLORS.activeNode;
            size = this.size * (1 + intensity * 1.5);
            this.active = true;
            
            // Draw glow
            ctx.beginPath();
            ctx.arc(this.x, this.y, size * 2, 0, Math.PI * 2);
            ctx.fillStyle = COLORS.glow;
            ctx.fill();
        } else {
            this.active = false;
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }
}

function init() {
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    
    // Auto-scan animation when idle
    animate();
}

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight; // Full screen to cover hero
    createGrid();
}

function createGrid() {
    nodes = [];
    for (let x = 0; x < width + GRID_SPACING; x += GRID_SPACING) {
        for (let y = 0; y < height + GRID_SPACING; y += GRID_SPACING) {
            // Add some jitter for "organic" industrial feel or keep strict for "precision"
            // Keeping strict for precision
            nodes.push(new Node(x, y));
        }
    }
}

function drawConnections() {
    // Draw static grid lines first (horizontal and vertical) - Background Layer
    ctx.strokeStyle = COLORS.line;
    ctx.lineWidth = 1;

    // We can just iterate nodes relative to grid, but let's do a simple proximity check 
    // optimized for the grid structure if we wanted perfect lines. 
    // However, the "scanner" look often benefits from checking neighbors.
    
    // For performance, let's just draw the active connections near mouse dynamically
    // and draw the static grid once or clear/redraw.
    
    // Redraw loop
    nodes.forEach(node => {
        node.draw();
        
        // Find neighbors to connect active nodes
        if (node.active) {
            nodes.forEach(neighbor => {
                const dx = node.x - neighbor.x;
                const dy = node.y - neighbor.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < GRID_SPACING * 1.5) { // Connect immediate neighbors
                   
                    const mouseDx = mouse.x - ((node.x + neighbor.x) / 2);
                    const mouseDy = mouse.y - ((node.y + neighbor.y) / 2);
                    const mouseDist = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
                    
                    if (mouseDist < MOUSE_RADIUS) {
                        const intensity = 1 - (mouseDist / MOUSE_RADIUS);
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(neighbor.x, neighbor.y);
                        ctx.strokeStyle = `rgba(158, 66, 68, ${intensity * 0.8})`;
                        ctx.stroke();
                    }
                }
            });
        }
    });
}

function drawStaticGrid() {
    ctx.beginPath();
    ctx.strokeStyle = COLORS.line;
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x <= width; x += GRID_SPACING) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
    }
    // Horizontal lines
    for (let y = 0; y <= height; y += GRID_SPACING) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
    }
    ctx.stroke();
}

function animate() {
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, width, height);

    drawStaticGrid();
    drawConnections();

    requestAnimationFrame(animate);
}

// Start
document.addEventListener('DOMContentLoaded', init);
