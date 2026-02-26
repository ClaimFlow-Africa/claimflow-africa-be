const { ARAging } = require("../models");

// create ARAging
const createARAging = async (req, res) => {
  try {
    const { claim_id, service_date, amount } = req.body;

    // calculate aging bucket automatically
    const aging_bucket = calculateAgingBucket(service_date);

    const data = await ARAging.create({
      claim_id,
      service_date,
      amount,
      aging_bucket
    });

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all ARAging
const getARAging = async (req, res) => {
  try {
    const data = await ARAging.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Make sure you export **as an object**
module.exports = { createARAging, getARAging };