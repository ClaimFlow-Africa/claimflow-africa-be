const pool = require("../config/db");

exports.validateClaim = async (claim) => {
  let errors = [];

  if (claim.claim_amount > 1000000) {
    errors.push("Claim amount exceeds allowed limit");
  }

  if (!claim.diagnosis_code) {
    errors.push("Diagnosis code is required");
  }

  if (!claim.treatment_code) {
    errors.push("Treatment code is required");
  }

  const [duplicateRows] = await pool.query(
    `SELECT * FROM claims 
     WHERE patient_id = ?
     AND submission_date >= NOW() - INTERVAL 1 DAY`,
    [claim.patient_id]
  );

  if (duplicateRows.length > 1) {
    errors.push("Duplicate claim detected within 24 hours");
  }

  return errors;
};