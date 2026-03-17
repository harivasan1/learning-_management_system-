// API Configuration
const API_URL = 'http://localhost:5000/api';

class APIClient {
    constructor() {
        this.token = localStorage.getItem('token');
    }

    // Get headers with authorization
    getHeaders() {
        return {
            'Content-Type': 'application/json',
            ...(this.token && { 'Authorization': `Bearer ${this.token}` })
        };
    }

    // Auth endpoints
    async login(email, password) {
        return this.request('POST', '/auth/login', { email, password });
    }

    async register(firstName, lastName, email, password, role) {
        return this.request('POST', '/auth/register', { firstName, lastName, email, password, role });
    }

    async getCurrentUser() {
        return this.request('GET', '/auth/me');
    }

    async logout() {
        return this.request('POST', '/auth/logout');
    }

    // Courses
    async getAllCourses(filters = {}) {
        const params = new URLSearchParams(filters).toString();
        return this.request('GET', `/courses?${params}`);
    }

    async getCourse(courseId) {
        return this.request('GET', `/courses/${courseId}`);
    }

    async createCourse(courseData) {
        return this.request('POST', '/courses', courseData);
    }

    async updateCourse(courseId, courseData) {
        return this.request('PUT', `/courses/${courseId}`, courseData);
    }

    async deleteCourse(courseId) {
        return this.request('DELETE', `/courses/${courseId}`);
    }

    async getCoursesByInstructor(instructorId) {
        return this.request('GET', `/courses/instructor/${instructorId}`);
    }

    // Enrollments
    async enrollCourse(courseId) {
        return this.request('POST', '/enrollments', { courseId });
    }

    async getStudentEnrollments(studentId) {
        return this.request('GET', `/enrollments/student/${studentId}`);
    }

    async getCourseEnrollments(courseId) {
        return this.request('GET', `/enrollments/course/${courseId}`);
    }

    async updateEnrollmentProgress(enrollmentId, moduleId, lessonId) {
        return this.request('PUT', `/enrollments/${enrollmentId}/progress`, { moduleId, lessonId });
    }

    async completeCourse(enrollmentId) {
        return this.request('PUT', `/enrollments/${enrollmentId}/complete`);
    }

    // Assignments
    async getAssignmentsByCourse(courseId) {
        return this.request('GET', `/assignments/course/${courseId}`);
    }

    async getAssignment(assignmentId) {
        return this.request('GET', `/assignments/${assignmentId}`);
    }

    async createAssignment(assignmentData) {
        return this.request('POST', '/assignments', assignmentData);
    }

    async updateAssignment(assignmentId, assignmentData) {
        return this.request('PUT', `/assignments/${assignmentId}`, assignmentData);
    }

    async deleteAssignment(assignmentId) {
        return this.request('DELETE', `/assignments/${assignmentId}`);
    }

    async submitAssignment(assignmentId, content) {
        return this.request('POST', `/assignments/${assignmentId}/submit`, { content });
    }

    async gradeAssignment(assignmentId, studentId, grade, feedback) {
        return this.request('PUT', `/assignments/${assignmentId}/grade`, { studentId, grade, feedback });
    }

    // Quizzes
    async getQuizzesByCourse(courseId) {
        return this.request('GET', `/quizzes/course/${courseId}`);
    }

    async getQuiz(quizId) {
        return this.request('GET', `/quizzes/${quizId}`);
    }

    async createQuiz(quizData) {
        return this.request('POST', '/quizzes', quizData);
    }

    async updateQuiz(quizId, quizData) {
        return this.request('PUT', `/quizzes/${quizId}`, quizData);
    }

    async deleteQuiz(quizId) {
        return this.request('DELETE', `/quizzes/${quizId}`);
    }

    async submitQuiz(quizId, answers) {
        return this.request('POST', `/quizzes/${quizId}/submit`, { answers });
    }

    async getQuizResults(quizId, studentId) {
        return this.request('GET', `/quizzes/${quizId}/results/${studentId}`);
    }

    // Users
    async getAllUsers(role = null) {
        const query = role ? `?role=${role}` : '';
        return this.request('GET', `/users${query}`);
    }

    async getUserById(userId) {
        return this.request('GET', `/users/${userId}`);
    }

    async updateUser(userId, userData) {
        return this.request('PUT', `/users/${userId}`, userData);
    }

    async deleteUser(userId) {
        return this.request('DELETE', `/users/${userId}`);
    }

    async toggleUserActive(userId) {
        return this.request('PUT', `/users/${userId}/toggle-active`);
    }

    async getUserStats(userId) {
        return this.request('GET', `/users/${userId}/stats`);
    }

    async searchUsers(query) {
        return this.request('GET', `/users/search/${query}`);
    }

    // Generic request method
    async request(method, endpoint, body = null) {
        try {
            const options = {
                method,
                headers: this.getHeaders()
            };

            if (body) {
                options.body = JSON.stringify(body);
            }

            const response = await fetch(`${API_URL}${endpoint}`, options);
            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('currentUser');
                    window.location.href = '/';
                }
                throw new Error(data.message || 'API request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
}

// Create global instance
const api = new APIClient();

// Utility Functions
function showNotification(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.container-fluid') || document.body;
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => alertDiv.remove(), 5000);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function calculateProgress(enrollments) {
    if (!enrollments || enrollments.length === 0) return 0;
    const totalProgress = enrollments.reduce((sum, e) => sum + (e.completionPercentage || 0), 0);
    return Math.round(totalProgress / enrollments.length);
}