const express = require("express");
const router = express.Router();
const claimController = require("../controllers/claimController");
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");

router.post(
  "/",
  verifyToken,
  authorizeRoles("admin", "billing_officer"),
  claimController.createClaim
);

router.get("/", verifyToken, claimController.getClaims);

module.exports = router;
