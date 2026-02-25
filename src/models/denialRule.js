const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const DenialRule = sequelize.define('DenialRule', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rule_name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    severity: { type: DataTypes.ENUM('low','medium','high'), defaultValue: 'medium' },
}, {
    tableName: 'denial_rules',
    timestamps: true
});

module.exports = DenialRule;