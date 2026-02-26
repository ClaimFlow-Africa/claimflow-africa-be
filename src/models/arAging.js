const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Claim = require('./claim');


const ARAging = sequelize.define('ARAging', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    claim_id: { type: DataTypes.INTEGER, references: { model: Claim, key: 'id' }, allowNull: false },
    aging_days: { type: DataTypes.INTEGER, defaultValue: 0 },
    aging_bucket: { type: DataTypes.STRING(20), allowNull: false }  // ✅ updated
}, {
    tableName: 'ar_aging',
    timestamps: true
});


ARAging.belongsTo(Claim, { foreignKey: 'claim_id' });


module.exports = ARAging;