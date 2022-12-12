const express = require("express");
const apiRouter = express.Router();
const { getTopics } = require("../controllers/topics.controllers");

apiRouter.get("/getTopics", getTopics);

module.exports = apiRouter;
