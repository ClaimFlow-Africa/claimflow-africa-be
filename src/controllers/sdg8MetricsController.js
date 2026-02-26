const { SDG8Metrics } = require("../models");

exports.createMetric = async (req, res) => {
  try {
    const metric = await SDG8Metrics.create(req.body);
    res.status(201).json(metric);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMetrics = async (req, res) => {
  try {
    const metrics = await SDG8Metrics.findAll();
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};