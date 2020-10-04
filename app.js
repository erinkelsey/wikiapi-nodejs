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
 * for Article.
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

/**
 * Chained route for GET, POST, DELETE methods
 * for the /articles route.
 */
app
  .route("/articles")

  /**
   * GET method for /articles route.
   *
   * Returns all of the Articles in the collection,
   * or an error message, if encountered.
   */
  .get((req, res) => {
    Article.find((err, articles) => {
      if (!err) res.send(articles);
      else res.send(err);
    });
  })

  /**
   * POST method for /articles route.
   *
   * Adds a new Article, with title and contents.
   * Returns an error message, if unsuccessful.
   */
  .post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });
    newArticle.save((err) => {
      if (!err) res.send("Successfully added a new article!");
      else res.send(err);
    });
  })

  /**
   * DELETE method for /articles route.
   *
   * Deletes all articles in Article collection.
   * Returns an error message, if unsuccessful.
   */
  .delete((req, res) => {
    Article.deleteMany((err) => {
      if (!err) res.send("Successfully deleted all articles.");
      else res.send(err);
    });
  });

/**
 * Start up server to listen on port 3000.
 */
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started successfully.");
});
