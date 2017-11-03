//
// GLOBAL VARIABLES
//
/**
var client;


$(document).ready( function() {
	dbConnect();
})



*
* Name: dbConnect()
* Param: None
* Returns: void
* Description: Connects to postgresql database at designated location
*

function dbConnect() {
	const postgres = require("pg");
	const connectionStr = process.enx.DATABASE_URL || "postgresql://reddwarf.cs.rit.edu:5432/p32003g";

	client = new postgres.Client(connectionStr);
	client.connect();
	// const query = client.query("CREATE TABLE example(id PRIMARY KEY, text VARCHAR(40))");
	// query.on("end", () => { client.end(); });
}
**/

/**
*
* Name: playerSearch
* Param: obj - input object containing search parameters
* Returns: void
* Description: Performs database query based on passed parameters.
*
**/
function playerSearch() {
	const { Client } = require("pg");
	
	const client = new Client({
		user: "p32003g",
		host: "reddwarf.cs.rit.edu",
		database: "p32003g",
		password: "Ohgh2lex4Techo5waC9a",
		port: 5432,

	})

	client.connect()

	client.query('SELECT * FROM PLAYERS', (err, res) => {
		console.log(err, res)
		client.end()
	})
	
	alert("success");
	
}
