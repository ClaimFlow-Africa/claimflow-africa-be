const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const claimRoutes = require("./routes/claimRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const { logRequest } = require("./utils/logger");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logRequest);

app.use("/api/auth", authRoutes);
app.use("/api/claims", claimRoutes);

app.use(errorHandler);

module.exports = app;
