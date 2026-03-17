const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Enroll student in course
// @route   POST /api/enrollments
// @access  Private
exports.enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const studentId = req.user.id;

        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Check if student already enrolled
        const existingEnrollment = await Enrollment.findOne({
            student: studentId,
            course: courseId
        });

        if (existingEnrollment) {
            return res.status(400).json({
                success: false,
                message: 'Student already enrolled in this course'
            });
        }

        // Create enrollment
        const enrollment = await Enrollment.create({
            student: studentId,
            course: courseId
        });

        // Add course to user's enrolled courses
        await User.findByIdAndUpdate(studentId, {
            $push: { enrolledCourses: courseId }
        });

        // Add student to course's enrolled students
        await Course.findByIdAndUpdate(courseId, {
            $push: { enrolledStudents: studentId }
        });

        const populatedEnrollment = await Enrollment.findById(enrollment._id)
            .populate('student', 'firstName lastName email')
            .populate('course', 'title description');

        res.status(201).json({
            success: true,
            data: populatedEnrollment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error enrolling in course',
            error: error.message
        });
    }
};

// @desc    Get student enrollments
// @route   GET /api/enrollments/student/:studentId
// @access  Private
exports.getStudentEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({
            student: req.params.studentId
        })
            .populate('course')
            .populate('student', 'firstName lastName');

        res.status(200).json({
            success: true,
            count: enrollments.length,
            data: enrollments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching enrollments',
            error: error.message
        });
    }
};

// @desc    Get course enrollments (for teacher)
// @route   GET /api/enrollments/course/:courseId
// @access  Private
exports.getCourseEnrollments = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Check authorization
        if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view enrollments'
            });
        }

        const enrollments = await Enrollment.find({
            course: req.params.courseId
        })
            .populate('student', 'firstName lastName email')
            .populate('course', 'title');

        res.status(200).json({
            success: true,
            count: enrollments.length,
            data: enrollments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching course enrollments',
            error: error.message
        });
    }
};

// @desc    Update enrollment progress
// @route   PUT /api/enrollments/:id/progress
// @access  Private
exports.updateEnrollmentProgress = async (req, res) => {
    try {
        const { moduleId, lessonId } = req.body;
        let enrollment = await Enrollment.findById(req.params.id);

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: 'Enrollment not found'
            });
        }

        // Mark lesson as complete
        enrollment.completeLesson(moduleId, lessonId);
        await enrollment.save();

        res.status(200).json({
            success: true,
            data: enrollment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating progress',
            error: error.message
        });
    }
};

// @desc    Get enrollment details
// @route   GET /api/enrollments/:id
// @access  Private
exports.getEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id)
            .populate('student', 'firstName lastName email')
            .populate('course', 'title description modules');

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: 'Enrollment not found'
            });
        }

        res.status(200).json({
            success: true,
            data: enrollment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching enrollment',
            error: error.message
        });
    }
};

// @desc    Complete course
// @route   PUT /api/enrollments/:id/complete
// @access  Private
exports.completeCourse = async (req, res) => {
    try {
        let enrollment = await Enrollment.findById(req.params.id);

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: 'Enrollment not found'
            });
        }

        enrollment.status = 'completed';
        enrollment.completedAt = new Date();
        await enrollment.save();

        res.status(200).json({
            success: true,
            data: enrollment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error completing course',
            error: error.message
        });
    }
};
