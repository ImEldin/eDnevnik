const pool = require('../config/db');

const userModel = {

    async getSubjectsByUserId(userId){
        try {
            const query = `
            SELECT DISTINCT s.id, s.subject_name
            FROM grades g
            INNER JOIN subject s ON g.subject_id = s.id
            WHERE g.student_id = $1
            ORDER BY s.subject_name ASC;
        `;
            const values = [userId];
            const result = await pool.query(query, values);
            return result.rows;
        } catch (error) {
            console.error('Database error fetching subjects:', error.message);
            throw new Error('Failed to fetch subjects.');
        }
    },

    async getGradesBySubject(userId, subjectId){
        try {
            const query = `
            SELECT g.grade, g.comment, g.date_assigned
            FROM grades g
            WHERE g.student_id = $1 AND g.subject_id = $2
            ORDER BY g.date_assigned DESC;
        `;
            const values = [userId, subjectId];
            const result = await pool.query(query, values);
            return result.rows;
        } catch (error) {
            console.error('Database error fetching grades:', error.message);
            throw new Error('Failed to fetch grades.');
        }
    }
};

module.exports = userModel;