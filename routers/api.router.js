const express = require("express");
const apiRouter = express.Router();

apiRouter.get("/topics", getTopics);

module.exports = apiRouter;
