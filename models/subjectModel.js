const pool = require('../config/db');

const subjectModel = {

    async getAllSubjects() {
        const query = 'SELECT * FROM subject ORDER BY subject_name ASC;';
        try {
            const result = await pool.query(query);
            return result.rows;
        }
        catch (error) {
            console.error('Database error fetching subjects:', error.message);
            throw new Error('Failed to fetch subjects.');
        }
    },

    async addSubject(subjectName) {
        const query = 'INSERT INTO subject (subject_name) VALUES ($1);';
        const values = [subjectName];
        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        }
        catch (error) {
            console.error('Database error adding subject:', error.message);
            throw new Error('Failed to add subject.');
        }
    },

    async getSubjectById(subjectId) {

        const query = 'SELECT * FROM subject WHERE id = $1';
        const values = [subjectId];

        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        }
        catch (error) {
            console.error('Database error fetching subject by ID:', error.message);
            throw new Error('Failed to fetch subject.');
        }
    },

    async getSubjectsByTeacherId (teacherId) {
        const query = `
            SELECT s.id, s.subject_name
            FROM subject s
            INNER JOIN teacher t ON t.subject_id = s.id
            WHERE t.id = $1
            ORDER BY s.subject_name ASC;
        `;
        const values = [teacherId];
        try {
            const result = await pool.query(query, values);
            return result.rows;
        } catch (error) {
            console.error('Database error fetching subjects for teacher:', error.message);
            throw new Error('Failed to fetch subjects.');
        }
    }
};

module.exports = subjectModel;

