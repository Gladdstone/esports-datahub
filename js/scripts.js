//
// GLOBAL VARIABLES
//
const client;


$(document).ready( function() {
	dbConnect();	
})


/**
*
* Name: dbConnect()
* Param: None
* Returns: void
* Description: Connects to postgresql database at designated location
*
**/
function dbConnect() {
	const postgres = require("pg");
	const connectionStr = process.enx.DATABASE_URL || "postgresql://reddwarf.cs.rit.edu:5432/p32003g";

	client = new postgres.Client(connectionStr);
	client.connect();
	// const query = client.query("CREATE TABLE example(id PRIMARY KEY, text VARCHAR(40))");
	// query.on("end", () => { client.end(); });
}


/**
*
* Name: playerSearch
* Param: obj - input object containing search parameters
* Returns: void
* Description: Performs database query based on passed parameters.
*
**/
function playerSearch(obj) {
	var input = obj.value;

	const query = client.query(
		"SELECT first_name FROM players WHERE username=" + input + " GROUP BY first_name;"
	);
}
