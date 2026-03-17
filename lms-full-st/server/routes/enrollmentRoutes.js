const express = require('express');
const router = express.Router();
const {
    enrollCourse,
    getStudentEnrollments,
    getCourseEnrollments,
    updateEnrollmentProgress,
    getEnrollment,
    completeCourse
} = require('../controllers/enrollmentController');
const { protect, authorize } = require('../middleware/auth');

// Enroll in course
router.post('/', protect, authorize('student'), enrollCourse);

// Get student's enrollments
router.get('/student/:studentId', protect, getStudentEnrollments);

// Get course enrollments (for teacher)
router.get('/course/:courseId', protect, getCourseEnrollments);

// Get specific enrollment
router.get('/:id', protect, getEnrollment);

// Update progress
router.put('/:id/progress', protect, updateEnrollmentProgress);

// Complete course
router.put('/:id/complete', protect, completeCourse);

module.exports = router;
