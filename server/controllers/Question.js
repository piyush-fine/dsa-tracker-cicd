const Question = require("../models/Question");
const Topic = require("../models/Topics");
const User = require("../models/User");

exports.addQuestion = async (req, res)=>{
    try{
        const {topicName, title, url} = req.body;

        console.log("I am here.............", req.body);

        if(!topicName | !title  | !url) {
            return res.status(403).send({
                success: false,
                message: "All fields are required --- addQuestion"
            });
        }

        const existingTopic = await Topic.findOne({ topic_name:topicName });

        if(!existingTopic)
        {
            return res.status(401).send({
                success: false,
                message: "Topic not created yet",
            })
        }

        const existingQuestion = await Question.findOne({ title });

        if(existingQuestion)
        {
            return res.status(401).send({
                success: false,
                message: "Question is already created",
            })
        }

        const question = await Question.create({
            title:title,
            link:url,
        });

        await Topic.findByIdAndUpdate(
			{
				_id: existingTopic._id,
			},
			{
				$push: {
					Questions: question._id,
				},
			},
			{ new: true }
		);

        return res.status(200).json({
            success: true,
            question,
            message: "Question created Successfully",
        });
    }
    catch(err)
    {
        console.error(err);
		return res.status(500).json({
			success: false,
			message: "Question cannot be registered. Please try again.",
		});
    }
    
}


exports.removeQuestion = async (req, res)=>{
    try{
        // const userDetails = await User.findById(req.user.id);
        // const {topicName, title} = req.body;
        const {topicName, title} = req.params;

        if(!topicName | !title) {
            return res.status(403).send({
                success: false,
                message: "All fields are required ---eraseDone"
            });
        }

        const existingTopic = await Topic.findOne({ topic_name:topicName });

        if(!existingTopic)
        {
            return res.status(401).send({
                success: false,
                message: "Topic does not exsists",
            })
        }

        const existingQuestion = await Question.findOne({ title });

        // console.log("Hi its me exsistingQuestion..............................",existingQuestion);

        if(!existingQuestion)
        {
            return res.status(401).send({
                success: false,
                message: "Question does not exsists",
            })
        }

        await User.find({ "TopicProgress.question_id": existingQuestion._id })
        .then(users => {
            // Step 2: For each matching user, remove the question_id
            users.forEach(user => {
            user.TopicProgress.forEach(topicProgress => {
                const index = topicProgress.question_id.indexOf(existingQuestion._id);
                if (index !== -1) {
                topicProgress.question_id.splice(index, 1);
                }
            });
            user.save()
                .then(() => {
                console.log(`Removed question ID from user with ID: ${user._id}`);
                })
                .catch(err => {
                console.error(err);
                });
            });
        })
        .catch(err => {
            console.error(err);
        });

        await Topic.findByIdAndUpdate(
			{
				_id: existingTopic._id,
			},
			{
				$pull: {
					Questions: existingQuestion._id,
				},
			},
			{ new: true }
		);

        await Question.findByIdAndDelete(existingQuestion._id);

        return res.status(200).json({
            success: true,
            // user,
            message: "Question Deleted Successfully",
        });
    }
    catch(err)
    {
        console.error(err);
		return res.status(500).json({
			success: false,
			message: "Question Deletion not happened. Please try again.",
		});
    }   
}