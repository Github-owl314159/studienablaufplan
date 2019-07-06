const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
let Modules = require("./models/modules.js");
let Schedules = require("./models/schedules.js");

const PORT = 8080;
const BASE_URI = `http://localhost:${PORT}`;

let server = express();

// get connection to db
require("./db_connect.js");

server.use(cors());
server.use(express.static("../app/release"));
server.use(bodyParser.json());

// routes
server.get("", (req, res) => {
	res.json({
		_links: {
			self: { href: `${BASE_URI}` },
			schedules: { href: `${BASE_URI}/schedules` },
			modules: { href: `${BASE_URI}/modules` }
		}
	});
});

server.get("/schedules", (req, res) => {});

server.get("/modules", (req, res) => {});

server.post("/module", (req, res) => {
	console.log("POST", req.body.message, req.body.user);
	res.send("ok");
});

server.listen(PORT, () => {
	console.log(`HTTP server listening on port ${PORT}`);
});
