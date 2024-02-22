const mongoose = require("mongoose");

const question = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
    link: {
		type: String,
		required: true
	},
    // done: {
	// 	type: Boolean,
    //     default: false,
	// 	required: true
	// },
    // revisit: {
	// 	type: Boolean,
    //     default: false,
	// 	required: true
	// },
    // notes: {
	// 	type: String,
	// },
});

module.exports = mongoose.model("question", question);