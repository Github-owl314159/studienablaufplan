const express = require("express");

let server = express();

// get connection to db

// routes
server.get("/", (req, res) => {
	res.send("Hello!");
});

server.listen(8080);
