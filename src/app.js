// src/app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import database to ensure models are synced
const db = require("./models");  // this runs your index.js

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;