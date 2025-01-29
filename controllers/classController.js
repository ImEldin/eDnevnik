const ClassModel = require('../models/classModel');

const classController = {
    async renderAddSubjectForm (req, res){
        try {
            const { unit_id } = req.params;

            const subjects = await ClassModel.getAllSubjects();
            const teachers = await ClassModel.getAllTeachers();

            res.render('add-subject', { subjects, teachers, unit_id });
        } catch (error) {
            console.error('Error rendering add subject form:', error.message);
            res.status(500).send('Failed to load form.');
        }
    },

    async addClass(req, res){
        try {
            const { unit_id } = req.params;
            const { teacher_id, subject_id } = req.body;

            if (!unit_id || !teacher_id || !subject_id) {
                return res.status(400).json({ error: 'All fields are required.' });
            }

            const newClass = await ClassModel.addClass({ teacher_id, subject_id, unit_id });
            res.redirect('/admin-dashboard/units/');
        } catch (error) {
            console.error('Error adding class:', error.message);
            res.status(500).json({ error: 'Failed to add class.' });
        }
    }
};

module.exports = classController;