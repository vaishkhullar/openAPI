const express = require("express");
const apiRouter = express.Router();
const { getTopics } = require("../controllers/topics.controllers");
const {
  getArticles,
  getArticleById,
} = require("../controllers/article.controllers");

apiRouter.get("/getTopics", getTopics);
apiRouter.get("/articles", getArticles);
apiRouter.get("/articles/:article_id", getArticleById);

module.exports = apiRouter;
