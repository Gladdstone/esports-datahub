// variable declarations
var express = require("express"),
	router = require("./app/routes.js"),
	client = require("./app/client.js"),
	{Pool, Client} = require("pg"),
	connectionString = "postgresql://user:database.server.com:1234/databasename"
	app = express(),
	connectionString = process.env.DATABASEURL || "",
	port = 8080;

// route app
app.use("/", router);

app.use("/", client);

// set location of static files
app.use(express.static(__dirname + "/public"));

// server start
app.listen(port, function() {
	console.log("App started. Listening on port 8080");
});
