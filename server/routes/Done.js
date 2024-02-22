// Import the required modules
const express = require("express")
const router = express.Router()



// Topic Controllers Import
const {
    setDone,getAllDone, eraseDone, getDoneTopicQuestions
  } = require("../controllers/Done")
  


// Importing Middlewares
const { auth, isStudent, isAdmin } = require("../middlewares/auth")


router.post("/setDone", auth, isStudent, setDone);
router.post("/eraseDone", auth, isStudent, eraseDone);
router.get("/getAllDone", auth, isStudent, getAllDone)
router.get("/getDoneTopicQuestions/:id", auth, isStudent, getDoneTopicQuestions)

module.exports = router