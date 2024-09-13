const { Pool } = require("pg");
const dotEnv = require("dotenv");

dotEnv.config();

const connectionUrl = (process.env.STATUS = "local"
  ? process.env.LOCAL_DB_CONNECTION_STRING
  : process.env.EXTERNAL_DB_CONNECTION_STRING);

module.exports = new Pool({
  connectionString: connectionUrl,
});
