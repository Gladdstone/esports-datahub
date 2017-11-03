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
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end('post received');
    }
	else {
		fs.readFile("index.php", function(err, data){
			response.writeHead(200, {"Content-Type": "text/html"});
			response.write(data);
			response.end();
		});
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
function playerSearch() {
	const { Client } = require("pg");
	
	const client = new Client({
		user: "p32003g",
		host: "reddwarf.cs.rit.edu",
		database: "p32003g",
		password: "Ohgh2lex4Techo5waC9a",
		port: 5432,

	})

	client.connect()

	client.query('SELECT * FROM PLAYERS', (err, res) => {
		console.log(err, res)
		client.end()
	})
	
	alert("success");
	
}