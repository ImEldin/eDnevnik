const pool = require('../config/db');

const addUserModel = {

    async addStudent(id, name, surname, date_of_birth, identification_num, parent_contact, address, unit_id){
        const query = `
            INSERT INTO student 
            (id, name, surname, date_of_birth, identification_num, parent_contact, address, unit_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
        `;
        const values = [id, name, surname, date_of_birth, identification_num, parent_contact, address, unit_id];
        try {
            await pool.query(query, values);
        }
        catch (error) {
            console.error('Database error adding student:', error.message);
            throw new Error('Failed to add student.');
        }
    },

    async addTeacher(id, name, surname, number, subject_id){
        const query = `
            INSERT INTO teacher 
            (id, name, surname, number, subject_id)
            VALUES ($1, $2, $3, $4, $5);
        `;
        const values = [id, name, surname, number, subject_id];
        try {
            await pool.query(query, values);
        }
        catch (error) {
            console.error('Database error adding teacher:', error.message);
            throw new Error('Failed to add teacher.');
        }
    }
};

module.exports = addUserModel;