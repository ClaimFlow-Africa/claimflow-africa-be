const { AuditLog } = require("../models");

exports.createLog = async (req, res) => {
  try {
    const log = await AuditLog.create(req.body);
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLogs = async (req, res) => {
  try {
    const logs = await AuditLog.findAll();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};