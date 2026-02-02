const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    attachments: [{
        filename: String,
        url: String,
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }],
    submittedAt: {
        type: Date,
        default: Date.now
    },
    grade: {
        type: Number,
        min: 0,
        max: 100
    },
    feedback: String,
    gradedAt: Date,
    gradedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['submitted', 'graded', 'late'],
        default: 'submitted'
    }
});

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Assignment title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Assignment description is required']
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    module: {
        type: mongoose.Schema.Types.ObjectId
    },
    instructions: {
        type: String
    },
    dueDate: {
        type: Date,
        required: true
    },
    points: {
        type: Number,
        required: true,
        min: 0
    },
    attachments: [{
        filename: String,
        url: String
    }],
    submissions: [submissionSchema],
    allowLateSubmission: {
        type: Boolean,
        default: true
    },
    type: {
        type: String,
        enum: ['homework', 'quiz', 'project', 'exam'],
        default: 'homework'
    },
    status: {
        type: String,
        enum: ['active', 'closed', 'draft'],
        default: 'active'
    }
}, {
    timestamps: true
});

// Check if assignment is overdue
assignmentSchema.virtual('isOverdue').get(function() {
    return new Date() > this.dueDate;
});

// Get submission by student
assignmentSchema.methods.getSubmissionByStudent = function(studentId) {
    return this.submissions.find(sub => sub.student.toString() === studentId.toString());
};

module.exports = mongoose.model('Assignment', assignmentSchema);
