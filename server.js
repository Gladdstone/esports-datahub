// variable declarations
var express = require("express"),
	router = require("./app/routes.js"),
	app = express(),
	port = 8080;

// route app
app.use("/", router);

// set location of static files
app.use(express.static(__dirname + "/public"));

// server start
app.listen(port, function() {
	console.log("App started. Listening on port 8080");
});
