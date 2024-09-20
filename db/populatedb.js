const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const SQL = `
CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    first_name VARCHAR(255),
    last_name VARCHAR (255),
    full_name TEXT GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED, 
    username VARCHAR(255),
    password VARCHAR(255),
    member  BOOLEAN DEFAULT FALSE,
    admin   BOOLEAN DEFAULT FALSE);

CREATE TABLE IF NOT EXISTS messages(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    title TEXT, 
    text TEXT, 
    timestamp TIMESTAMP DEFAULT current_timestamp, 
    username  INTEGER REFERENCES users(id));
    
`;

const connectString = (process.env.STATUS = "local"
  ? process.env.LOCAL_DB_CONNECTION_STRING
  : process.env.EXTERNAL_DB_CONNECTION_STRING);

console.log(connectString);
async function mainDriver() {
  console.log("sending information...");
  const client = new Client({
    connectionString: connectString,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
  console.log(client);
}

mainDriver();
