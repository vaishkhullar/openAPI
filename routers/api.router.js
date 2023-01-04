const express = require("express");
const apiRouter = express.Router();
const {
  getTopics,
  getCommentsbyArticleId,
  deleteComment,
  getEndPoints
} = require("../controllers/controllers");
const {
  getArticles,
  getArticleById,
  addComment,
  updateVotes,
} = require("../controllers/article.controllers");
const endpoints = require("../endpoints.json")

const getJSONEndpoints = (req, res, next) => {
  return Promise.resolve(endpoints)
  .then((endpoints)=>{
    res.status(200).send({endpoints})
  }).catch(next)
}

const { getUsers } = require("../controllers/user.controller");
apiRouter.get("/", getJSONEndpoints)
apiRouter.get("/getTopics", getTopics);
apiRouter.get("/articles", getArticles);
apiRouter.get("/articles/:article_id", getArticleById);
apiRouter.get("/articles/:article_id/comments", getCommentsbyArticleId);
apiRouter.post("/articles/:article_id/comments", addComment);
apiRouter.patch("/articles/:article_id", updateVotes);
apiRouter.get("/users", getUsers);
apiRouter.delete("/comments/:comment_id", deleteComment)



module.exports = apiRouter;
