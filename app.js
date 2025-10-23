require("dotenv").config(); //dotenv configured
//express imported or required
const express = require("express");
//database connected in databse connect
const dbConnect = require("./database/connect");

userRouter = require("./routes/user");

dbConnect();
const app = express();
app.use(express.json());
app.use("/api/v1", userRouter);
const port = process.env.PORT;
app.listen(port, () => {
	console.log("Listening on port ", port);
});
