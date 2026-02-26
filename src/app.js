// src/app.js

const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import database (this runs model sync)
require("./models");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoutes");
const clinicRoutes = require("./routes/clinicRoutes");
const userRoutes = require("./routes/userRoutes");
const claimRoutes = require("./routes/claimRoutes");
const denialRuleRoutes = require("./routes/denialRuleRoutes");
const penaltyRuleRoutes = require("./routes/penaltyRuleRoutes");
const arAgingRoutes = require("./routes/arAgingRoutes");
const sdg8MetricsRoutes = require("./routes/sdg8MetricsRoutes");
const auditLogRoutes = require("./routes/auditLogRoutes");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/clinics", clinicRoutes);
app.use("/api/users", userRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/denial-rules", denialRuleRoutes);
app.use("/api/penalty-rules", penaltyRuleRoutes);
app.use("/api/ar-aging", arAgingRoutes);
app.use("/api/sdg8-metrics", sdg8MetricsRoutes);
app.use("/api/audit-logs", auditLogRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

module.exports = app;