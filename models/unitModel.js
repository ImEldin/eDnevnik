const pool = require('../config/db');

const unitModel = {

    async getAllUnits() {
        const query = 'SELECT * FROM unit ORDER BY unit_name ASC';

        try {
            const result = await pool.query(query);
            return result.rows;
        }
        catch (error) {
            console.error('Database error fetching units:', error.message);
            throw new Error('Failed to fetch units from the database.');
        }
    },

    async createUnit (unit_name, number_of_students) {

        const query = 'INSERT INTO unit (unit_name, number_of_students) VALUES ($1, $2);';
        const values = [unit_name, number_of_students];

        try {
            const result = await pool.query(query, values);
            return result.rows[0];
        }
        catch (error) {
            console.error('Database error adding unit:', error.message);
            throw new Error('Failed to add unit to the database.');
        }
    }
}

module.exports = unitModel;