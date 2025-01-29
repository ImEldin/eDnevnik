const pool = require('../config/db');

const teacherModel = {

    async getTeacherBySubjectId(subjectId) {
        const query = `
            SELECT t.id, t.name, t.surname, t.number, s.subject_name
            FROM teacher t
            INNER JOIN subject s ON t.subject_id = s.id
            WHERE s.id = $1
            ORDER BY t.surname, t.name;
        `;
        const values = [subjectId];

        try {
            const result = await pool.query(query, values);
            return result.rows;
        }
        catch (error) {
            console.error('Database error fetching teachers:', error.message);
            throw new Error('Failed to fetch teachers.');
        }
    },

    async getClassesByTeacherId(teacherId) {
        try {
            const query = `
            SELECT c.id, c.unit_id, u.unit_name
            FROM classes c
            INNER JOIN unit u ON c.unit_id = u.id
            WHERE c.teacher_id = $1
            ORDER BY u.unit_name ASC;
        `;
            const values = [teacherId];
            const result = await pool.query(query, values);
            return result.rows;
        } catch (error) {
            console.error('Database error fetching classes:', error.message);
            throw new Error('Failed to fetch classes.');
        }
    },

    async getStudentsByClassId(classId) {
        try {
            const query = `
            SELECT s.id, s.name, s.surname
            FROM student s
            WHERE s.unit_id = $1
            ORDER BY s.surname, s.name ASC;
        `;
            const values = [classId];
            const result = await pool.query(query, values);
            return result.rows;
        }
        catch (error) {
            console.error('Database error fetching students:', error.message);
            throw new Error('Failed to fetch students.');
        }
    },

    async getSubjectsByTeacherId(teacherId){
        try {
            const query = `
            SELECT s.id, s.subject_name
            FROM subject s
            INNER JOIN classes c ON c.subject_id = s.id
            WHERE c.teacher_id = $1
            GROUP BY s.id, s.subject_name
            ORDER BY s.subject_name ASC;
        `;
            const values = [teacherId];
            const result = await pool.query(query, values);
            console.log('Query Result:', result.rows);
            return result.rows;
        }
        catch (error) {
            console.error('Database error fetching subjects:', error.message);
            throw new Error('Failed to fetch subjects.');
        }
    },

    async addGrade({ student_id, subject_id, teacher_id, grade, comment }) {
        try {
            const query = `
            INSERT INTO grades (student_id, subject_id, teacher_id, grade, comment, date_assigned)
            VALUES ($1, $2, $3, $4, $5, NOW())
            RETURNING id, student_id, subject_id, teacher_id, grade, comment, date_assigned;
        `;
            const values = [student_id, subject_id, teacher_id, grade, comment];
            const result = await pool.query(query, values);
            return result.rows[0];
        }
        catch (error) {
            console.error('Database error adding grade:', error.message);
            throw new Error('Failed to add grade.');
        }
    }
};

module.exports = teacherModel;