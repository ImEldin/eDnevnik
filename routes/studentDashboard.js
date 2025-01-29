var express = require('express');
var router = express.Router();
const AuthMiddleware = require('../middleware/auth');
const userController = require('../controllers/userController');

router.get('/', AuthMiddleware.isAuthenticated, AuthMiddleware.authorizeRole('student'), (req, res) => {
    const email = req.user.email;
    res.render('studentDashboard', {email});
});

router.get('/subjects', AuthMiddleware.isAuthenticated, AuthMiddleware.authorizeRole('student'), userController.getUserSubjects);
router.get('/subjects/:subject_id/grades', AuthMiddleware.isAuthenticated, AuthMiddleware.authorizeRole('student'), userController.getSubjectGrades);

module.exports = router;