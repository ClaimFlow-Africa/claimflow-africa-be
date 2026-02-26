const { Clinic } = require('../models');

// Create a new clinic
exports.createClinic = async (req, res) => {
    try {
        const { name, address, contact_number } = req.body;

        const clinic = await Clinic.create({
            name,
            address,
            contact_number
        });

        res.status(201).json({
            message: 'Clinic created successfully',
            clinic
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating clinic', error: error.message });
    }
};

// Get all clinics
exports.getClinics = async (req, res) => {
    try {
        const clinics = await Clinic.findAll();
        res.status(200).json(clinics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching clinics', error: error.message });
    }
};

// Get a clinic by ID
exports.getClinicById = async (req, res) => {
    try {
        const { id } = req.params;
        const clinic = await Clinic.findByPk(id);

        if (!clinic) {
            return res.status(404).json({ message: 'Clinic not found' });
        }

        res.status(200).json(clinic);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching clinic', error: error.message });
    }
};