const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    moduleId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: Date,
    timeSpent: {
        type: Number, // in minutes
        default: 0
    }
});

const enrollmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    enrolledAt: {
        type: Date,
        default: Date.now
    },
    progress: [progressSchema],
    completionPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'dropped', 'suspended'],
        default: 'active'
    },
    completedAt: Date,
    grade: {
        type: Number,
        min: 0,
        max: 100
    },
    certificateIssued: {
        type: Boolean,
        default: false
    },
    certificateUrl: String,
    lastAccessedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Update completion percentage
enrollmentSchema.methods.updateCompletionPercentage = function(totalLessons) {
    const completedLessons = this.progress.filter(p => p.completed).length;
    this.completionPercentage = Math.round((completedLessons / totalLessons) * 100);
};

// Mark lesson as complete
enrollmentSchema.methods.completeLesson = function(moduleId, lessonId) {
    const existingProgress = this.progress.find(
        p => p.moduleId.toString() === moduleId.toString() && 
             p.lessonId.toString() === lessonId.toString()
    );

    if (existingProgress) {
        existingProgress.completed = true;
        existingProgress.completedAt = new Date();
    } else {
        this.progress.push({
            moduleId,
            lessonId,
            completed: true,
            completedAt: new Date()
        });
    }
};

// Compound index for unique enrollment
enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
