const { DenialRule } = require("../models");

exports.createRule = async (req, res) => {
  try {
    const rule = await DenialRule.create(req.body);
    res.status(201).json(rule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllRules = async (req, res) => {
  try {
    const rules = await DenialRule.findAll();
    res.json(rules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRule = async (req, res) => {
  try {
    const rule = await DenialRule.findByPk(req.params.id);

    if (!rule)
      return res.status(404).json({ message: "Rule not found" });

    await rule.destroy();

    res.json({ message: "Rule deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};