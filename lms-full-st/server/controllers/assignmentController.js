const Assignment = require('../models/Assignment');
const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Get all assignments for a course
// @route   GET /api/assignments/course/:courseId
// @access  Private
exports.getAssignmentsByCourse = async (req, res) => {
    try {
        const assignments = await Assignment.find({
            course: req.params.courseId
        })
            .populate('course', 'title')
            .sort('-dueDate');

        res.status(200).json({
            success: true,
            count: assignments.length,
            data: assignments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching assignments',
            error: error.message
        });
    }
};

// @desc    Get single assignment
// @route   GET /api/assignments/:id
// @access  Private
exports.getAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id)
            .populate('course', 'title')
            .populate('submissions.student', 'firstName lastName email');

        if (!assignment) {
            return res.status(404).json({
                success: false,
                message: 'Assignment not found'
            });
        }

        res.status(200).json({
            success: true,
            data: assignment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching assignment',
            error: error.message
        });
    }
};

// @desc    Create assignment
// @route   POST /api/assignments
// @access  Private (Teacher/Admin)
exports.createAssignment = async (req, res) => {
    try {
        req.body.createdBy = req.user.id;

        const assignment = await Assignment.create(req.body);

        const populatedAssignment = await Assignment.findById(assignment._id)
            .populate('course', 'title');

        res.status(201).json({
            success: true,
            data: populatedAssignment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating assignment',
            error: error.message
        });
    }
};

// @desc    Update assignment
// @route   PUT /api/assignments/:id
// @access  Private (Teacher/Admin)
exports.updateAssignment = async (req, res) => {
    try {
        let assignment = await Assignment.findById(req.params.id);

        if (!assignment) {
            return res.status(404).json({
                success: false,
                message: 'Assignment not found'
            });
        }

        assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: assignment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating assignment',
            error: error.message
        });
    }
};

// @desc    Delete assignment
// @route   DELETE /api/assignments/:id
// @access  Private (Teacher/Admin)
exports.deleteAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);

        if (!assignment) {
            return res.status(404).json({
                success: false,
                message: 'Assignment not found'
            });
        }

        await assignment.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Assignment deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting assignment',
            error: error.message
        });
    }
};

// @desc    Submit assignment
// @route   POST /api/assignments/:id/submit
// @access  Private (Student)
exports.submitAssignment = async (req, res) => {
    try {
        const { content } = req.body;
        const assignment = await Assignment.findById(req.params.id);

        if (!assignment) {
            return res.status(404).json({
                success: false,
                message: 'Assignment not found'
            });
        }

        // Create submission
        const submission = {
            student: req.user.id,
            content,
            submittedAt: new Date()
        };

        // Check for existing submission
        const existingSubmission = assignment.getSubmissionByStudent(req.user.id);
        if (existingSubmission) {
            existingSubmission.content = content;
            existingSubmission.submittedAt = new Date();
        } else {
            assignment.submissions.push(submission);
        }

        await assignment.save();

        res.status(201).json({
            success: true,
            message: 'Assignment submitted successfully',
            data: assignment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error submitting assignment',
            error: error.message
        });
    }
};

// @desc    Grade submission
// @route   PUT /api/assignments/:id/grade
// @access  Private (Teacher/Admin)
exports.gradeSubmission = async (req, res) => {
    try {
        const { studentId, grade, feedback } = req.body;
        const assignment = await Assignment.findById(req.params.id);

        if (!assignment) {
            return res.status(404).json({
                success: false,
                message: 'Assignment not found'
            });
        }

        const submission = assignment.submissions.find(
            sub => sub.student.toString() === studentId
        );

        if (!submission) {
            return res.status(404).json({
                success: false,
                message: 'Submission not found'
            });
        }

        submission.grade = grade;
        submission.feedback = feedback;
        submission.status = 'graded';
        submission.gradedAt = new Date();
        submission.gradedBy = req.user.id;

        await assignment.save();

        res.status(200).json({
            success: true,
            data: assignment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error grading submission',
            error: error.message
        });
    }
};

// @desc    Get student submissions
// @route   GET /api/assignments/student/:studentId
// @access  Private
exports.getStudentSubmissions = async (req, res) => {
    try {
        const assignments = await Assignment.find({})
            .populate({
                path: 'submissions',
                match: { student: req.params.studentId }
            });

        const submissions = assignments
            .map(assignment => ({
                assignmentId: assignment._id,
                title: assignment.title,
                course: assignment.course,
                dueDate: assignment.dueDate,
                submissions: assignment.submissions
            }))
            .filter(a => a.submissions.length > 0);

        res.status(200).json({
            success: true,
            count: submissions.length,
            data: submissions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching submissions',
            error: error.message
        });
    }
};
