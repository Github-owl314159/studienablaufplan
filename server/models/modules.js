let mongoose = require("mongoose");

let ModulesSchema = new mongoose.Schema({
	name: String,
	ects: Number
});

module.exports = mongoose.model("modules", ModulesSchema);
