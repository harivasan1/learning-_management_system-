const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    questionType: {
        type: String,
        enum: ['multiple-choice', 'true-false', 'short-answer', 'essay'],
        default: 'multiple-choice'
    },
    options: [{
        text: String,
        isCorrect: Boolean
    }],
    correctAnswer: String, // for short-answer and essay
    points: {
        type: Number,
        required: true,
        default: 1
    },
    explanation: String,
    order: Number
});

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Quiz title is required'],
        trim: true
    },
    description: String,
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    module: {
        type: mongoose.Schema.Types.ObjectId
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    questions: [questionSchema],
    totalPoints: {
        type: Number,
        required: true
    },
    duration: {
        type: Number, // in minutes
        required: true
    },
    passingScore: {
        type: Number,
        default: 70,
        min: 0,
        max: 100
    },
    attempts: {
        type: Number,
        default: 1
    },
    showCorrectAnswers: {
        type: Boolean,
        default: true,
        enum: [true, false]
    },
    shuffleQuestions: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'closed'],
        default: 'draft'
    },
    dueDate: Date,
    startDate: {
        type: Date,
        default: Date.now
    },
    attempts_submissions: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        answers: [{
            questionId: mongoose.Schema.Types.ObjectId,
            answer: String,
            isCorrect: Boolean,
            points: Number
        }],
        score: Number,
        percentage: Number,
        passed: Boolean,
        submittedAt: {
            type: Date,
            default: Date.now
        },
        startedAt: Date,
        timeSpent: Number // in seconds
    }]
}, {
    timestamps: true
});

// Method to calculate quiz score
quizSchema.methods.calculateScore = function(answers) {
    let totalPoints = 0;
    let earnedPoints = 0;

    this.questions.forEach((question, index) => {
        const studentAnswer = answers[index];
        totalPoints += question.points;

        if (question.questionType === 'multiple-choice') {
            const correctOption = question.options.find(opt => opt.isCorrect);
            if (studentAnswer === correctOption.text) {
                earnedPoints += question.points;
            }
        } else if (question.questionType === 'true-false') {
            if (studentAnswer === question.correctAnswer) {
                earnedPoints += question.points;
            }
        }
    });

    return {
        earnedPoints,
        totalPoints,
        percentage: Math.round((earnedPoints / totalPoints) * 100),
        passed: Math.round((earnedPoints / totalPoints) * 100) >= this.passingScore
    };
};

module.exports = mongoose.model('Quiz', quizSchema);
