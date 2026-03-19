const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Clinic = require('./clinic');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    clinic_id: { 
        type: DataTypes.INTEGER,
        references: { model: Clinic, key: 'id' }
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    role: { type: DataTypes.ENUM('billing_officer','clinic_manager','pharmacist','regulator'), allowNull: true },
    password: { type: DataTypes.STRING, allowNull: false },
    pin_code: { type: DataTypes.STRING(10) },
    otp_code: { type: DataTypes.STRING(4) },
    otp_expires: { type: DataTypes.DATE },
}, {
    tableName: 'users',
    timestamps: true
});

User.belongsTo(Clinic, { foreignKey: 'clinic_id' });

module.exports = User;