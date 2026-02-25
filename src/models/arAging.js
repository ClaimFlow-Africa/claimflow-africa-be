const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Claim = require('./claim');

const ARAging = sequelize.define('ARAging', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    claim_id: { type: DataTypes.INTEGER, references: { model: Claim, key: 'id' } },
    aging_bucket: { type: DataTypes.ENUM('0-30','31-60','61-90','90+'), allowNull: false },
}, {
    tableName: 'ar_aging',
    timestamps: true
});

ARAging.belongsTo(Claim, { foreignKey: 'claim_id' });

module.exports = ARAging;