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

async function becomeMember(id) {
  return await pool.query("UPDATE users SET member = true WHERE id = $1", [id]);
}

async function createNewMessage(title, text, id) {
  return await pool.query(
    "INSERT INTO messages(title, text, username) VALUES ($1, $2, $3)",
    [title, text, id]
  );
}

async function getMessages() {
  const { rows } = await pool.query(`
    SELECT messages.title as message_title, messages.text as message_text,
    messages.timestamp as message_timestamp,
    users.username as user_username
    FROM messages
    INNER JOIN users
    ON users.id = messages.username;
    `);
  return rows;
}

module.exports = {
  searchForUser,
  createNewUser,
  deserializeUser,
  becomeMember,
  createNewMessage,
  getMessages,
};
