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
		"CREATE TABLE player(username, first_name VARCHAR(40), last_name VARCHAR(40), team VARCHAR(40), game VARCHAR(40), PRIMARY KEY(username), FOREIGN KEY(team) references Teams(name), FOREIGN KEY(game) references Games(name))");	// Finalize before running
query.on("end", () => { client.end(); });
