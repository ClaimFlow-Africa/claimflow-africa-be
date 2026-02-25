const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Clinic = require('./clinic');
const User = require('./user');

const Claim = sequelize.define('Claim', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    clinic_id: { type: DataTypes.INTEGER, references: { model: Clinic, key: 'id' } },
    user_id: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
    patient_name: { type: DataTypes.STRING, allowNull: false },
    patient_id: { type: DataTypes.STRING },
    claim_amount: { type: DataTypes.DECIMAL(12,2), allowNull: false },
    status: { type: DataTypes.ENUM('draft','submitted','denied','approved','paid'), defaultValue: 'draft' },
    denial_score: { type: DataTypes.DECIMAL(5,2), defaultValue: 0 },
    penalty_amount: { type: DataTypes.DECIMAL(12,2), defaultValue: 0 },
    submission_date: { type: DataTypes.DATE },
}, {
    tableName: 'claims',
    timestamps: true
});

Claim.belongsTo(Clinic, { foreignKey: 'clinic_id' });
Claim.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Claim;