const { 
  Claim, DenialRule, PenaltyRule, 
  ARAging, SDG8Metrics, AuditLog 
} = require("../models");
const crypto = require("crypto"); // for AuditLog hash

// Helper to calculate AR Aging bucket
function calculateAgingBucket(service_date) {
  const today = new Date();
  const serviceDate = new Date(service_date);
  const diffTime = today - serviceDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 30) return "0-30";
  if (diffDays <= 60) return "31-60";
  if (diffDays <= 90) return "61-90";
  return "90+";
}

exports.submitClaim = async (req, res) => {
  try {
    const { patientName, patientId, amount, diagnosisCode, procedureCode, serviceDate } = req.body;

    // Authenticated user info
    const userId = req.user.id;
    const clinicId = req.user.clinic_id;

    // 1️⃣ Create Claim
    const claim = await Claim.create({
      clinic_id: clinicId,
      user_id: userId,
      patient_name: patientName,
      patient_id: patientId,
      claim_amount: amount,
      status: "submitted",
      submission_date: new Date()
    });

    let denialRisk = false;
    let penaltyAmount = 0;

    // 2️⃣ Check Denial Rules
    const denialRules = await DenialRule.findAll();
    for (let rule of denialRules) {
      if (rule.diagnosis_code === diagnosisCode || rule.procedure_code === procedureCode) {
        denialRisk = true;
        claim.status = "denied";
        await claim.save();
        break;
      }
    }

    // 3️⃣ Apply Penalty Rules if denied
    if (denialRisk) {
      const penaltyRules = await PenaltyRule.findAll();
      for (let rule of penaltyRules) {
        penaltyAmount += (rule.percentage / 100) * amount;
      }
      claim.penalty_amount = penaltyAmount;
      await claim.save();
    }

    // 4️⃣ Create AR Aging record automatically
    const aging_bucket = calculateAgingBucket(serviceDate || new Date());
    await ARAging.create({
      claim_id: claim.id,
      aging_bucket,
      outstanding_amount: amount - penaltyAmount,
      aging_days: 0,
      service_date: serviceDate || new Date()
    });

    // 5️⃣ Update SDG8 Metrics
    await SDG8Metrics.create({
      claim_id: claim.id,
      revenue_recovered: amount - penaltyAmount,
      penalty_amount: penaltyAmount,
      denial_prevented: denialRisk ? 1 : 0,
      month: new Date().getMonth() + 1,   // required field
      year: new Date().getFullYear()      // required field
    });

    // 6️⃣ Create Audit Log with SHA256 hash
    const auditData = `${claim.id}-${userId}-${new Date().toISOString()}`;
    const hash = crypto.createHash("sha256").update(auditData).digest("hex");

    await AuditLog.create({
      table_name: "claims",
      record_id: claim.id,
      action: "insert",
      performed_by: userId,
      hash_sha256: hash
    });

    res.status(201).json({
      message: "Claim submitted successfully",
      claim,
      denialRisk,
      penaltyAmount
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error submitting claim",
      error: error.message
    });
  }
};