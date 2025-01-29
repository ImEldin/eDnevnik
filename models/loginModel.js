const bcrypt = require('bcrypt');
const pool = require('../config/db');

const logIn = {

    async getUser(email) {
        const query = `SELECT * FROM users WHERE email = $1;`;
        const values = [email];
        try{
            const user = await pool.query(query, values);

            if(user.rows.length === 0){
                return null;
            }

            return user.rows[0];
        }
        catch(error){
            console.error('Error fetching user: ' + error);
            throw error;
        }
    },

    async comparePassword(inputPassword, storedPassword) {
        try{
            return await bcrypt.compare(inputPassword, storedPassword);
        }
        catch(error){
            console.error('Error comparing passwords: ' + error);
            throw error;
        }
    }
};

module.exports = logIn;