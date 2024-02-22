const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const topicRoutes = require("./routes/Topic");
const questionRoutes = require("./routes/Question");
const doneRoutes = require("./routes/Done");
// const getAllTopics = require("./routes/Topic");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// const {cloudinaryConnect } = require("./config/cloudinary");
// const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"*",
		credentials:true,
	})
)

// console.log("HI");

// app.use(
// 	fileUpload({
// 		useTempFiles:true,
// 		tempFileDir:"/tmp",
// 	})
// )
// //cloudinary connection
// cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/topic", topicRoutes);
app.use("/api/v1/question", questionRoutes);
app.use("/api/v1/done", doneRoutes);
// app.use("/api/v1/getAllTopics", getAllTopics);


//def route

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

