const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Clinic = require('./clinic');

const SDG8Metrics = sequelize.define('SDG8Metrics', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    clinic_id: { type: DataTypes.INTEGER, references: { model: Clinic, key: 'id' } },
    month: { type: DataTypes.STRING, allowNull: false }, // format: YYYY-MM
    salary_delay_incidents: { type: DataTypes.INTEGER, defaultValue: 0 },
    staff_overtime_hours: { type: DataTypes.DECIMAL(6,2), defaultValue: 0 },
    penalties_avoided: { type: DataTypes.DECIMAL(12,2), defaultValue: 0 },
    claims_saved: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
    tableName: 'sdg8_metrics',
    timestamps: true
});

SDG8Metrics.belongsTo(Clinic, { foreignKey: 'clinic_id' });

module.exports = SDG8Metrics;