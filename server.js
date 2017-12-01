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
    var summoner = "";
    pool.connect(function(err, client, done) {
        if(err) {
            return console.error("Error fetching client from pool: \n", err);
        }
        // account_id given the account username: "(SELECT account_id FROM account_f WHERE username = '" + req.body.summoner + "')"
        // player_stats_f given the account username: (SELECT * FROM (SELECT account_id FROM account_f WHERE username = '" + req.body.summoner + "') AS d_account INNER JOIN player_stats_f ON d_account.account_id = player_stats_f.account_id)
        // match_id's given the account username: (SELECT match_f.match_id FROM (SELECT account_id FROM account_f WHERE username = '" + req.body.summoner + "') AS d_account INNER JOIN account_match_f ON d_account.account_id = account_match_f.account_id INNER JOIN match_f ON account_match_f.match_id = match_f.match_id)
        client.query("SELECT * FROM (SELECT account_id FROM account_f WHERE username = '" + req.body.summoner + "') AS d_account INNER JOIN player_stats_f ON d_account.account_id = player_stats_f.account_id", function(err, result) {
            if(err) {
                //res.status(500).json({"Error":err});
                summoner = "Error";
                console.error("Error querying: \n", err);
            }
            else if(result.rows.length) {
                //res.status(200).json({"Data":result.rows});
                summoner = result.rows;
            }
            else {
                //res.status(200).json({"Data":"No records found"});
                summoner = "No records found";
                res.sendFile(path.join(__dirname, "/no_result.html"))
                return;
            }
            res.writeHead(200, {"content-Type": "application/json"});
            res.end(JSON.stringify(summoner));
            res.end();
        });
    });
    //res.sendFile(path.join(__dirname, "/index.html"));
});

app.post("/returnHome", function(req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});