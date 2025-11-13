require("dotenv").config(); //dotenv configured
//express imported or required
const express = require("express");
//database connected in databse connect
const dbConnect = require("./database/connect");
const cors = require("cors");
const auth = require("./middleware/auth");
const adminOnly = require("./middleware/admin");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const loginRouter = require("./routes/login");

dbConnect();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1", userRouter);
app.use("/api/v1", productRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("Listening on port", port);
});
