const pool = require('../config/db');

const RegisterModel = {

    async createAccount(email, password, role) {
        const query = `INSERT INTO users (email, password, role) VALUES ($1, $2, $3);`;
        const values = [email, password, role];
        try {
            await pool.query(query, values);
        }
        catch (error) {
            console.error('Error creating user: ', + error);
            throw error;
        }
    },
};

module.exports = RegisterModel;