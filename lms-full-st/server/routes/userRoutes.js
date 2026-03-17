const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    toggleUserActive,
    getUserStats,
    searchUsers
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(protect, authorize('admin'), getAllUsers);

router.route('/:id')
    .get(protect, getUserById)
    .put(protect, updateUser)
    .delete(protect, authorize('admin'), deleteUser);

router.put('/:id/toggle-active', protect, authorize('admin'), toggleUserActive);
router.get('/:id/stats', protect, getUserStats);
router.get('/search/:query', protect, searchUsers);

module.exports = router;
