// Imports and Envioronment Variables
const express = require("express");
const app = express();
const connect = require("./configs/db");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const userController = require("./controllers/user.controller");
const postController = require("./controllers/post.controller");
const groupController = require("./controllers/group.controller");
const commentController = require("./controllers/comment.controller");
const conversationController = require("./controllers/conversation.controller");
const messageController = require("./controllers/message.controller");
require("dotenv").config();
// -----------------------------------------

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/views"));
// -----------------------------------------

// routes
app.get("/", async (req, res) => {
  try {
    return res.status(200).sendFile("views/index.html", { root: __dirname });
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.use("/users", userController);
app.use("/posts", postController);
app.use("/groups", groupController);
app.use("/comments", commentController);
app.use("/conversations", conversationController);
app.use("/messages", messageController);
// ------------------------------------------

// Start function of Express app
app.listen(PORT, async () => {
  try {
    await connect();
    console.log("listening on:", PORT);
  } catch (err) {
    console.log(err);
  }
});
// -------------------------------------------
