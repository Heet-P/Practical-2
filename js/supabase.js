// Supabase Integration for Portfolio & Dashboard Website

// Initialize Supabase client
// Replace these with your actual Supabase URL and anon key
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

// This will be available after the Supabase script is loaded
let supabase;

// Initialize Supabase when the script loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if Supabase library is loaded
    if (typeof supabaseClient !== 'undefined') {
        supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);
        console.log('Supabase initialized successfully');
    } else {
        console.error('Supabase library not loaded. Make sure to uncomment the Supabase script tag in index.html');
    }
});

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

async function saveFeedback(practicalId, feedback, grade = null) {
    try {
        const { data, error } = await supabase
            .from('feedback')
            .upsert([
                {
                    practical_id: practicalId,
                    feedback_text: feedback,
                    grade: grade,
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