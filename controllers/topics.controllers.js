const { getTopics, selectArticles } = require("../modellers/topics.modeller");

exports.getTopics = (req, res) => {
  getTopics().then((topics) => {
    res.status(200).send(topics);
  });
};

exports.getArticles = (req, res, next) => {
  selectArticles().then((articles) => {
    res.status(200).send(articles);
  });
};
