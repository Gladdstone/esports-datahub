var express = require("express")
	path = require("path"),
	router = express.Router();

module.exports = router;

router.get("/", function(req, res) {
	res.sendFile(path.join(__dirname, "../index.html"));
});
