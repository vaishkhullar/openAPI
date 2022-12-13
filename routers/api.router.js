const express = require("express");
const apiRouter = express.Router();
const {
  getTopics,
  getArticles,
  getArticleById,
  getCommentsbyArticleId,
} = require("../controllers/controllers");

apiRouter.get("/getTopics", getTopics);
apiRouter.get("/articles", getArticles);
apiRouter.get("/articles/:article_id", getArticleById);
apiRouter.get("/articles/:article_id/comments", getCommentsbyArticleId);

module.exports = apiRouter;
