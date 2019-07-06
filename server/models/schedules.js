let mongoose = require("mongoose");

let SchedulesSchema = new mongoose.Schema({
	name: String,
	semester: Number,
	ectsPerSemester: Number,
	modules: []
});

module.exports = mongoose.model("schedules", SchedulesSchema);
