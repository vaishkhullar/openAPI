const {
  selectArticles,
  articleExists,
  selectArticleWithId,
  updateVotesArticlesTable,
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

  addCommenttoTable(article_id, comment)
    .then((comment) => {
      return res.status(201).send({ comment });
    })
    .catch(next);
};

exports.updateVotes = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  Promise.all([
    selectArticleWithId(article_id),
    updateVotesArticlesTable(inc_votes, article_id),
  ])
    .then(([check, article]) => {
      return res.status(200).send({ article });
    })
    .catch(next);
};
