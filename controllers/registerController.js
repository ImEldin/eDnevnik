const bcrypt = require('bcrypt');
const registerModel = require('../models/registerModel');
const loginModel = require('../models/loginModel');

const registerController = {

    async registerUser(req, res) {

        const { email, password, role } = req.body;

        try{
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await loginModel.getUser(email);
            if(user) {
                return res.status(400).send('User already exists');
            }

            await registerModel.createAccount(email, hashedPassword, role);

            return res.redirect('/admin-dashboard');
        }
        catch (error) {
            return res.status(400).send('Error registering user' + error);
        }
    }
};

module.exports = registerController;