// src/app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();


// Import database to ensure models are synced
const db = require("./models");


// Import routes
const authRoutes = require("./routes/authRoutes"); // Authentication
const clinicRoutes = require("./routes/clinicRoutes");
const userRoutes = require("./routes/userRoutes");
const claimRoutes = require("./routes/claimRoutes");
const denialRuleRoutes = require("./routes/denialRuleRoutes");
const penaltyRuleRoutes = require("./routes/penaltyRuleRoutes");
const arAgingRoutes = require("./routes/arAgingRoutes");
const sdg8MetricsRoutes = require("./routes/sdg8MetricsRoutes");
const auditLogRoutes = require("./routes/auditLogRoutes");


// Optional: import error handling middleware
// const { errorHandler } = require("./middleware/errorMiddleware");


const app = express();


// Global Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);           // Authentication
app.use("/api/clinics", clinicRoutes);      // Clinics
app.use("/api/users", userRoutes);          // Users
app.use("/api/claims", claimRoutes);        // Claims
app.use("/api/denial-rules", denialRuleRoutes);  // Denial rules
app.use("/api/penalty-rules", penaltyRuleRoutes); // Penalty rules
app.use("/api/ar-aging", arAgingRoutes);        // AR Aging
app.use("/api/sdg8-metrics", sdg8MetricsRoutes); // SDG8 metrics
app.use("/api/audit-logs", auditLogRoutes);     // Audit logs


// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "ClaimFlow Africa API is running...",
    status: "OK"
  });
});


// Error handling middleware (uncomment when implemented)
// app.use(errorHandler);


module.exports = app;