function db_connect {
	var mysql = require("mysql");

	var con = mysql.createConnection({
		host: "localhost",
		user: "newuser",
		password: "password"	// This is unacceptable. How do we fix this?
	});

	con.connect(function(err) {
		if(err) throw err;
		console.log("Connection succesful");
	});
}
