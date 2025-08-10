document.addEventListener('DOMContentLoaded', function() {
    // --- DYNAMIC EXPERIENCE YEARS ---
    const experienceSpan = document.getElementById('experience-years');
    if (experienceSpan) {
        const startDate = new Date('2013-06-01');
        const today = new Date();
        const diffTime = Math.abs(today - startDate);
        const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
        experienceSpan.textContent = diffYears;
    }

    // --- MOBILE NAVIGATION ---
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    // Toggle the 'active' class on the nav menu when the hamburger icon is clicked
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });
    
    // Close the mobile menu when a navigation link is clicked
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
    });

    // --- BACKGROUND ANIMATION ---
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    // Function to resize the canvas to fit the window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class definition
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            // Increased size for more visibility
            this.size = Math.random() * 3 + 1.5; 
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }
        // Update particle position and size
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.size > 0.2) this.size -= 0.01;
            // Reset particle when it becomes too small
            if (this.size <= 0.2) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1.5;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
            }
        }
        // Draw the particle on the canvas
        draw() {
            ctx.fillStyle = 'rgba(100, 255, 218, 0.8)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize the particle array
    function initParticles() {
        particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();

    // The animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animate);
    }
    animate();
});
