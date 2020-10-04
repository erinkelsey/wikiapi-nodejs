/**
 * Setup and initialization.
 */
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

/**
 * MongoDB and mongoose setup, including schema and models
 * for Post
 */
mongoose.connect(process.env.MONGODB_SRV_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Article = mongoose.model(
  "Article",
  new mongoose.Schema({
    title: String,
    content: String,
  })
);

//TODO

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
