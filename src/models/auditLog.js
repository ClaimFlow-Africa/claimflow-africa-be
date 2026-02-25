const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user');

const AuditLog = sequelize.define('AuditLog', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    table_name: { type: DataTypes.STRING, allowNull: false },
    record_id: { type: DataTypes.INTEGER, allowNull: false },
    action: { type: DataTypes.ENUM('insert','update','delete'), allowNull: false },
    performed_by: { type: DataTypes.INTEGER, references: { model: User, key: 'id' } },
    hash_sha256: { type: DataTypes.CHAR(64), allowNull: false },
}, {
    tableName: 'audit_logs',
    timestamps: true
});

AuditLog.belongsTo(User, { foreignKey: 'performed_by' });

module.exports = AuditLog;