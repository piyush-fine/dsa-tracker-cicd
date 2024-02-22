// Import the Mongoose library
const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const userSchema = new mongoose.Schema(
	{
		// Define the name field with type String, required, and trimmed
		firstName: {
			type: String,
			required: true,
			trim: true,
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
		},
		// Define the email field with type String, required, and trimmed
		email: {
			type: String,
			required: true,
			trim: true,
		},

		// Define the password field with type String and required
		password: {
			type: String,
			required: true,
		},
		// Define the role field with type String and enum values of "Admin", "Student", or "Visitor"
		accountType: {
			type: String,
			enum: ["Admin", "Student"],
			required: true,
		},
		token: {
			type: String,
		},
		resetPasswordExpires: {
			type: Date,
		},
		image: {
			type: String,
			required: true,
		},
		TopicProgress: [
			{
				topic_id: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Topics",
				},
				question_id: [{
					type: mongoose.Schema.Types.ObjectId,
					ref: "Question",
				}],
			}
		],
		// data:[
		// 	{
		// 		topicName:{
		// 			type: String,
		// 		},
		// 		position:{
		// 			type: Number,
		// 		},
		// 		started:{
		// 			type: Boolean,
		// 		},
		// 		doneQuestions:{
		// 			type: Number,
		// 		},
		// 		questions:[
		// 			{
		// 				"Topic":{
		// 					type: String,
		// 				},
		// 				"Problem":{
		// 					type: String,
		// 				},
		// 				"Done":{
		// 					type: Boolean,
		// 				},
		// 				"Bookmark":{
		// 					type: Boolean,
		// 				},
		// 				"Notes":{
		// 					type: String,
		// 				},
		// 				"URL":{
		// 					type: String,
		// 				},
		// 				"URL2":{
		// 					type: String,
		// 				},
		// 			}
		// 		]
		// 	}
		// ]

		// Add timestamps for when the document is created and last modified
	},
	{ timestamps: true }
);

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("user", userSchema);












// const userSchema = new mongoose.Schema(
// 	{
// 		firstName: {
// 			type: String,
// 			required: true,
// 			trim: true,
// 		},
// 		TopicProgress: [
// 			{
// 				topic_id: {
// 					type: mongoose.Schema.Types.ObjectId,
// 					ref: "Topics",
// 				},
// 				question_id: [{
// 					type: mongoose.Schema.Types.ObjectId,
// 					ref: "Question",
// 				}],
// 			}
// 		],
// 	}