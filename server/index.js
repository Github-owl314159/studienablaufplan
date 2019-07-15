const express = require("express");
const cors = require("cors");
let Modules = require("./models/modules.js");
let Schedules = require("./models/schedules.js");

let port = 8080;
if (process.argv[2]) {
	port = process.argv[2];
}

// every module must have a minimum of 5
global.minEcts = 5;

let server = express();

// get connection to db
require("./db_connect.js");

server.use(cors());
server.use(express.static("./app/release"));
server.use(express.json());

// routes
server.get("/", (req, res) => {
	res.send();
});

server.get("/schedules", (req, res) => {
	let result = [];
	Schedules.find()
		.select("name")
		.exec((err, docs) => {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
			docs.forEach(doc => {
				result.push(doc.name);
			});
			console.log(result);
			res.json(result);
		});
});

server.post("/schedules", (req, res) => {
	let scheduleName = req.body.data.name;
	let modules = req.body.data.modules;
	let semester = req.body.data.semester;

	if (!scheduleName) {
		res.sendStatus(400);
	}
	else {
		Schedules.countDocuments({ name: scheduleName }, (err, count) => {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
			else if (count >= 1) {
				// update
				Schedules.deleteOne({ name: scheduleName }, err => {
					if (err) {
						console.log(err);
					}
				});
				Schedules.create(
					{
						name: scheduleName,
						semester: semester,
						ectsPerSemester: 30,
						modules: modules
					},
					err => {
						if (err) {
							console.log(err);
							res.sendStatus(500);
						}
					}
				);
				res.end();
			}
			else {
				Schedules.create(
					{
						name: scheduleName,
						semester: semester,
						ectsPerSemester: 30,
						modules: modules
					},
					err => {
						if (err) {
							console.log(err);
							res.sendStatus(500);
						}
					}
				);
				res.end();
			}
		});
	}
});

server.delete("/schedules", (req, res) => {
	let scheduleName = req.body.scheduleName;

	if (!scheduleName) {
		res.sendStatus(400);
	}

	Schedules.deleteOne({ name: scheduleName }, err => {
		if (err) {
			console.log(err);
		}
	});
	res.end();
});

server.post("/modules", (req, res) => {
	if (!req.body.name || !req.body.ects) {
		res.sendStatus(400);
	}
	else {
		Modules.countDocuments({ name: req.body.name }, (err, count) => {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
			else if (count >= 1) {
				res.end();
			}
			else {
				Modules.create({ name: req.body.name, ects: req.body.ects }, err => {
					if (err) {
						console.log(err);
						res.sendStatus(500);
					}
				});
				res.end();
			}
		});
	}
});

server.put("/modules", (req, res) => {
	Modules.updateOne(
		{ name: req.body.oldContent },
		{ name: req.body.newContent },
		err => {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
		}
	);
	res.end();
});

server.delete("/modules", (req, res) => {
	Modules.deleteOne({ name: req.body.name }, err => {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		}
	});
	res.end();
});

server.listen(port, () => {
	console.log(`HTTP server listening on port ${port}`);
});
