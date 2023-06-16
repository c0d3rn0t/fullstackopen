const express = require("express");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const mongoose = require("mongoose");

const mongoUrl =
  "mongodb+srv://codernot13:YNWzf622K09015Ii@react-blog.uvirfv8.mongodb.net/fullstackopen?retryWrites=true&w=majority";
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

module.exports = app;
