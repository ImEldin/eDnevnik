require('dotenv').config();
const jwt = require('jsonwebtoken');
const loginModel = require('../models/loginModel');

const loginController = {

    async renderLoginPage(req, res) {
        return res.render('login', {error: null});
    },

    async userLogin(req, res) {
        const { email, password } = req.body;
        const user = await loginModel.getUser(email);

        if(!user){
            return res.render('login', {error: 'Invalid email'});
        }

        const isPasswordValid = await loginModel.comparePassword(password, user.password);
        if(!isPasswordValid){
            return res.render('login', {error: 'Incorrect password'});
        }

        const token = jwt.sign(
            {userId: user.id, email: user.email, role: user.role},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000
        });

        if(user.role === 'admin'){
            return res.redirect('/admin-dashboard');
        }
        else if(user.role === 'teacher'){
            return res.redirect('/teacher-dashboard');
        }
        else if(user.role === 'student'){
            return res.redirect('/student-dashboard');
        }
    }
};

module.exports = loginController;