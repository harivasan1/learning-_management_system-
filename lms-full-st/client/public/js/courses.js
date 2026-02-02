// Placeholder course-related functions
const API_URL = 'http://localhost:5000/api';

async function fetchCourses() {
    try {
        const res = await fetch(`${API_URL}/courses`);
        if (!res.ok) throw new Error('Failed to fetch courses');
        return await res.json();
    } catch (err) {
        console.error('fetchCourses error:', err);
        return { success: false, message: err.message };
    }
}

// Export to global for now
window.fetchCourses = fetchCourses;