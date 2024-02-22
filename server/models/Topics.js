const mongoose = require("mongoose");

const topics = new mongoose.Schema({
	topic_name: {
		type: String,
		required: true
	},
	Questions: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Question",
		},
	],
});

module.exports = mongoose.model("topics", topics);