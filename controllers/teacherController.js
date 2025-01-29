const TeacherModel = require('../models/teacherModel');
const SubjectModel = require('../models/subjectModel');

const teacherController = {

    async getTeacherBySubject(req, res) {
        try {
            const { id : subjectId } = req.params;
            console.log(subjectId);

            const teachers = await TeacherModel.getTeacherBySubjectId(subjectId);
            const result = await SubjectModel.getSubjectById(subjectId);
            const subjectName = result.subject_name;

            res.render('teachers', { teachers, subjectId, subjectName});
        }
        catch (error) {
            console.error('Error fetching teachers:', error.message);
            res.status(500).send('Failed to fetch teachers.');
        }
    },

    async getAllClasses(req, res){
        try {
            const teacherId = req.user.userId;

            if (!teacherId) {
                return res.status(400).json({ error: 'Teacher ID is required.' });
            }

            const classes = await TeacherModel.getClassesByTeacherId(teacherId);
            res.render('teacher-classes', { classes });
        }
        catch (error) {
            console.error('Error fetching classes:', error.message);
            res.status(500).send('Failed to load classes.');
        }
    },

    async getStudentsInClass(req, res){
        try {
            const { class_id } = req.params;

            if (!class_id) {
                return res.status(400).json({ error: 'Class ID is required.' });
            }

            const students = await TeacherModel.getStudentsByClassId(class_id);
            res.render('class-students', { students, class_id });
        }
        catch (error) {
            console.error('Error fetching students:', error.message);
            res.status(500).send('Failed to load students.');
        }
    },

     async renderGradeForm(req, res){
         try {
             const { student_id } = req.params;
             const teacherId = req.user.userId;

             const subjects = await TeacherModel.getSubjectsByTeacherId(teacherId);

             res.render('grade-student', { subjects, student_id });
         }
         catch (error) {
             console.error('Error rendering grade form:', error.message);
             res.status(500).send('Failed to load form.');
         }
    },

    async submitGrade(req, res){
        try {
            const { student_id } = req.params;
            const { subject_id, grade, comment } = req.body;
            const teacherId = req.user.userId;

            const newGrade = await TeacherModel.addGrade({
                student_id,
                subject_id,
                teacher_id: teacherId,
                grade,
                comment,
            });

            res.redirect(`/teacher-dashboard/classes`);
        }
        catch (error) {
            console.error('Error submitting grade:', error.message);
            res.status(500).json({ error: 'Failed to add grade.' });
        }
    }
};

module.exports = teacherController;