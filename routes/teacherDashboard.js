var express = require('express');
var router = express.Router();
const AuthMiddleware = require('../middleware/auth');
const subjectController = require('../controllers/subjectController');
const teacherController = require('../controllers/teacherController');

router.get('/', AuthMiddleware.isAuthenticated, AuthMiddleware.authorizeRole('teacher'), (req, res) => {
    const email = req.user.email;
    res.render('teacherDashboard', {email});
});

router.get('/all-subjects', AuthMiddleware.isAuthenticated, AuthMiddleware.authorizeRole('teacher'), subjectController.getSubjectsForTeacher);

router.get('/classes', AuthMiddleware.isAuthenticated, AuthMiddleware.authorizeRole('teacher'), teacherController.getAllClasses);
router.get('/class/:class_id/students', AuthMiddleware.isAuthenticated, AuthMiddleware.authorizeRole('teacher'),teacherController.getStudentsInClass);
router.get('/grade/:student_id', AuthMiddleware.isAuthenticated, AuthMiddleware.authorizeRole('teacher'),teacherController.renderGradeForm);
router.post('/grade/:student_id', AuthMiddleware.isAuthenticated, AuthMiddleware.authorizeRole('teacher'),teacherController.submitGrade);

module.exports = router;