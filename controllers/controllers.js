const { getTopics } = require("../modellers/topics.model");

const {
  selectArticles,
  articleExists,
  selectArticleWithId,
} = require("../modellers/articles.model");

const { getComments } = require("../modellers/comments.model");

exports.getTopics = (req, res) => {
  getTopics().then((topics) => {
    res.status(200).send(topics);
  });
};

exports.getArticles = (req, res, next) => {
  selectArticles()
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;

  selectArticleWithId(article_id)
    .then((article) => {
      return res.status(200).send({ article });
    })
    .catch(next);
};

exports.getCommentsbyArticleId = (req, res, next) => {
  const { article_id } = req.params;
  Promise.all([selectArticleWithId(article_id), getComments(article_id)])
    .then(([check, comments]) => {
      return res.status(200).send({ comments });
    })
    .catch(next);
};
