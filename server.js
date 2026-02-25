require("dotenv").config();
const app = require("./src/app");
const { syncModels } = require("./src/models"); // import syncModels

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    // Sync all Sequelize models to the database
    await syncModels();
    console.log(" Database tables are ready");

    // Start server
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to sync models or start server:", err);
    process.exit(1);
  }
})();

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});