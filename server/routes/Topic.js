// Import the required modules
const express = require("express")
const router = express.Router()



// Topic Controllers Import
const {
    addTopic, getAllTopics, getTopicQuestions, deleteTopic
  } = require("../controllers/Topic")
  


// Importing Middlewares
const { auth, isStudent, isAdmin } = require("../middlewares/auth")


router.post("/addTopic", auth, isAdmin, addTopic)
router.delete("/deleteTopic/:topicName", auth, isAdmin, deleteTopic)
router.get("/getAllTopics", getAllTopics)
router.get("/getTopicQuestions/:id", getTopicQuestions)

module.exports = router