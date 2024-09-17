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
    member  BOOLEAN DEFAULT FALSE;

CREATE TABLE IF NOT EXISTS messages(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
    title TEXT, 
    text TEXT, 
    timestamp TIMESTAMP, 
    username  INTEGER REFERENCES users(id));
    
`;
