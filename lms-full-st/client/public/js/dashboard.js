// Student Dashboard Initialization
let currentUser = null;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        checkAuth();
        currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        
        // Update user name
        const userNameElements = document.querySelectorAll('#userName');
        userNameElements.forEach(el => {
            el.textContent = currentUser.firstName || currentUser.name || 'Student';
        });

        // Load dashboard data
        await loadEnrollments();
    } catch (error) {
        console.error('Dashboard initialization error:', error);
        showNotification('Error loading dashboard', 'danger');
    }
});

async function loadEnrollments() {
    try {
        const response = await api.getStudentEnrollments(currentUser._id || currentUser.id);
        
        if (response.success) {
            const enrollments = response.data || [];
            
            // Update statistics
            const completed = enrollments.filter(e => e.status === 'completed').length;
            const inProgress = enrollments.filter(e => e.status === 'active').length;
            
            document.getElementById('enrolledCount').textContent = enrollments.length;
            document.getElementById('completedCount').textContent = completed;
            
            // Calculate total hours (assuming 2 hours per course)
            document.getElementById('hoursCount').textContent = enrollments.length * 2;
            
            // Load courses
            await loadCourses(enrollments);
        }
    } catch (error) {
        console.error('Error loading enrollments:', error);
    }
}

async function loadCourses(enrollments) {
    try {
        const coursesList = document.getElementById('enrolledCoursesList');
        
        if (!enrollments || enrollments.length === 0) {
            coursesList.innerHTML = '<div class="col-12"><p class="text-muted text-center py-5">You haven\'t enrolled in any courses yet. Try browsing the course catalog.</p></div>';
            return;
        }

        let coursesHTML = '';
        
        for (const enrollment of enrollments) {
            const course = enrollment.course;
            const progress = enrollment.completionPercentage || 0;
            const statusClass = enrollment.status === 'completed' ? 'bg-success' : 'bg-primary';
            
            coursesHTML += `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card course-card">
                        <div class="course-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 150px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-book fa-3x text-white"></i>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${course.title}</h5>
                            <p class="card-text text-muted small">${course.description ? course.description.substring(0, 80) + '...' : 'No description'}</p>
                            
                            <div class="mb-2">
                                <small>Progress: ${progress}%</small>
                                <div class="progress mt-1">
                                    <div class="progress-bar ${statusClass}" style="width: ${progress}%"></div>
                                </div>
                            </div>
                            
                            <div class="d-flex gap-2">
                                <a href="#" class="btn btn-sm btn-primary flex-grow-1">
                                    <i class="fas fa-arrow-right"></i> Continue
                                </a>
                                <button class="btn btn-sm btn-outline-secondary" onclick="viewAssignments('${course._id}')">
                                    <i class="fas fa-tasks"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        coursesList.innerHTML = coursesHTML;
    } catch (error) {
        console.error('Error loading courses:', error);
    }
}

function viewAssignments(courseId) {
    // TODO: Implement assignment view modal/page
    alert('Assignments for course: ' + courseId);
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        window.location.href = '/';
    }
}