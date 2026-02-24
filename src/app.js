const express = require("express");
const cors = require("cors");
require("dotenv").config();

const claimRoutes = require("./routes/claimRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/claims", claimRoutes);

module.exports = app;
