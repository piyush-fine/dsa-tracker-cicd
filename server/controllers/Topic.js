const Topic = require("../models/Topics");
const Question = require("../models/Question");
const User = require("../models/User");

exports.addTopic = async (req, res)=>{
    try{
        const {topicName} = req.body;

        if(!topicName) {
            return res.status(403).send({
                success: false,
                message: "Topic name not entered correctly"
            });
        }

        const existingTopic = await Topic.findOne({ topic_name:topicName });

        if(existingTopic)
        {
            return res.status(401).send({
                success: false,
                message: "Topic already exsists",
            })
        }

        const topic = await Topic.create({
            topic_name: topicName,
            Questions:[]
        });

        return res.status(200).json({
            success: true,
            topic,
            message: "Topic created Successfully",
        });
    }
    catch(err)
    {
        console.error(err);
		return res.status(500).json({
			success: false,
			message: "Topic cannot be registered. Please try again.",
		});
    }
    
}


exports.getAllTopics = async (req, res) => {
	try {
		const allTopics = await Topic.find(
			{},
			{
				topic_name: true,
				Questions: true,
			}
        )
            .populate({
                path: 'Questions',
                model: 'question'
            })
			.exec();
		return res.status(200).json({
			success: true,
			data: allTopics,
		});
	} catch (error) {
		console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch Topics Data`,
			error: error.message,
		});
	}
};



//List all Questions in a particular Topic 

exports.getTopicQuestions = async (req, res) => {
    try {
            //get categoryId
            // const {topicID} = req.body;
            const topicID = req.params.id;

            //get courses for specified categoryId
            const selectedTopic = await Topic.findById(topicID)
                                            .populate({
                                                path: 'Questions',
                                                model: 'question'
                                            })
                                            .exec();
            //validation
            if(!selectedTopic) {
                return res.status(404).json({
                    success:false,
                    message:'Data Not Found',
                });
            }

            //return response
            const ques = selectedTopic.Questions;
            return res.status(200).json({
                success:true,
                data: ques,
            });

    }
    catch(error ) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}



exports.deleteTopic = async (req, res)=>{
    try{
        const {topicName} = req.params;

        if(!topicName) {
            return res.status(403).send({
                success: false,
                message: "Topic name not entered correctly"
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


        await User.updateMany(
        {
            "TopicProgress": {
            $elemMatch: { topic_id: existingTopic._id },
            },
        },
        {
            $pull: { "TopicProgress": { topic_id: existingTopic._id } },
        }
        )

        const topic = await Topic.findById(existingTopic._id)

        if (!topic) {
            return res.status(401).send({
                success: false,
                message: "Topic not found",
            })
          }
      
        for (const questionId of topic.Questions) {
        await Question.findByIdAndDelete(questionId).exec();
        }

        await Topic.findByIdAndDelete(existingTopic._id);


        return res.status(200).json({
            success: true,
            message: "Topic deleted Successfully",
        });
    }
    catch(err)
    {
        console.error(err);
		return res.status(500).json({
			success: false,
			message: "Topic cannot be deleted. Please try again.",
		});
    }
    
}