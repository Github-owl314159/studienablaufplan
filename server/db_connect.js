// Install MongoDB, start service: mongod --dbpath "/home/user/mongodbdata"
// Create database 'Library': mongo && use Library
// npm install mongodb

const dbClient = require("mongodb").MongoClient;

dbClient.connect("mongodb://localhost:27017", (error, client) => {
	if (error) {
		console.error(error);
		process.exit(-1);
	}
	const db = client.db("studymanagerDB");
	console.log("Connected to MongoDB.");
	try {
		// do something
	}
	finally {
		client.close();
	}
});
