const express = require("express");
const apiRouter = express.Router();
const { getTopics, getArticles } = require("../controllers/topics.controllers");

apiRouter.get("/getTopics", getTopics);
apiRouter.get("/articles", getArticles);

module.exports = apiRouter;
