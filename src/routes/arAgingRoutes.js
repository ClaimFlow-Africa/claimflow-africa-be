const express = require("express");
const router = express.Router();

const { createARAging, getARAging } = require("../controllers/arAgingController"); // destructure

router.post("/", createARAging);
router.get("/", getARAging);

module.exports = router;