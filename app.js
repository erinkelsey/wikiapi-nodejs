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
 * Chained route for GET, .... methods
 * for the /articles/:articleTitle route.
 */
app
  .route("/articles/:articleTitle")

  /**
   * GET method for /articles/:articleTitle route.
   *
   * Returns the Article with title of articleTitle, if it exists,
   * else returns message that it was not found.
   * Returns an error message, if error encountered.
   */
  .get((req, res) => {
    Article.findOne({ title: req.params.articleTitle }, (err, article) => {
      if (err) res.send(err);
      else if (!article) res.send("No article matching that title was found.");
      else res.send(article);
    });
  })

  /**
   * PUT method for /articles/:articleTitle route.
   *
   * Replaces the document with title of articleTitle, if there
   * is a document with that title.
   * REturns an error message, if one is encountered.
   */
  .put((req, res) => {
    Article.update(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content },
      { overwrite: true },
      (err) => {
        if (!err) res.send("Successfully updated article.");
        else res.send(err);
      }
    );
  })

  /**
   * PATCH method for /articles/:articleTitle route.
   *
   * Only updates the fields in the document that are sent.
   * Updates the document if there is one with a title of
   * articleTitle.
   * REturns an error message, if one is encountered.
   */
  .patch((req, res) => {
    Article.update(
      { title: req.params.articleTitle },
      { $set: req.body },
      (err) => {
        if (!err) res.send("Successfully updated article.");
        else res.send(err);
      }
    );
  })

  /**
   * DELETE method for /articles/:articleTitle route.
   *
   * Deletes the article with title of articleTitle.
   * Returns an error message, if one is encountered.
   */
  .delete((req, res) => {
    Article.deleteOne({ title: req.params.articleTitle }, (err) => {
      if (!err) res.send("Successfully deleted article.");
      else res.send(err);
    });
  });

/**
 * Start up server to listen on port 3000.
 */
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started successfully.");
});
