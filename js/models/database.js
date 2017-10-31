/**
*
* Name: databse.js
* Author: Joseph Farrell
* Last Modified: 10/30/17
*
* Creates new instance of client to interact with database and connect
* Then create new table
*
**/
const pg = require("pg");
const connectionStr = process.env.DATABASE_URL || "postgres://localhost:5432/esports_db";

const client = new pg.Client(connectionStr);
client.connect();
const query = client.query(
		"CREATE TABLE items(id SERIAL PRIMARY KEY, text CARCHAR(40) not null, complete boolean");	// Finalize before running
query.on("end", () => { client.end(); });
