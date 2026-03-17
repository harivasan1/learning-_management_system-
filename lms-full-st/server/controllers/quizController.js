const Quiz = require('../models/Quiz');
const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Get all quizzes for a course
// @route   GET /api/quizzes/course/:courseId
// @access  Private
exports.getQuizzesByCourse = async (req, res) => {
    try {
        const quizzes = await Quiz.find({
            course: req.params.courseId
        })
            .populate('instructor', 'firstName lastName')
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: quizzes.length,
            data: quizzes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching quizzes',
            error: error.message
        });
    }
};

// @desc    Get single quiz
// @route   GET /api/quizzes/:id
// @access  Private
exports.getQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id)
            .populate('course', 'title')
            .populate('instructor', 'firstName lastName');

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: 'Quiz not found'
            });
        }

        res.status(200).json({
            success: true,
            data: quiz
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching quiz',
            error: error.message
        });
    }
};

// @desc    Create quiz
// @route   POST /api/quizzes
// @access  Private (Teacher/Admin)
exports.createQuiz = async (req, res) => {
    try {
        req.body.instructor = req.user.id;

        const quiz = await Quiz.create(req.body);

        const populatedQuiz = await Quiz.findById(quiz._id)
            .populate('course', 'title')
            .populate('instructor', 'firstName lastName');

        res.status(201).json({
            success: true,
            data: populatedQuiz
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating quiz',
            error: error.message
        });
    }
};

// @desc    Update quiz
// @route   PUT /api/quizzes/:id
// @access  Private (Teacher/Admin)
exports.updateQuiz = async (req, res) => {
    try {
        let quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: 'Quiz not found'
            });
        }

        // Check authorization
        if (quiz.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this quiz'
            });
        }

        quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: quiz
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating quiz',
            error: error.message
        });
    }
};

// @desc    Delete quiz
// @route   DELETE /api/quizzes/:id
// @access  Private (Teacher/Admin)
exports.deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: 'Quiz not found'
            });
        }

        // Check authorization
        if (quiz.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this quiz'
            });
        }

        await quiz.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Quiz deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting quiz',
            error: error.message
        });
    }
};

// @desc    Submit quiz answers
// @route   POST /api/quizzes/:id/submit
// @access  Private (Student)
exports.submitQuiz = async (req, res) => {
    try {
        const { answers } = req.body;
        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: 'Quiz not found'
            });
        }

        // Check if student has already attempted
        const attemptCount = quiz.attempts_submissions.filter(
            att => att.student.toString() === req.user.id
        ).length;

        if (attemptCount >= quiz.attempts) {
            return res.status(400).json({
                success: false,
                message: 'You have exceeded the maximum number of attempts'
            });
        }

        // Calculate score
        const scoreData = quiz.calculateScore(answers);

        // Create submission
        const submission = {
            student: req.user.id,
            answers,
            score: scoreData.earnedPoints,
            percentage: scoreData.percentage,
            passed: scoreData.passed,
            submittedAt: new Date()
        };

        quiz.attempts_submissions.push(submission);
        await quiz.save();

        res.status(201).json({
            success: true,
            message: 'Quiz submitted successfully',
            data: {
                score: scoreData.earnedPoints,
                totalPoints: scoreData.totalPoints,
                percentage: scoreData.percentage,
                passed: scoreData.passed
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error submitting quiz',
            error: error.message
        });
    }
};

// @desc    Get quiz results for a student
// @route   GET /api/quizzes/:id/results/:studentId
// @access  Private
exports.getQuizResults = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: 'Quiz not found'
            });
        }

        const results = quiz.attempts_submissions.filter(
            att => att.student.toString() === req.params.studentId
        );

        res.status(200).json({
            success: true,
            count: results.length,
            data: results
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching quiz results',
            error: error.message
        });
    }
};

// @desc    Get all quiz submissions (for teacher)
// @route   GET /api/quizzes/:id/submissions
// @access  Private (Teacher/Admin)
exports.getQuizSubmissions = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: 'Quiz not found'
            });
        }

        // Check authorization
        if (quiz.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view submissions'
            });
        }

        const submissions = await Quiz.findById(req.params.id)
            .populate('attempts_submissions.student', 'firstName lastName email');

        res.status(200).json({
            success: true,
            count: quiz.attempts_submissions.length,
            data: submissions.attempts_submissions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching submissions',
            error: error.message
        });
    }
};
