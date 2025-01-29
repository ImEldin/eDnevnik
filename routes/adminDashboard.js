var express = require('express');
var router = express.Router();
const AuthMiddleware = require('../middleware/auth');
const registerController = require('../controllers/registerController');
const unitController = require('../controllers/unitController');
const subjectController = require('../controllers/subjectController');
const teacherController = require('../controllers/teacherController');
const addUserController = require('../controllers/addUserController');
const classController = require('../controllers/classController');

router.get('/', AuthMiddleware.isAuthenticated, AuthMiddleware.authorizeRole('admin'), (req, res) => {
    const email = req.user.email;
    res.render('adminDashboard', {email});
});

router.post('/', AuthMiddleware.isAuthenticated, AuthMiddleware.authorizeRole('admin'), registerController.registerUser);

router.get('/units', AuthMiddleware.isAuthenticated, AuthMiddleware.authorizeRole('admin'), unitController.getUnits);
router.get('/add-unit', AuthMiddleware.isAuthenticated, AuthMiddleware.authorizeRole('admin'), unitController.renderAddUnits);
router.post('/add-unit', AuthMiddleware.isAuthenticated, AuthMiddleware.authorizeRole('admin'), unitController.addUnit);

router.get('/subjects', AuthMiddleware.isAuthenticated, AuthMiddleware.authorizeRole('admin'), subjectController.getSubjects);
router.post('/subjects', AuthMiddleware.isAuthenticated, AuthMiddleware.authorizeRole('admin'), subjectController.addSubject);
router.get('/subject/:id/teachers', AuthMiddleware.isAuthenticated, AuthMiddleware.authorizeRole('admin'), teacherController.getTeacherBySubject);

router.get('/add-user', AuthMiddleware.isAuthenticated, AuthMiddleware.authorizeRole('admin'), addUserController.renderAddUserPage);
router.get('/add-student', AuthMiddleware.isAuthenticated, AuthMiddleware.authorizeRole('admin'), addUserController.renderAddStudentPage);
router.post('/add-student', AuthMiddleware.isAuthenticated, AuthMiddleware.authorizeRole('admin'), addUserController.addStudent);
router.get('/add-teacher', AuthMiddleware.isAuthenticated, AuthMiddleware.authorizeRole('admin'), addUserController.renderAddTeacherPage);
router.post('/add-teacher', AuthMiddleware.isAuthenticated, AuthMiddleware.authorizeRole('admin'), addUserController.addTeacher);

router.get('/add-subject/:unit_id', classController.renderAddSubjectForm);
router.post('/add-class/:unit_id', classController.addClass);

module.exports = router;