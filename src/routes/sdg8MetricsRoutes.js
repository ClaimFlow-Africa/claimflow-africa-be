const express = require("express");
const router = express.Router();

const sdg8MetricsController = require("../controllers/sdg8MetricsController");

router.post("/", sdg8MetricsController.createMetric);
router.get("/", sdg8MetricsController.getMetrics);

module.exports = router;