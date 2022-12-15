const {
  selectArticles,
  articleExists,
  selectArticleWithId,
} = require("../modellers/articles.model");

const { addCommenttoTable } = require("../modellers/comments.model");

exports.getArticles = (req, res, next) => {
  selectArticles()
    .then((articles) => {
      res.status(200).send({ articles });
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

exports.addComment = (req, res, next) => {
  const comment = req.body;
  const { article_id } = req.params;
  Promise.all([
    selectArticleWithId(article_id),
    addCommenttoTable(article_id, comment),
  ])
    .then(([check, comment]) => {
      return res.status(201).send({ comment });
    })
    .catch(next);
};
