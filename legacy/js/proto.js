const request = require("request");
const fs = require('fs');
const readline = require('readline')


// url to get matches in json
const url = 'https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/32766?api_key=RGAPI-40cc271f-edba-4dee-8eb9-e22317b31d81'

// get request using url above
request.get(url, (error, response, body) => {

	let jsonContent = JSON.parse(body);

	// list of matches from json
	var matchList = jsonContent.matches;

	// iterate over matchlist
	matchList.forEach(function(match){
		// want match of each match
		var m = match.gameId;

		// write matchidto the file
		fs.appendFileSync('matchId.txt', m + "\n");
	});

});


// needed to read file line by line
const rl = readline.createInterface({
	input: fs.createReadStream('matchid.txt')
});

// read everyline
rl.on('line', function(line){

	// change url for each match id
	var matchurl = 'https://na1.api.riotgames.com/lol/match/v3/matches/' + line + '?api_key=RGAPI-40cc271f-edba-4dee-8eb9-e22317b31d81'

	// get request for each match id
	request.get(matchurl, (error, response, body) => {

		// parse the json
		let jsonContent = JSON.parse(body);

		// check what's in the json
		console.log(jsonContent.participantId);

	});

});



//curl --request GET 'https://na1.api.riotgames.com/lol/match/v3/matchlists/by-account/32766?api_key=RGAPI-40cc271f-edba-4dee-8eb9-e22317b31d81' --include


//curl --request GET 'https://na1.api.riotgames.com/lol/match/v3/matches/2634100718?api_key=RGAPI-40cc271f-edba-4dee-8eb9-e22317b31d81' --include

///lol/match/v3/matches/{matchId}

// get json file parsed for one streamer, qtpie
// then it'll be extremely easy to implement with the rest of the streamers that we want to do


// code to parse JSON files
/*
var fs = require("fs");
console.log("\n *START* \n");

var content = fs.readFileSync("file.json");

var jsonContent = JSON.parse(content);

var matchList = jsonContent.matches;

// this gives us a list of match ids
// to iterate over to get match data from

matchList.forEach(function(match) {
	var m = match.gameId;
	console.log(m);
});

// player needs team id and player id
//console.log("Match ID: ", jsonContent.gameId);
//console.log("Player ID: ", jsonContent.participants[0])
*/