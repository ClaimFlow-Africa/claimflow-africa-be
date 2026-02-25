const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Clinic = sequelize.define('Clinic', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING },
    contact_number: { type: DataTypes.STRING },
}, {
    tableName: 'clinics',
    timestamps: true
});

module.exports = Clinic;