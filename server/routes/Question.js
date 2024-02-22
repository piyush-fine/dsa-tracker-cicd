// Import the required modules
const express = require("express")
const router = express.Router()



// Topic Controllers Import
const {
    addQuestion,removeQuestion
  } = require("../controllers/Question")
  


// Importing Middlewares
const { auth, isAdmin } = require("../middlewares/auth")


router.post("/addQuestion", auth, isAdmin, addQuestion)
router.delete("/removeQuestion/:topicName/:title", auth, isAdmin, removeQuestion)

module.exports = router