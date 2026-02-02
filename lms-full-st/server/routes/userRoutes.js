const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res) => {
    res.status(200).json({ success: true, message: 'Get all users' });
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
    res.status(200).json({ success: true, message: 'Get user by ID' });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
router.put('/:id', protect, async (req, res) => {
    res.status(200).json({ success: true, message: 'Update user' });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
    res.status(200).json({ success: true, message: 'Delete user' });
});

module.exports = router;
