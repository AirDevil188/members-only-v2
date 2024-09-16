const pool = require("./pool");

async function searchForUser(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows[0];
}

async function createNewUser(first_name, last_name, username, password) {
  return await pool.query(
    "INSERT INTO users(first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
    [first_name, last_name, username, password]
  );
}

async function deserializeUser(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}

module.exports = {
  searchForUser,
  createNewUser,
  deserializeUser,
};
