const pool = require("./pool");

async function searchForUser(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
    username,
  ]);
  return rows[0];
}

module.exports = {
  searchForUser,
};
