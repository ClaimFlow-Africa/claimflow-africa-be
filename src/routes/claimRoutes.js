const express = require("express");
const router = express.Router();
const claimController = require("../controllers/claimController");
const { protect, permit } = require("../middleware/authMiddleware");

// Only authenticated users with these roles can submit claims
router.post("/", protect, permit("billing_officer", "clinic_manager"), claimController.submitClaim);

module.exports = router;