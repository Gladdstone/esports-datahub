var express = require("express"),
	bodyParser = require("body-parser"),
	app = express();

app.use(bodyParser.urlencoded({extended: true}));

// point to this using <form action="http://127.0.0.1:8080/myaction" method="post">
app.post("/myaction", function(req, res) {
	res.send("You sent " + req.body.name + ".");
});
