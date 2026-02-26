const express = require('express');
const router = express.Router();
const clinicController = require('../controllers/clinicController');

// Optional: if only admin can create clinics, later add auth middleware
// const { protect, permit } = require('../middleware/authMiddleware');

// Routes
router.post('/', /* protect, permit('admin'), */ clinicController.createClinic);
router.get('/', clinicController.getClinics);
router.get('/:id', clinicController.getClinicById);

module.exports = router;