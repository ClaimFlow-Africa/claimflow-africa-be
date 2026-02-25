const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const PenaltyRule = sequelize.define('PenaltyRule', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rule_name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    penalty_percent: { type: DataTypes.DECIMAL(5,2), allowNull: false },
}, {
    tableName: 'penalty_rules',
    timestamps: true
});

module.exports = PenaltyRule;