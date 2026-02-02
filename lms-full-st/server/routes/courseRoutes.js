const express = require('express');
const router = express.Router();
const {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    getCoursesByInstructor
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
    .get(getAllCourses)
    .post(protect, authorize('teacher', 'admin'), createCourse);

router.route('/:id')
    .get(getCourse)
    .put(protect, authorize('teacher', 'admin'), updateCourse)
    .delete(protect, authorize('teacher', 'admin'), deleteCourse);

router.get('/instructor/:instructorId', getCoursesByInstructor);

module.exports = router;
