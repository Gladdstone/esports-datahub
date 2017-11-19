//
// GLOBAL VARIABLES
//
var http = require("http");
var fs = require("fs");

http.createServer(function (request, response) {
	if (request.method == 'POST') {
        console.log("POST");
        var body = '';
        request.on('data', function (data) {
            body += data;
            console.log("Partial body: " + body);
        });
        request.on('end', function () {
            console.log("Body: " + body);
        });

		playerSearch(body);

		sendFileContent(response, "results.php", "text/html");
    }
	else {
		sendFileContent(response, "index.php", "text/html");
	}
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');


/**
*
* Name: playerSearch
* Param:
* Returns: void
* Description: Performs database query based on passed parameters.
*
**/
function playerSearch(name) {
	
	const { Client } = require("pg");
	
	const client = new Client({
		user: "p32003g",
		host: "reddwarf.cs.rit.edu",
		database: "p32003g",
		password: "Ohgh2lex4Techo5waC9a",
		port: 5432,

	})

	client.connect();

	client.query("SET search_path TO public");
	client.query("SELECT first_name, last_name, name FROM SUMMONER", (err, res) => {


		if(err){
			console.log(err);
			console.log("Error");
		}

		console.log(res.rows);

		client.end();
	});
	
}


/**
*
* Name: sendFileContent
* Param: 	response - response object
* 			fileName - name of file to serve
*			contentType - type of file being served
* Returns: void
* Description: Serves up webpage based on passed parameters
*
**/
function sendFileContent(response, fileName, contentType) {
	
	fs.readFile(fileName, function (err, data) {
		response.writeHead(200, {"Content-Type": contentType});
		response.write(data);
		response.end();
	});
	
}