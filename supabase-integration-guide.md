# Supabase Integration Guide for Portfolio & Dashboard Website

This guide will help you integrate Supabase with your portfolio and dashboard website for authentication and data storage.

## What is Supabase?

Supabase is an open-source Firebase alternative that provides:
- Authentication system
- PostgreSQL database
- Storage for files
- Realtime subscriptions
- API auto-generation

## Step 1: Set Up a Supabase Account

1. Go to [https://supabase.com/](https://supabase.com/) and sign up for a free account
2. Create a new project and note your project URL and API keys

## Step 2: Install Supabase Client Library

Add the Supabase JavaScript client to your project by adding this script tag before your closing `</body>` tag in `index.html`:

```html
<!-- Supabase JS library -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- Your custom Supabase integration script -->
<script src="./js/supabase.js"></script>
```

## Step 3: Create the Supabase Configuration File

Create a new file called `supabase.js` in your `js` directory with the following content:

```javascript
// Initialize Supabase client
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Authentication functions
async function signUp(email, password) {
    try {
        const { user, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
        
        if (error) throw error;
        return { user, error: null };
    } catch (error) {
        console.error('Error signing up:', error.message);
        return { user: null, error };
    }
}

async function signIn(email, password) {
    try {
        const { user, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        
        if (error) throw error;
        return { user, error: null };
    } catch (error) {
        console.error('Error signing in:', error.message);
        return { user: null, error };
    }
}

async function signOut() {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        return { error: null };
    } catch (error) {
        console.error('Error signing out:', error.message);
        return { error };
    }
}

// Data functions for timeline and dashboard
async function getTimelineData() {
    try {
        const { data, error } = await supabase
            .from('practicals')
            .select('*')
            .order('date', { ascending: true });
            
        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error fetching timeline data:', error.message);
        // Fall back to sample data if there's an error
        return { data: getSampleTimelineData(), error };
    }
}

async function getDashboardData() {
    try {
        const { data, error } = await supabase
            .from('practicals')
            .select('*')
            .order('date', { ascending: true });
            
        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error fetching dashboard data:', error.message);
        // Fall back to sample data if there's an error
        return { data: getSampleDashboardData(), error };
    }
}

async function saveFeedback(practicalId, feedback) {
    try {
        const { data, error } = await supabase
            .from('feedback')
            .upsert([
                {
                    practical_id: practicalId,
                    feedback_text: feedback,
                    created_at: new Date()
                }
            ]);
            
        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        console.error('Error saving feedback:', error.message);
        return { data: null, error };
    }
}

// Export functions to make them available to other scripts
window.supabaseAuth = {
    signUp,
    signIn,
    signOut
};

window.supabaseData = {
    getTimelineData,
    getDashboardData,
    saveFeedback
};
```

## Step 4: Set Up Database Tables in Supabase

### Create the "practicals" Table

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the following SQL to create the practicals table:

```sql
CREATE TABLE practicals (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT,
  demo_url TEXT,
  pdf_url TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO practicals (title, description, image, demo_url, pdf_url, date)
VALUES 
  ('HTML Basics Practical', 'Created a simple webpage using semantic HTML5 elements.', './assets/images/practical1.jpg', '#', '#', '2023-09-05'),
  ('CSS Styling Practical', 'Applied CSS3 styling to create a responsive layout with flexbox and grid.', './assets/images/practical2.jpg', '#', '#', '2023-09-12'),
  ('JavaScript Basics', 'Implemented interactive features using vanilla JavaScript.', './assets/images/practical3.jpg', '#', '#', '2023-09-19'),
  ('DOM Manipulation', 'Created dynamic content by manipulating the DOM with JavaScript.', './assets/images/practical4.jpg', '#', '#', '2023-09-26'),
  ('Form Validation', 'Implemented client-side form validation using JavaScript.', './assets/images/practical5.jpg', '#', '#', '2023-10-03'),
  ('API Integration', 'Connected to external APIs to fetch and display data.', './assets/images/practical6.jpg', '#', '#', '2023-10-10'),
  ('Responsive Web Design', 'Created a fully responsive website that adapts to different screen sizes.', './assets/images/practical1.jpg', '#', '#', '2023-10-17'),
  ('CSS Animations', 'Implemented complex animations and transitions using CSS3.', './assets/images/practical2.jpg', '#', '#', '2023-10-24'),
  ('Local Storage', 'Built a web application that persists data using browser local storage.', './assets/images/practical3.jpg', '#', '#', '2023-10-31'),
  ('Fetch API', 'Used the Fetch API to retrieve and display data from external sources.', './assets/images/practical4.jpg', '#', '#', '2023-11-07'),
  ('ES6 Features', 'Implemented modern JavaScript features including arrow functions, destructuring, and modules.', './assets/images/practical5.jpg', '#', '#', '2023-11-14'),
  ('Async/Await', 'Built asynchronous functionality using async/await patterns.', './assets/images/practical6.jpg', '#', '#', '2023-11-21'),
  ('CSS Grid Layout', 'Created complex grid-based layouts using CSS Grid.', './assets/images/practical1.jpg', '#', '#', '2023-11-28'),
  ('Web Accessibility', 'Implemented accessibility features to make web content more inclusive.', './assets/images/practical2.jpg', '#', '#', '2023-12-05'),
  ('Final Project', 'Comprehensive web application showcasing all learned skills and techniques.', './assets/images/practical3.jpg', '#', '#', '2023-12-12');
```

### Create the "feedback" Table

Run the following SQL to create the feedback table:

```sql
CREATE TABLE feedback (
  id SERIAL PRIMARY KEY,
  practical_id INTEGER REFERENCES practicals(id),
  feedback_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Set Up Row-Level Security (RLS) Policies

To secure your data, set up RLS policies:

```sql
-- Enable RLS on tables
ALTER TABLE practicals ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Create policies for practicals table
CREATE POLICY "Practicals are viewable by everyone" 
  ON practicals FOR SELECT USING (true);
  
CREATE POLICY "Practicals are editable by authenticated users only" 
  ON practicals FOR INSERT USING (auth.role() = 'authenticated');
  
CREATE POLICY "Practicals are editable by authenticated users only" 
  ON practicals FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policies for feedback table
CREATE POLICY "Feedback is viewable by everyone" 
  ON feedback FOR SELECT USING (true);
  
CREATE POLICY "Feedback is insertable by authenticated users only" 
  ON feedback FOR INSERT USING (auth.role() = 'authenticated');
  
CREATE POLICY "Feedback is editable by authenticated users only" 
  ON feedback FOR UPDATE USING (auth.role() = 'authenticated');
```

## Step 5: Update Your JavaScript Files

### Update timeline.js

Modify your `loadTimelineData()` function in `timeline.js` to use Supabase:

```javascript
async function loadTimelineData() {
    // Try to get data from Supabase
    const { data, error } = await window.supabaseData.getTimelineData();
    
    // If successful, use the data from Supabase
    // If there's an error, it will fall back to sample data (handled in supabase.js)
    renderTimeline(data);
}
```

### Update dashboard.js

Modify your `loadDashboardData()` function in `dashboard.js` to use Supabase:

```javascript
async function loadDashboardData() {
    // Try to get data from Supabase
    const { data, error } = await window.supabaseData.getDashboardData();
    
    // If successful, use the data from Supabase
    // If there's an error, it will fall back to sample data (handled in supabase.js)
    renderDashboard(data);
}
```

Update your `addFeedback()` function to save feedback to Supabase:

```javascript
async function addFeedback(practicalId) {
    const feedbackText = document.getElementById('feedback-text').value;
    if (!feedbackText.trim()) {
        alert('Please enter feedback before submitting.');
        return;
    }
    
    // Save feedback to Supabase
    const { data, error } = await window.supabaseData.saveFeedback(practicalId, feedbackText);
    
    if (error) {
        alert('Error saving feedback. Please try again.');
        return;
    }
    
    alert('Feedback submitted successfully!');
    closeFeedbackModal();
    
    // Refresh dashboard to show updated data
    loadDashboardData();
}
```

### Update main.js

Modify your login functionality in `main.js` to use Supabase authentication:

```javascript
// Login form submission
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Sign in with Supabase
        const { user, error } = await window.supabaseAuth.signIn(email, password);
        
        if (error) {
            alert('Login failed: ' + error.message);
            return;
        }
        
        // If login successful
        document.body.classList.add('professor-mode');
        closeLoginModal();
        
        // Refresh dashboard to show professor features
        if (typeof loadDashboardData === 'function') {
            loadDashboardData();
        }
    });
}
```

## Step 6: Add Logout Functionality

Add a logout button to your navigation bar in `index.html`:

```html
<button id="logout-btn" class="btn btn-secondary" style="display: none;">Logout</button>
```

Add the logout functionality to `main.js`:

```javascript
// Logout functionality
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', async function() {
        const { error } = await window.supabaseAuth.signOut();
        
        if (error) {
            alert('Error signing out: ' + error.message);
            return;
        }
        
        document.body.classList.remove('professor-mode');
        logoutBtn.style.display = 'none';
        
        // Refresh dashboard to hide professor features
        if (typeof loadDashboardData === 'function') {
            loadDashboardData();
        }
    });
}

// Check if user is already logged in on page load
async function checkAuthStatus() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
        document.body.classList.add('professor-mode');
        if (logoutBtn) logoutBtn.style.display = 'block';
    }
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    checkAuthStatus();
    // ... other initialization code
});
```

## Step 7: File Storage for Images and PDFs

To handle file uploads for practical images and PDFs:

1. Create storage buckets in Supabase:
   - Go to Storage in your Supabase dashboard
   - Create two buckets: `images` and `pdfs`
   - Set the privacy settings as needed

2. Add file upload functionality to your admin interface (if you create one):

```javascript
async function uploadFile(file, bucket) {
    try {
        const fileName = `${Date.now()}_${file.name}`;
        const { data, error } = await supabase
            .storage
            .from(bucket)
            .upload(fileName, file);
            
        if (error) throw error;
        
        // Get public URL
        const { publicURL } = supabase
            .storage
            .from(bucket)
            .getPublicUrl(fileName);
            
        return { url: publicURL, error: null };
    } catch (error) {
        console.error(`Error uploading to ${bucket}:`, error.message);
        return { url: null, error };
    }
}
```

## Security Considerations

1. **Never expose your Supabase service key** in client-side code. Only use the anon/public key for client-side code.

2. **Set up proper RLS policies** to control who can read/write data.

3. **Validate data** on both client and server sides.

4. **Use environment variables** for production deployments to store your Supabase URL and key.

## Next Steps

1. Create an admin interface for managing practicals
2. Implement user roles (admin, professor, student)
3. Add analytics to track views and interactions
4. Set up email notifications for new feedback

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Auth Guides](https://supabase.com/docs/guides/auth)
- [Supabase Storage Guides](https://supabase.com/docs/guides/storage)