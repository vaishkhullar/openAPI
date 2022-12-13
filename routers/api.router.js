const express = require("express");
const apiRouter = express.Router();
const {
  getTopics,
  getArticles,
  getArticleById,
} = require("../controllers/topics.controllers");

apiRouter.get("/getTopics", getTopics);
apiRouter.get("/articles", getArticles);
apiRouter.get("/articles/:article_id", getArticleById);

module.exports = apiRouter;
