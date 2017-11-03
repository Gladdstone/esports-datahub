<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>The Hub</title>
	<!--Import Google Icon Font-->
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	<!--Import materialize.css-->
	<link type="text/css" rel="stylesheet" href="css/materialize.css"  media="screen,projection"/>

	<!--Let browser know website is optimized for mobile-->
	<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	<meta name="description" content="The HTML5 Herald">
	<meta name="author" content="SitePoint">
		
	
	<!--Javascript and jQuery-->
	<!--<script type="text/javascript" src="https://code.jquery.com/jquery-3.2.1.min.js"></script>-->
	<!--<script type="text/javascript" src="js/materialize.js"></script>-->
	<!--<script type="text/javascript" src="js/scripts.js"></script>-->
	<script>
		/**function loadScript(url) {
			var head = document.getElementsByTagName('head')[0];
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = url;
			head.appendChild(script);
		}
		loadScript("js/scripts.js");**/
		
		function playerSearch() {
				alert("test");
		}
	</script>
</head>
<body>
	<?php include "header.html" ?>
	<div class="row">
		<div class="col s12">
			Search:
			<div class="input-field inline">
				<input placeholder="Input a player name" id="input_search" type="text">
				<input type="button" value="Search" onclick="playerSearch();">
			</div>
		</div>	
	</div>
	<div class="blue-grey darken-4">
		<h1 class="white-text">Lorem Ipsum</h1>
	</div>
</body>
</html>
