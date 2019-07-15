module.exports = (function () {
	let mongoose = require("mongoose");
	require("./models/modules");

	let dbPort = 27017;
	let mongoDB = `mongodb://localhost:${dbPort}/studymanagerDB`;

	mongoose.connect(mongoDB, { useNewUrlParser: true });

	mongoose.connection.on(
		"error",
		console.error.bind(console, "MongoDB connection error:")
	);

	mongoose.connection.on("open", () => {
		console.log(`Connected to ${mongoDB}`);
	});
})();
