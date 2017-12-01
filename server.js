// variable declarations
const express = require("express");
const path = require("path");
const router = require("./app/routes.js");
const bodyParser = require("body-parser");
const Pool = require("pg-pool");

// Set port
const port = 8080;

// Set up express
const app = express();

// Set up pool
const pool = new Pool({
    user: "p32003g",
    host: "reddwarf.cs.rit.edu",
    database: "p32003g",
    password: "Ohgh2lex4Techo5waC9a",
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// route app
app.use("/", router);

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(bodyParser.json());

// set location of static files
app.use(express.static(__dirname + "/public"));

// server start
app.listen(port, function() {
	console.log("App started. Listening on port 8080");
});

app.post("/querySummoner", function(req, res) {
    var summoner = req.body.summoner;
    console.log(summoner);
    pool.connect(function(err, client, done) {
    	if(err) {
    		return console.error("Error fetching client from pool: \n", err);
		}
		console.log("Succesful connection\n");
    	client.query("SELECT account_id FROM account_f WHERE username = '" + summoner + "'", function(err, result) {
    	    if(err) {
    	        return console.error("Error executing query: ", err.stack);
            }
            console.log(result.rows);
        });
	})
	//pool.end();
    //console.log("Pool succesfully terminated\n");
    res.sendFile(path.join(__dirname, "/index.html"));
});