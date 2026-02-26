const express = require("express");
const router = express.Router();

const denialRuleController = require("../controllers/denialRuleController");

router.post("/", denialRuleController.createRule);
router.get("/", denialRuleController.getAllRules);
router.delete("/:id", denialRuleController.deleteRule);

module.exports = router;