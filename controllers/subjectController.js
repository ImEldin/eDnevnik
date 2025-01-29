const SubjectModel = require('../models/subjectModel');

const subjectController = {

    async getSubjects(req, res){
        try {
            const subjects = await SubjectModel.getAllSubjects();
            res.render('subjects', { subjects });
        } catch (error) {
            console.error('Error fetching subjects:', error.message);
            res.status(500).send('Failed to load subjects.');
        }
    },

    async addSubject(req, res) {
        try {
            const { subject_name } = req.body;
            await SubjectModel.addSubject(subject_name);
            res.redirect('/admin-dashboard/subjects');
        }
        catch (error) {
            console.error('Error adding subject:', error.message);
            res.status(500).send('Failed to add subject.');
        }
    },

    async getSubjectsForTeacher(req, res){
        try {
            const teacherId = req.user.userId;
            console.log(teacherId);

            const subjects = await SubjectModel.getSubjectsByTeacherId(teacherId);

            res.render('teacherSubjects', { subjects : subjects});
        }
        catch (error) {
            console.error('Error fetching subjects for teacher:', error.message);
            res.status(500).send('Failed to fetch subjects.');
        }
    }
};

module.exports = subjectController;