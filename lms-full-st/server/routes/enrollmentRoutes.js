const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// @desc    Enroll in a course
// @route   POST /api/enrollments
// @access  Private
router.post('/', protect, async (req, res) => {
    res.status(201).json({ success: true, message: 'Enroll in course' });
});

// @desc    Get student enrollments
// @route   GET /api/enrollments/student/:studentId
// @access  Private
router.get('/student/:studentId', protect, async (req, res) => {
    res.status(200).json({ success: true, message: 'Get student enrollments' });
});

// @desc    Update enrollment progress
// @route   PUT /api/enrollments/:id/progress
// @access  Private
router.put('/:id/progress', protect, async (req, res) => {
    res.status(200).json({ success: true, message: 'Update progress' });
});

module.exports = router;
