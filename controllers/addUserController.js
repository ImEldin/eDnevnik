const AddUserModel = require('../models/AddUserModel');
const UnitModel = require('../models/UnitModel');
const RegisterModel = require('../models/RegisterModel');
const loginModel = require("../models/loginModel");
const SubjectModel = require('../models/SubjectModel');
const bcrypt = require("bcrypt");

const addUserController = {

    async renderAddUserPage(req, res) {
        res.render('addUser');
    },

    async renderAddStudentPage(req, res) {
        const units = await UnitModel.getAllUnits();

        return res.render('addStudent', { units: units });
    },

    async renderAddTeacherPage(req, res) {
        const subjects = await SubjectModel.getAllSubjects();

        return res.render('addTeacher', { subjects: subjects });
    },

    async addStudent(req, res) {
        try {
            const { email, password, name, surname, date_of_birth, identification_num, parent_contact, address, unit_id } = req.body;


            const user = await loginModel.getUser(email);
            if(user) {
                return res.status(400).send('User already exists');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await RegisterModel.createAccount(email, hashedPassword, 'student');

            const user1 = await loginModel.getUser(email);
            const user_id = user1.id;

            await AddUserModel.addStudent(user_id, name, surname, date_of_birth, identification_num, parent_contact, address, unit_id)

            res.redirect('/admin-dashboard/add-user');
        }
        catch (error) {
            console.error('Error adding student:', error.message);
            res.status.send( 'Failed to add student.' );
        }
    },

    async addTeacher(req, res) {
        try {
            const { email, password, name, surname, number, subject_id} = req.body;

            const user = await loginModel.getUser(email);
            if(user) {
                return res.status(400).send('User already exists');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await RegisterModel.createAccount(email, hashedPassword, 'teacher');

            const user1 = await loginModel.getUser(email);
            const user_id = user1.id;

            await AddUserModel.addTeacher(user_id, name, surname, number, subject_id);

            res.redirect('/admin-dashboard/add-user');
        }
        catch (error) {
            console.error('Error adding teacher:', error.message);
            res.status.send( 'Failed to add teacher.' );
        }
    }
};

module.exports = addUserController;