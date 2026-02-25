const { sequelize } = require('../config/db');

const Clinic = require('./clinic');
const User = require('./user');
const Claim = require('./claim');
const DenialRule = require('./denialRule');
const PenaltyRule = require('./penaltyRule');
const ARAging = require('./arAging');
const SDG8Metrics = require('./sdg8Metrics');
const AuditLog = require('./auditLog');

const syncModels = async () => {
    try {
        await sequelize.sync({ alter: true }); // use { force: true } to drop and recreate tables
        console.log('All models synced to database');
    } catch (err) {
        console.error('Error syncing models:', err);
    }
};

module.exports = {
    Clinic,
    User,
    Claim,
    DenialRule,
    PenaltyRule,
    ARAging,
    SDG8Metrics,
    AuditLog,
    syncModels
};