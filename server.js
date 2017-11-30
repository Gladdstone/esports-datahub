// variable declarations
const express = require("express");
const path = require("path");
const router = require("./app/routes.js");
const bodyParser = require("body-parser");
const pg = require("pg");
const connectionString = "postgres://p32003g:Ohgh2lex4Techo5waC9a@reddwarf.cs.rit.edu@5432/p32003g"

// Set port
const port = 8080;

// Set up express
const app = express();

// Set up pool
const pool = new pg.Pool(connectionString);

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
    console.log(req.body.summoner);
    pool.connect(function(err, client, done) {
    	if(err) {
    		return console.error("Error fetching client from pool: \n", err);
		}
		console.log("Succesful connection");
	})
	pool.end();
    res.sendFile(path.join(__dirname, "/index.html"));
});