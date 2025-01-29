const pool = require('../config/db');

const classModel = {

    async getAllSubjects(){
        try {
            const query = 'SELECT id, subject_name FROM subject ORDER BY subject_name ASC';
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error('Database error fetching subjects:', error.message);
            throw new Error('Failed to fetch subjects.');
        }
    },

    async getAllTeachers () {
        try {
            const query = 'SELECT id, name, surname FROM teacher ORDER BY surname, name ASC';
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error('Database error fetching teachers:', error.message);
            throw new Error('Failed to fetch teachers.');
        }
    },

    async addClass ({ teacher_id, subject_id, unit_id }) {
        try {
            const query = `
            INSERT INTO classes (teacher_id, subject_id, unit_id)
            VALUES ($1, $2, $3)
            RETURNING id, teacher_id, subject_id, unit_id;
        `;
            const values = [teacher_id, subject_id, unit_id];
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Database error adding class:', error.message);
            throw new Error('Failed to add class.');
        }
    }

};

module.exports = classModel;