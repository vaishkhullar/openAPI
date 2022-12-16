const express = require("express");
const apiRouter = express.Router();
const {
  getTopics,
  getCommentsbyArticleId,
} = require("../controllers/controllers");
const {
  getArticles,
  getArticleById,
  addComment,
  updateVotes,
} = require("../controllers/article.controllers");

apiRouter.get("/getTopics", getTopics);
apiRouter.get("/articles", getArticles);
apiRouter.get("/articles/:article_id", getArticleById);
apiRouter.get("/articles/:article_id/comments", getCommentsbyArticleId);
apiRouter.post("/articles/:article_id/comments", addComment);
apiRouter.patch("/articles/:article_id", updateVotes);

module.exports = apiRouter;
