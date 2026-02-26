const { PenaltyRule } = require("../models");

exports.createPenalty = async (req, res) => {
  try {
    const penalty = await PenaltyRule.create(req.body);
    res.status(201).json(penalty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPenalties = async (req, res) => {
  try {
    const penalties = await PenaltyRule.findAll();
    res.json(penalties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};