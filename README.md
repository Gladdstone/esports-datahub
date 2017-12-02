# esports-datahub
Database management project for CSCI 320. 


## Synopsis

This program is designed to be run locally, with the possibility of web deployment with very minor adjustment to the server.js file. Makes use of the official Riot API to populate a PostgreSQL database containing player stats and history to be queried by the web application.

## Structure

/
|
---
   |
   |- .idea
   |- app
   |- legacy
   |- node_modules
   |- public
   |  |
   |  |- css
   |  |  |
   |  |  |- stylesheet.css
   |  |
   |  |- images
   |  |  |
   |  |  |- banner_template.png
   |  |  |- esportsbanner.jpg
   |  |
   |
   |- views
   |  |
   |  |- output.pug
   |  |- output.pug.orig
   |
   |- about.html
   |- contact.html
   |- contributions.txt
   |- index.html
   |- no_result.html
   |- package.json
   |- package-lock.json
   |- README.md
   |- server.js
   |- jerver.js.orig

## Installation

Install latest version of node
	sudo apt-get install node
Run server.js
	node server.js

## Contributors

Joseph Farrell
