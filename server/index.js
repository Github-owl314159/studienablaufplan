const express = require("express");

let server = express();

server.get("/", (req, res) => {
	res.send("Hello!");
});

server.listen(8080);
