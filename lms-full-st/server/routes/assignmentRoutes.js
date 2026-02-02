const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// @desc    Get assignments for a course
// @route   GET /api/assignments/course/:courseId
// @access  Private
router.get('/course/:courseId', protect, async (req, res) => {
    res.status(200).json({ success: true, message: 'Get course assignments' });
});

// @desc    Create assignment
// @route   POST /api/assignments
// @access  Private (Teacher)
router.post('/', protect, authorize('teacher', 'admin'), async (req, res) => {
    res.status(201).json({ success: true, message: 'Create assignment' });
});

// @desc    Submit assignment
// @route   POST /api/assignments/:id/submit
// @access  Private (Student)
router.post('/:id/submit', protect, async (req, res) => {
    res.status(200).json({ success: true, message: 'Submit assignment' });
});

// @desc    Grade assignment
// @route   PUT /api/assignments/:assignmentId/submissions/:submissionId/grade
// @access  Private (Teacher)
router.put('/:assignmentId/submissions/:submissionId/grade', protect, authorize('teacher', 'admin'), async (req, res) => {
    res.status(200).json({ success: true, message: 'Grade assignment' });
});

module.exports = router;
