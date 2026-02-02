const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    order: Number,
    lessons: [{
        title: String,
        description: String,
        type: {
            type: String,
            enum: ['video', 'document', 'quiz', 'assignment'],
            default: 'video'
        },
        content: String, // URL or content
        duration: Number, // in minutes
        order: Number,
        isCompleted: {
            type: Boolean,
            default: false
        }
    }]
});

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Course title is required'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Course description is required']
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Web Development', 'Data Science', 'Mobile Development', 'Design', 'Business', 'Marketing', 'Other']
    },
    thumbnail: {
        type: String,
        default: 'default-course.jpg'
    },
    modules: [moduleSchema],
    duration: {
        type: Number, // Total duration in hours
        required: true
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        default: 'Beginner'
    },
    price: {
        type: Number,
        default: 0
    },
    enrolledStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    maxStudents: {
        type: Number,
        default: 100
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: Number,
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    startDate: Date,
    endDate: Date,
    isPublished: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Calculate average rating
courseSchema.methods.calculateAverageRating = function() {
    if (this.reviews.length === 0) return 0;
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / this.reviews.length).toFixed(1);
};

module.exports = mongoose.model('Course', courseSchema);
