// Boot Sequence Logic
const bootSequence = () => {
    const bootText = document.getElementById('boot-text');
    const bootLoader = document.getElementById('boot-loader');
    const body = document.body;
    const progressFill = document.querySelector('.progress-fill');

    if (!bootText || !bootLoader) {
        if (body.classList.contains('loading')) body.classList.remove('loading');
        return;
    }


    const lines = [
        { text: 'Initializing SabariOS...', status: 'info', prefix: '[INFO]' },
        { text: 'Agriculture background detected.', status: 'ok', prefix: '[OK]' },
        { text: 'Pivot to Development complete.', status: 'ok', prefix: '[OK]' },
        { text: 'Welcome, User.', status: 'success', prefix: '[SUCCESS]' }
    ];

    let currentLine = 0;

    const addLine = () => {
        if (currentLine < lines.length) {
            const lineData = lines[currentLine];
            const lineElement = document.createElement('div');
            lineElement.className = 'boot-line';
            lineElement.innerHTML = `<span class="status-${lineData.status}">${lineData.prefix}</span> ${lineData.text}`;
            bootText.appendChild(lineElement);

            // Update progress bar based on lines
            progressFill.style.width = `${((currentLine + 1) / lines.length) * 100}%`;

            currentLine++;
            setTimeout(addLine, 400);
        } else {
            // End sequence
            setTimeout(() => {
                bootLoader.classList.add('fade-out');
                body.classList.remove('loading');

                // Optional: Trigger specific entrance animations for the home section
                // after the loader is gone
            }, 600);
        }
    };

    // Small initial delay before starting
    setTimeout(addLine, 300);
};

// Scroll Reveal Animation using Intersection Observer
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Once shown, we can stop observing it
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize observers and Boot Sequence on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    // Start Boot Sequence
    bootSequence();
});

// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle-btn');
const navbar = document.querySelector('.navbar');
const mobileOverlay = document.querySelector('.mobile-overlay');
const navLinks = document.querySelectorAll('.nav-links a');

const toggleMenu = () => {
    mobileToggle.classList.toggle('active');
    navbar.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';
};

if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMenu);
    mobileOverlay.addEventListener('click', toggleMenu);
}

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbar.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Active Link Tracking on Scroll
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.includes('#') && href.split('#')[1] === current) {
            link.classList.add('active');
        }
    });
});
