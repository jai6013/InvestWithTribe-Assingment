// Imports and Envioronment Variables
const express = require("express");
const app = express();
const connect = require("./configs/db");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const userController = require("./controllers/user.controller");
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
