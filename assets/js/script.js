// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Typewriter Effect
const texts = [
    "Cybersecurity Enthusiast",
    "Python Django Developer",
    "Ethical Hacker",
    "Threat Intelligence Analyst",
    "Security Researcher"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedTextElement = document.querySelector('.typed-text');
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenTexts = 2000;

function typeWriter() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeWriter, 500);
        } else {
            setTimeout(typeWriter, deletingSpeed);
        }
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeWriter, delayBetweenTexts);
        } else {
            setTimeout(typeWriter, typingSpeed);
        }
    }
}

// Start typewriter effect
typeWriter();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// (AOS already initialized above)

// Project Filtering Logic
document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-filter');
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    document.querySelectorAll('.portfolio-item').forEach(item => {
      if (filter === 'all' || item.classList.contains(filter)) {
        item.style.display = 'block';
        item.classList.add('aos-animate');
      } else {
        item.style.display = 'none';
        item.classList.remove('aos-animate');
      }
    });
  });
});


// Navbar scroll effect
// Consolidated scroll handling for performance: navbar style, active nav highlighting, and back-to-top toggle
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const backToTopBtn = document.getElementById('backToTop');

function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

function highlightActiveNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href') || '';
        if (current && href.includes(current)) {
            link.classList.add('active');
        }
    });
}

function toggleBackToTop() {
    if (!backToTopBtn) return;
    backToTopBtn.style.display = (window.scrollY > 300) ? 'flex' : 'none';
}

function handleScroll() {
    updateNavbar();
    highlightActiveNav();
    toggleBackToTop();
}

window.addEventListener('scroll', handleScroll);

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        // Create animated success message
        const successMessage = document.createElement('div');
        successMessage.innerHTML = `
            <div class="alert alert-success" style="
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                border: none;
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(40, 167, 69, 0.3);
                animation: slideInRight 0.5s ease-out;
            ">
                <i class="fas fa-check-circle me-2"></i>
                Message sent successfully! I'll get back to you soon.
            </div>
        `;
        document.body.appendChild(successMessage);

        setTimeout(() => {
            successMessage.remove();
        }, 5000);

        this.reset();
    }
});
function downloadResume() {
    const link = document.createElement('a');
    link.href = 'https://raw.githubusercontent.com/anurag-rvnkr1/anurag-rvnkr/main/assets/resume/Anurag-Rvnkr-Resume.pdf'; // Corrected RAW GitHub URL
    link.download = 'Anurag-Rvnkr-Resume.pdf';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

        
// Add animation keyframes for success message
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Email validation
document.getElementById('email').addEventListener('blur', function () {
    const email = this.value;
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

    if (email && !emailRegex.test(email)) {
        this.style.borderColor = 'var(--primary-color)';
        this.style.boxShadow = '0 0 0 0.2rem rgba(255, 0, 64, 0.25)';
    } else {
        this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        this.style.boxShadow = 'none';
    }
});

// Add loading animation
window.addEventListener('load', function () {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Matrix Rain Effect
const canvas = document.querySelector('.matrix-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
const matrixArray = matrix.split("");

const fontSize = 10;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }

        // Also animate particles each frame so both effects run together on the same canvas/context
        if (typeof animateParticles === 'function') animateParticles();
    }

    setInterval(drawMatrix, 35);

// Particles Animation
class Particle {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = Math.random() > 0.5 ? '#00ff41' : '#ff0040';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > window.innerWidth) this.x = 0;
        if (this.x < 0) this.x = window.innerWidth;
        if (this.y > window.innerHeight) this.y = 0;
        if (this.y < 0) this.y = window.innerHeight;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = [];
for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
}


// Mapping of portfolio classes -> card IDs
const projectMap = {
"cyber": "project1-card",    // SafeGuard
"vault": "project2-card",    // Secure Vault
"linksnip": "project3-card", // LinkSnip
"hospital": "project4-card"  // Smart Hospital Management System
};

// Attach click events dynamically
Object.keys(projectMap).forEach(cls => {
const item = document.querySelector(`.portfolio-item.${cls}`);
const cardId = projectMap[cls];
const card = document.getElementById(cardId);

if (item && card) {
    // Open on portfolio click
    item.addEventListener("click", e => {
    e.preventDefault();
    card.classList.add("show");
    });

    // Close on close-btn
    card.querySelector(".close-btn").addEventListener("click", () => {
    card.classList.remove("show");
    });

    // Close on background click
    card.addEventListener("click", e => {
    if (e.target === card) card.classList.remove("show");
    });
}
});
