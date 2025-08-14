// Dark mode toggle functionality

document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
});

function initDarkMode() {
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        body.classList.toggle('dark-mode', savedTheme === 'dark');
    } else {
        // Check if user prefers dark mode
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        body.classList.toggle('dark-mode', prefersDarkMode);
        localStorage.setItem('theme', prefersDarkMode ? 'dark' : 'light');
    }
    
    // Dispatch initial theme state event
    const isDarkMode = body.classList.contains('dark-mode');
    document.dispatchEvent(new CustomEvent('themeChanged', {
        detail: { isDarkMode: isDarkMode }
    }));
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        const currentTheme = isDarkMode ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
        
        // Announce theme change for screen readers
        announceThemeChange(currentTheme);
        
        // Dispatch custom event for theme change
        document.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { isDarkMode: isDarkMode }
        }));
    });
}

// Accessibility: Announce theme change for screen readers
function announceThemeChange(theme) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('class', 'sr-only');
    announcement.textContent = `Theme changed to ${theme} mode`;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement is read
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 3000);
}