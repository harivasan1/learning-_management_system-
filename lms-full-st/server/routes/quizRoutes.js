const express = require('express');
const router = express.Router();
const {
    getQuizzesByCourse,
    getQuiz,
    createQuiz,
    updateQuiz,
    deleteQuiz,
    submitQuiz,
    getQuizResults,
    getQuizSubmissions
} = require('../controllers/quizController');
const { protect, authorize } = require('../middleware/auth');

// Get quizzes by course
router.get('/course/:courseId', protect, getQuizzesByCourse);

// Get specific quiz
router.get('/:id', protect, getQuiz);

// Create quiz (teacher/admin only)
router.post('/', protect, authorize('teacher', 'admin'), createQuiz);

// Update quiz
router.put('/:id', protect, authorize('teacher', 'admin'), updateQuiz);

// Delete quiz
router.delete('/:id', protect, authorize('teacher', 'admin'), deleteQuiz);

// Submit quiz
router.post('/:id/submit', protect, authorize('student'), submitQuiz);

// Get quiz results
router.get('/:id/results/:studentId', protect, getQuizResults);

// Get all quiz submissions (for teacher)
router.get('/:id/submissions', protect, authorize('teacher', 'admin'), getQuizSubmissions);

module.exports = router;
