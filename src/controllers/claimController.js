const pool = require("../config/db");

exports.createClaim = async (req, res) => {
  try {
    const { patient_name, claim_amount } = req.body;

    const result = await pool.query(
      "INSERT INTO claims (patient_name, claim_amount) VALUES ($1, $2) RETURNING *",
      [patient_name, claim_amount]
    );

    res.status(201).json({
      message: "Claim created successfully",
      claim: result.rows[0],
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getClaims = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM claims");

    res.json(result.rows);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
