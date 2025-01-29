const UnitModel = require('../models/unitModel');

const unitController =  {

    async renderAddUnits(req, res) {
        return res.render('addUnit');
    },

    async getUnits(req, res) {
        try {
            const units = await UnitModel.getAllUnits();
            res.render('units', { units: units });
        }
        catch (error) {
            console.error('Error fetching units:', error.message);
            res.status(500).json({ error: 'Failed to fetch units.' });
        }
    },

    async addUnit(req, res){
        try {
            const { unit_name, number_of_students } = req.body;

            await UnitModel.createUnit(unit_name, number_of_students);
            res.redirect('/admin-dashboard/units');
        }
        catch (error) {
            console.error('Error adding unit:', error.message);
            res.status(500).json({ error: 'Failed to add unit.' });
        }
    }
}

module.exports = unitController;