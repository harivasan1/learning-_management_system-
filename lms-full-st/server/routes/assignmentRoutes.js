const express = require('express');
const router = express.Router();
const {
    getAssignmentsByCourse,
    getAssignment,
    createAssignment,
    updateAssignment,
    deleteAssignment,
    submitAssignment,
    gradeSubmission,
    getStudentSubmissions
} = require('../controllers/assignmentController');
const { protect, authorize } = require('../middleware/auth');

// Get assignments for a course
router.get('/course/:courseId', protect, getAssignmentsByCourse);

// Get specific assignment
router.get('/:id', protect, getAssignment);

// Create assignment (teacher/admin only)
router.post('/', protect, authorize('teacher', 'admin'), createAssignment);

// Update assignment
router.put('/:id', protect, authorize('teacher', 'admin'), updateAssignment);

// Delete assignment
router.delete('/:id', protect, authorize('teacher', 'admin'), deleteAssignment);

// Submit assignment
router.post('/:id/submit', protect, authorize('student'), submitAssignment);

// Grade submission
router.put('/:id/grade', protect, authorize('teacher', 'admin'), gradeSubmission);

// Get student submissions
router.get('/student/:studentId', protect, getStudentSubmissions);

module.exports = router;
