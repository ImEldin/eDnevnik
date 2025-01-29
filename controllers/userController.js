const UserModel = require('../models/userModel');

const userController = {

    async getUserSubjects(req, res) {
        try {
            const userId = req.user.userId; // Extract user ID from the authenticated user

            const subjects = await UserModel.getSubjectsByUserId(userId);
            res.render('user-subjects', { subjects });
        } catch (error) {
            console.error('Error fetching user subjects:', error.message);
            res.status(500).send('Failed to load subjects.');
        }
    },

    async getSubjectGrades(req, res){
        try {
            const { subject_id } = req.params; // Extract subject ID from route
            const userId = req.user.userId; // Extract user ID from the authenticated user

            const grades = await UserModel.getGradesBySubject(userId, subject_id);
            res.render('user-grades', { grades, subject_id });
        } catch (error) {
            console.error('Error fetching grades:', error.message);
            res.status(500).send('Failed to load grades.');
        }
    }
};

module.exports = userController;