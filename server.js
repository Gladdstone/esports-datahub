// variable declarations
const express = require("express");
const path = require("path");
const router = require("./app/routes.js");
const bodyParser = require("body-parser");
const Pool = require("pg-pool");
const pug = require('pug');

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

app.set('view engine', 'pug')

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

app.post("/showAllSummoners", function(req, res) {
    pool.connect(function(err, client, done) {
        if(err) {
            return console.error("Error fetching client from pool: \n", err);
        }
        var all = "SELECT username FROM account_f";
        client.query(all, function(err, result) {
            if(err) {
                //res.status(500).json({"Error":err});
                p_stats = "Error";
                console.error("Error querying: \n", err);
            }
            else if(result.rows.length) {
                //res.status(200).json({"Data":result.rows});
                p_stats = result.rows;
            }
            else {
                //res.status(200).json({"Data":"No records found"});
                p_stats = "No records found";
                res.sendFile(path.join(__dirname, "/no_result.html"))
                return;
            }

            // p_stats is an array of the player's stats in his matches
            // account_id: JSON.stringify(p_stats[0].account_id)
            res.render('output', {usernames: p_stats});
        });
    });
    //res.sendFile(path.join(__dirname, "/index.html"));
});


app.post("/querySummoner", function(req, res) {
    var summoner = "";
	var resExist = false;
	var winRate = "None";
    pool.connect(function(err, client, done) {
        if(err) {
            return console.error("Error fetching client from pool: \n", err);
        }
        // account_id given the account username: "(SELECT account_id FROM account_f WHERE username = '" + req.body.summoner + "')"
        account_id = "SELECT account_id FROM account_f WHERE username = '" + req.body.summoner + "'"
        // player_stats_f given the account username: (SELECT * FROM (SELECT account_id FROM account_f WHERE username = '" + req.body.summoner + "') AS d_account INNER JOIN player_stats_f ON d_account.account_id = player_stats_f.account_id)
        player_stats = "SELECT * FROM (SELECT account_id FROM account_f WHERE username = '" + req.body.summoner + "') AS d_account INNER JOIN player_stats_f ON d_account.account_id = player_stats_f.account_id"
        // match_id's given the account username: (SELECT match_f.match_id FROM (SELECT account_id FROM account_f WHERE username = '" + req.body.summoner + "') AS d_account INNER JOIN account_match_f ON d_account.account_id = account_match_f.account_id INNER JOIN match_f ON account_match_f.match_id = match_f.match_id)
        match_ids = "SELECT match_f.match_id FROM (SELECT account_id FROM account_f WHERE username = '" + req.body.summoner + "') AS d_account INNER JOIN account_match_f ON d_account.account_id = account_match_f.account_id INNER JOIN match_f ON account_match_f.match_id = match_f.match_id"
        // team_stats_f given the account username: (SELECT * FROM (SELECT account_id FROM account_f WHERE username = '" + req.body.summoner + "') AS d_account INNER JOIN team_stats_f )
        team_stats = "SELECT * FROM (" + match_ids + ") AS matches INNER JOIN team_stats_f ON matches.match_id = team_stats_f.match_id"
        // account_ids given a match_id, currently: 0
        accounts_f_match = "SELECT account_id FROM match_f INNER JOIN account_match_f ON account_match_f.match_id = 0 AND match_f.match_id = 0"
        // account usernames given a match_id
        account_user_match = "SELECT username FROM account_f INNER JOIN (" + accounts_f_match + ") AS ids ON account_f.account_id = ids.account_id"
		// player win rate
		win_rate = "SELECT COUNT(win) FROM (SELECT match_f.match_id FROM (SELECT account_id FROM account_f WHERE username = '" + req.body.summoner + "') AS d_account INNER JOIN account_match_f ON d_account.account_id = account_match_f.account_id INNER JOIN match_f ON account_match_f.match_id = match_f.match_id) WHERE win = true"

        client.query(player_stats, function(err, result) {
            if(err) {
                //res.status(500).json({"Error":err});
                p_stats = "Error";
				winRate = "Error";
                console.error("Error querying: \n", err);
            }
            else if(result.rows.length) {
                //res.status(200).json({"Data":result.rows});
                p_stats = result.rows;
				resExist = true;
            }
            else {
                //res.status(200).json({"Data":"No records found"});
                p_stats = "No records found";
				winRate = "No records found";
                res.sendFile(path.join(__dirname, "/no_result.html"))
                return;
            }
			
			if(resExist) {
				client.query(win_rate, function(err, result) {
					if(err) {
						winRate = "Error";
						console.error("Error querying: \n", err);
					}
					winRate = result.rows;
				});
			}
			
			console.log(winRate);

            // p_stats is an array of the player's stats in his matches
            // account_id: JSON.stringify(p_stats[0].account_id)
            res.render('output', {account_username: req.body.summoner, account_id: JSON.stringify(p_stats[0].account_id), p_stats_o: p_stats});

            /*
            res.writeHead(200, {"content-Type": "application/json"});
            res.end(JSON.stringify(summoner));
            res.end();
            */
        });
    });
    //res.sendFile(path.join(__dirname, "/index.html"));
});

app.post("/returnHome", function(req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});
