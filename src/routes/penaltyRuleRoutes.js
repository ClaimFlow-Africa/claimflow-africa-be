const express = require("express");
const router = express.Router();

const penaltyRuleController = require("../controllers/penaltyRuleController");

router.post("/", penaltyRuleController.createPenalty);
router.get("/", penaltyRuleController.getAllPenalties);

module.exports = router;