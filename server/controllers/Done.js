const User = require("../models/User");
const Question = require("../models/Question");
const Topic = require("../models/Topics");

exports.setDone = async (req, res)=>{
    try{
        const userDetails = await User.findById(req.user.id);
        const {topicName, title} = req.body;

        if(!topicName | !title) {
            return res.status(403).send({
                success: false,
                message: "All fields are required ---setDone"
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

        if(!existingQuestion)
        {
            return res.status(401).send({
                success: false,
                message: "Question does not exsists",
            })
        }


        await User.findOne({ _id: userDetails._id, "TopicProgress.topic_id": existingTopic._id })
        .then(user => {
            if (!user) {
            // If the topic_id doesn't exist, create a new entry
            return User.findByIdAndUpdate(
                userDetails._id,
                {
                $push: {
                    TopicProgress: {
                    topic_id: existingTopic._id,
                    question_id: [existingQuestion._id],
                    },
                },
                },
                { new: true }
            );
            } else {
            // If the topic_id already exists, just push the newQuestionId
            return User.findOneAndUpdate(
                { _id: userDetails._id, "TopicProgress.topic_id": existingTopic._id },
                { $push: { "TopicProgress.$.question_id": existingQuestion._id } },
                { new: true }
            ).populate("TopicProgress");
            }
        })
        .then(updatedUser => {
            console.log(updatedUser);
        })
        .catch(err => {
            console.error(err);
        });

        return res.status(200).json({
            success: true,
            // user,
            message: "Done set operation performed Successfully",
        });
    }
    catch(err)
    {
        console.error(err);
		return res.status(500).json({
			success: false,
			message: "Set Done Operation not happened. Please try again.",
		});
    }   
}



//Erase Done

exports.eraseDone = async (req, res)=>{
    try{
        const userDetails = await User.findById(req.user.id);
        const {topicName, title} = req.body;

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

        if(!existingQuestion)
        {
            return res.status(401).send({
                success: false,
                message: "Question does not exsists",
            })
        }


        await User.findOne({ _id: userDetails._id, "TopicProgress.topic_id": existingTopic._id })
        .then(user => {
            if (user) {
            // // If the topic_id doesn't exist, create a new entry
            // return User.findByIdAndUpdate(
            //     userDetails._id,
            //     {
            //     $pull: {
            //         TopicProgress: {
            //         topic_id: existingTopic._id,
            //         question_id: [existingQuestion._id],
            //         },
            //     },
            //     },
            //     { new: true }
            // );

                return User.findOneAndUpdate(
                    { _id: userDetails._id, "TopicProgress.topic_id": existingTopic._id },
                    { $pull: { "TopicProgress.$.question_id": existingQuestion._id } },
                    { new: true }
                ).populate("TopicProgress");

            } else {
            // If the topic_id already exists, just push the newQuestionId
                return res.status(401).send({
                    success: false,
                    message: "User has not attempted this topic yet",
                })
            }
        })
        .then(updatedUser => {
            console.log(updatedUser);
        })
        .catch(err => {
            console.error(err);
        });

        return res.status(200).json({
            success: true,
            // user,
            message: "Done erase operation performed Successfully",
        });
    }
    catch(err)
    {
        console.error(err);
		return res.status(500).json({
			success: false,
			message: "Erase Done Operation not happened. Please try again.",
		});
    }   
}


//Get ALL Done

exports.getAllDone = async (req, res)=>{
    try{
        const userId = await User.findById(req.user.id);

        const userDetails = await User.findOne({
            _id: userId,
          }).populate({
            path: 'TopicProgress.topic_id',
            model: 'topics'
          }).populate({
            path: 'TopicProgress.question_id',
            model: 'question'
          }).exec()
          if (!userDetails) {
            return res.status(400).json({
              success: false,
              message: `Could not find user with id: ${userDetails}`,
            })
          }
        //   if(userDetails.TopicProgress.length == 0)
        //   {
        //     return res.status(400).json({
        //         success: false,
        //         message: `Could not find user with id: ${userDetails}`,
        //       })
        //   }
          return res.status(200).json({
            success: true,
            data: userDetails.TopicProgress,
          })
    }
    catch(err)
    {
        console.error(err);
		return res.status(500).json({
			success: false,
			message: "Set Done Operation not happened. Please try again.",
		});
    }
    
}


//Get All done Topic Questions

exports.getDoneTopicQuestions = async (req, res)=>{
    try{
        const userId = await User.findById(req.user.id);
        const topicID = req.params.id;

        // console.log("Printing request params",topicID)

        const user = await User.findOne({ _id: userId })
                            .exec()

        if (user) {
            // Check if the user has TopicProgress
            if (user.TopicProgress && user.TopicProgress.length > 0) {
                // Check if the specified topicID exists in the user's TopicProgress
                const topicProgress = user.TopicProgress.find(
                (progress) => progress.topic_id.toString() === topicID
                );

                if (topicProgress) {
                const questionIDs = topicProgress.question_id;
                    return res.status(200).json({
                        success: true,
                        data: questionIDs,
                    })
                } else {
                    return res.status(400).json({
                        success: false,
                        message: `Topic not found for the user.`,
                      })
                }
            } else {
                return res.status(400).json({
                    success: false,
                    message: `User has no TopicProgress.`,
                  })
            }
            } else {
                return res.status(400).json({
                    success: false,
                    message: `User not found.`,
                  })
            }
    }
    catch(err)
    {
        console.error(err);
		return res.status(500).json({
			success: false,
			message: "Cannot fetch done Topic Questions. Please try again.",
		});
    }
    
}