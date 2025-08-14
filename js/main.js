// Main JavaScript file for general functionality

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the application
    initNavigation();
    initProfessorLogin();
    initAccessibility();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Add active class to nav links on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Shrink navbar on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Professor login modal functionality
function initProfessorLogin() {
    const loginBtn = document.getElementById('professor-login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeModal = document.querySelector('.close-modal');
    const loginForm = document.getElementById('login-form');

    // Open modal
    loginBtn.addEventListener('click', () => {
        loginModal.classList.add('active');
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        loginModal.classList.remove('active');
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
    });

    // Handle login form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Check if Supabase auth is available
        if (window.supabaseAuth && typeof window.supabaseAuth.signIn === 'function') {
            // Sign in with Supabase
            const { user, error } = await window.supabaseAuth.signIn(email, password);
            
            if (error) {
                alert('Login failed: ' + error.message);
                return;
            }
            
            // If login successful
            alert('Login successful!');
            loginModal.classList.remove('active');
            // Set a session flag to indicate professor is logged in
            sessionStorage.setItem('isProfessor', 'true');
            // Refresh dashboard to show professor view
            loadDashboard();
        } else {
            // Fallback to simple check for demo purposes if Supabase is not integrated
            if (email === 'professor@example.com' && password === 'password123') {
                alert('Login successful!');
                loginModal.classList.remove('active');
                // Set a session flag to indicate professor is logged in
                sessionStorage.setItem('isProfessor', 'true');
                // Refresh dashboard to show professor view
                loadDashboard();
            } else {
                alert('Invalid credentials. Please try again.');
            }
        }
    });
    
    // Check if user is already logged in on page load (when Supabase is integrated)
    async function checkAuthStatus() {
        if (window.supabase && typeof window.supabase.auth.getSession === 'function') {
            const { data: { session } } = await window.supabase.auth.getSession();
            
            if (session) {
                // Set a session flag to indicate professor is logged in
                sessionStorage.setItem('isProfessor', 'true');
                // Refresh dashboard to show professor view
                loadDashboard();
            }
        }
    }
    
    // Call auth check when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAuthStatus);
    } else {
        checkAuthStatus();
    }
}

// Accessibility features
function initAccessibility() {
    // Skip to content functionality
    const skipLink = document.createElement('a');
    skipLink.setAttribute('id', 'skip-link');
    skipLink.setAttribute('href', '#introduction');
    skipLink.textContent = 'Skip to content';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '0';
    skipLink.style.padding = '8px';
    skipLink.style.zIndex = '9999';
    skipLink.style.backgroundColor = 'var(--accent)';
    skipLink.style.color = 'white';
    skipLink.style.transition = 'top 0.3s ease';
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ARIA labels to elements that need them
    const unlabeledElements = document.querySelectorAll('[aria-label=""], [aria-labelledby=""]');
    unlabeledElements.forEach(element => {
        if (element.textContent.trim()) {
            element.setAttribute('aria-label', element.textContent.trim());
        }
    });
    
    // Enable keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    interactiveElements.forEach(element => {
        if (!element.getAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
    });
}

// Helper function to check if an element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Helper function to animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('animated');
        }
    });
}

// Add scroll event listener for animations
window.addEventListener('scroll', animateOnScroll);

// Call once on load to check for elements already in viewport
window.addEventListener('load', animateOnScroll);