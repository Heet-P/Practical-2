// Dashboard functionality

document.addEventListener('DOMContentLoaded', () => {
    loadDashboard();
});

function loadDashboard() {
    // Check if user is logged in as professor
    const isProfessor = sessionStorage.getItem('isProfessor') === 'true';
    
    // Load dashboard data
    loadDashboardData()
        .then(data => {
            renderDashboardCards(data, isProfessor);
        })
        .catch(error => {
            console.error('Error loading dashboard data:', error);
            // Fallback to sample data if loading fails
            const sampleData = getSampleDashboardData();
            renderDashboardCards(sampleData, isProfessor);
        });
}

// Function to load dashboard data from JSON or API
async function loadDashboardData() {
    // Check if Supabase integration is available
    if (window.supabaseData && typeof window.supabaseData.getDashboardData === 'function') {
        // Try to get data from Supabase
        const { data, error } = await window.supabaseData.getDashboardData();
        
        // If successful, return the data from Supabase
        if (data && !error) {
            return data;
        }
    }
    
    // Fallback to sample data if Supabase is not integrated yet
    return getSampleDashboardData();
}

// Sample dashboard data for development
function getSampleDashboardData() {
    return [
        {
            id: 1,
            title: 'HTML Basics Practical',
            description: 'Created a simple webpage using semantic HTML5 elements.',
            image: './assets/images/practical1.jpg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-09-05'
        },
        {
            id: 2,
            title: 'CSS Styling Practical',
            description: 'Applied CSS3 styling to create a responsive layout with flexbox and grid.',
            image: './assets/images/practical2.jpg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-09-12'
        },
        {
            id: 3,
            title: 'JavaScript Basics',
            description: 'Implemented interactive features using vanilla JavaScript.',
            image: './assets/images/practical3.jpg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-09-19'
        },
        {
            id: 4,
            title: 'DOM Manipulation',
            description: 'Created dynamic content by manipulating the DOM with JavaScript.',
            image: './assets/images/practical4.jpg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-09-26'
        },
        {
            id: 5,
            title: 'Form Validation',
            description: 'Implemented client-side form validation using JavaScript.',
            image: './assets/images/practical5.jpg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-10-03'
        },
        {
            id: 6,
            title: 'API Integration',
            description: 'Connected to external APIs to fetch and display data.',
            image: './assets/images/practical6.jpg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-10-10'
        },
        {
            id: 7,
            title: 'Responsive Web Design',
            description: 'Created a fully responsive website that adapts to different screen sizes.',
            image: './assets/images/practical1.jpg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-10-17'
        },
        {
            id: 8,
            title: 'CSS Animations',
            description: 'Implemented complex animations and transitions using CSS3.',
            image: './assets/images/practical2.jpg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-10-24'
        },
        {
            id: 9,
            title: 'Local Storage',
            description: 'Built a web application that persists data using browser local storage.',
            image: './assets/images/practical3.jpg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-10-31'
        },
        {
            id: 10,
            title: 'Fetch API',
            description: 'Used the Fetch API to retrieve and display data from external sources.',
            image: './assets/images/practical4.jpg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-11-07'
        },
        {
            id: 11,
            title: 'ES6 Features',
            description: 'Implemented modern JavaScript features including arrow functions, destructuring, and modules.',
            image: './assets/images/practical5.jpg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-11-14'
        },
        {
            id: 12,
            title: 'Async/Await',
            description: 'Built asynchronous functionality using async/await patterns.',
            image: './assets/images/practical6.jpg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-11-21'
        },
        {
            id: 13,
            title: 'CSS Grid Layout',
            description: 'Created complex grid-based layouts using CSS Grid.',
            image: './assets/images/practical1.jpg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-11-28'
        },
        {
            id: 14,
            title: 'Web Accessibility',
            description: 'Implemented accessibility features to make web content more inclusive.',
            image: './assets/images/practical2.jpg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-12-05'
        },
        {
            id: 15,
            title: 'Final Project',
            description: 'Comprehensive web application showcasing all learned skills and techniques.',
            image: './assets/images/practical3.jpg',
            demoUrl: '#',
            pdfUrl: '#',
            date: '2023-12-12'
        }
    ];
}

// Render dashboard cards to the DOM
function renderDashboardCards(items, isProfessor) {
    const dashboardGrid = document.querySelector('.dashboard-grid');
    dashboardGrid.innerHTML = '';
    
    // Sort items by date (newest first)
    items.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    items.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('dashboard-card');
        
        // Format the date for display
        const formattedDate = formatDate(item.date);
        
        card.innerHTML = `
            <div class="card-image">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
            <div class="card-content">
                <h3 class="card-title">${item.title}</h3>
                <div class="timeline-date">${formattedDate}</div>
                ${isProfessor ? `<p class="timeline-description">${item.description}</p>` : ''}
                <div class="card-buttons">
                    <a href="${item.demoUrl}" class="btn primary" target="_blank">Live Demo</a>
                    <a href="${item.pdfUrl}" class="btn secondary" download>Download PDF</a>
                    ${isProfessor ? `<button class="btn text add-feedback" data-id="${item.id}">Add Feedback</button>` : ''}
                </div>
            </div>
        `;
        
        dashboardGrid.appendChild(card);
    });
    
    // Add event listeners for professor features if logged in
    if (isProfessor) {
        initProfessorFeatures();
    }
}

// Initialize professor-specific features
function initProfessorFeatures() {
    const feedbackButtons = document.querySelectorAll('.add-feedback');
    
    feedbackButtons.forEach(button => {
        button.addEventListener('click', () => {
            const practicalId = button.getAttribute('data-id');
            showFeedbackModal(practicalId);
        });
    });
}

// Show feedback modal for professors
function showFeedbackModal(practicalId) {
    // Create modal for feedback
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.classList.add('active');
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Add Feedback for Practical #${practicalId}</h2>
            <form id="feedback-form">
                <div class="form-group">
                    <label for="feedback">Feedback</label>
                    <textarea id="feedback" rows="5" required></textarea>
                </div>
                <div class="form-group">
                    <label for="grade">Grade</label>
                    <input type="number" id="grade" min="0" max="100" required>
                </div>
                <button type="submit" class="btn primary">Submit Feedback</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeModal = modal.querySelector('.close-modal');
    closeModal.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Handle form submission
    const feedbackForm = document.getElementById('feedback-form');
    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const feedback = document.getElementById('feedback').value;
        const grade = document.getElementById('grade').value;
        
        // Check if Supabase integration is available
        if (window.supabaseData && typeof window.supabaseData.saveFeedback === 'function') {
            // Save feedback to Supabase
            const { data, error } = await window.supabaseData.saveFeedback(practicalId, feedback, grade);
            
            if (error) {
                alert('Error saving feedback: ' + error.message);
                return;
            }
            
            // Refresh dashboard to show updated data
            loadDashboard();
        } else {
            // Fallback if Supabase is not integrated yet
            console.log(`Feedback for Practical #${practicalId}:`, { feedback, grade });
        }
        
        // Show success message
        alert('Feedback submitted successfully!');
        document.body.removeChild(modal);
    });
}

// Helper function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}