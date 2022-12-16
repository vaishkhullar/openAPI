const express = require("express");

const apiRouter = require("./routers/api.router");

const app = express();
app.use(express.json());

//router
app.use("/api", apiRouter);

//error handling

app.use("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

app.use((err, req, res, next) => {
  if (err.msg) {
    return res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    // type is different
    res.status(400).send({ msg: "bad request" });
  } else if (err.code === "23503") {
    // this is missing foreign key
    res.status(404).send({ msg: "not found" });
  } else if (err.code === "23502") {
    res.status(400).send({ msg: "missing required field(s)" });
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "internal server error" });
});

module.exports = app;
