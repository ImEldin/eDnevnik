var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginController');
const AuthMiddleware = require('../middleware/auth');

router.get('/', AuthMiddleware.isLoggedIn, loginController.renderLoginPage);

router.post('/', loginController.userLogin);

module.exports = router;
