// Timeline functionality

document.addEventListener('DOMContentLoaded', () => {
    initTimeline();
});

function initTimeline() {
    // Load timeline data
    loadTimelineData()
        .then(data => {
            renderTimelineItems(data);
            initTimelineScroll();
        })
        .catch(error => {
            console.error('Error loading timeline data:', error);
            // Fallback to sample data if loading fails
            const sampleData = getSampleTimelineData();
            renderTimelineItems(sampleData);
            initTimelineScroll();
        });
}

// Function to load timeline data from JSON or API
async function loadTimelineData() {
    // Check if Supabase integration is available
    if (window.supabaseData && typeof window.supabaseData.getTimelineData === 'function') {
        // Try to get data from Supabase
        const { data, error } = await window.supabaseData.getTimelineData();
        
        // If successful, use the data from Supabase
        if (data && !error) {
            return data;
        }
    }
    // Fallback to sample data if Supabase is not integrated yet
    return getSampleTimelineData();
}

// Sample timeline data for development
function getSampleTimelineData() {
    return [
        {
            id: 1,
            date: '2023-09-05',
            title: 'HTML Basics Practical',
            description: 'Created a simple webpage using semantic HTML5 elements.',
            image: './assets/images/practical1.jpg',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 2,
            date: '2023-09-12',
            title: 'CSS Styling Practical',
            description: 'Applied CSS3 styling to create a responsive layout with flexbox and grid.',
            image: './assets/images/practical2.jpg',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 3,
            date: '2023-09-19',
            title: 'JavaScript Basics',
            description: 'Implemented interactive features using vanilla JavaScript.',
            image: './assets/images/practical3.jpg',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 4,
            date: '2023-09-26',
            title: 'DOM Manipulation',
            description: 'Created dynamic content by manipulating the DOM with JavaScript.',
            image: './assets/images/practical4.jpg',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 5,
            date: '2023-10-03',
            title: 'Form Validation',
            description: 'Implemented client-side form validation using JavaScript.',
            image: './assets/images/practical5.jpg',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 6,
            date: '2023-10-10',
            title: 'API Integration',
            description: 'Connected to external APIs to fetch and display data.',
            image: './assets/images/practical6.jpg',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 7,
            date: '2023-10-17',
            title: 'Responsive Web Design',
            description: 'Created a fully responsive website that adapts to different screen sizes.',
            image: './assets/images/practical1.jpg',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 8,
            date: '2023-10-24',
            title: 'CSS Animations',
            description: 'Implemented complex animations and transitions using CSS3.',
            image: './assets/images/practical2.jpg',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 9,
            date: '2023-10-31',
            title: 'Local Storage',
            description: 'Built a web application that persists data using browser local storage.',
            image: './assets/images/practical3.jpg',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 10,
            date: '2023-11-07',
            title: 'Fetch API',
            description: 'Used the Fetch API to retrieve and display data from external sources.',
            image: './assets/images/practical4.jpg',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 11,
            date: '2023-11-14',
            title: 'ES6 Features',
            description: 'Implemented modern JavaScript features including arrow functions, destructuring, and modules.',
            image: './assets/images/practical5.jpg',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 12,
            date: '2023-11-21',
            title: 'Async/Await',
            description: 'Built asynchronous functionality using async/await patterns.',
            image: './assets/images/practical6.jpg',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 13,
            date: '2023-11-28',
            title: 'CSS Grid Layout',
            description: 'Created complex grid-based layouts using CSS Grid.',
            image: './assets/images/practical1.jpg',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 14,
            date: '2023-12-05',
            title: 'Web Accessibility',
            description: 'Implemented accessibility features to make web content more inclusive.',
            image: './assets/images/practical2.jpg',
            demoUrl: '#',
            pdfUrl: '#'
        },
        {
            id: 15,
            date: '2023-12-12',
            title: 'Final Project',
            description: 'Comprehensive web application showcasing all learned skills and techniques.',
            image: './assets/images/practical3.jpg',
            demoUrl: '#',
            pdfUrl: '#'
        }
    ];
}

// Render timeline items to the DOM
function renderTimelineItems(items) {
    const timelineContainer = document.querySelector('.timeline-items');
    timelineContainer.innerHTML = '';
    
    items.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.classList.add('timeline-item');
        timelineItem.setAttribute('data-date', item.date);
        
        // Format the date for display
        const formattedDate = formatDate(item.date);
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-date">${formattedDate}</div>
                <h3 class="timeline-title">${item.title}</h3>
                <p class="timeline-description">${item.description}</p>
                <div class="timeline-image">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                </div>
                <div class="card-buttons">
                    <a href="${item.demoUrl}" class="btn primary" target="_blank">Live Demo</a>
                    <a href="${item.pdfUrl}" class="btn secondary" download>Download PDF</a>
                </div>
            </div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
}

// Initialize timeline scroll effects
function initTimelineScroll() {
    const timelineTrack = document.querySelector('.timeline-track');
    const timelineBall = document.querySelector('.timeline-ball');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineSection = document.getElementById('animated_timeline');
    
    // Set the height of the timeline track
    if (timelineItems.length > 0) {
        const lastItem = timelineItems[timelineItems.length - 1];
        const trackHeight = lastItem.offsetTop + lastItem.offsetHeight - timelineItems[0].offsetTop;
        timelineTrack.style.height = `${trackHeight}px`;
    }
    
    // Update timeline ball position on scroll
    window.addEventListener('scroll', () => {
        // Check if timeline section is in viewport
        const rect = timelineSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            // Calculate scroll progress within the timeline section
            const sectionTop = timelineSection.offsetTop;
            const scrollPosition = window.scrollY - sectionTop + window.innerHeight / 2;
            const sectionHeight = timelineSection.offsetHeight;
            const scrollPercentage = Math.min(Math.max(scrollPosition / sectionHeight, 0), 1);
            
            // Update ball position
            const trackHeight = timelineTrack.offsetHeight;
            const ballPosition = scrollPercentage * trackHeight;
            timelineBall.style.top = `${ballPosition}px`;
            
            // Animate timeline items as they come into view
            timelineItems.forEach(item => {
                const itemTop = item.offsetTop - timelineSection.offsetTop;
                if (scrollPosition > itemTop - 200) {
                    item.classList.add('visible');
                }
            });
        }
    });
    
    // Trigger scroll event to initialize positions
    window.dispatchEvent(new Event('scroll'));
}

// Helper function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}