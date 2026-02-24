const pool = require("../config/db");

exports.checkOverdueClaims = async () => {
  await pool.query(
    `UPDATE claims
     SET is_overdue = TRUE
     WHERE status = 'Pending'
     AND submission_date <= NOW() - INTERVAL 7 DAY`
  );
};