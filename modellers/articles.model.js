const db = require("../db/connection");

exports.selectArticles = () => {
  return db
    .query(
      `SELECT author,title, articles.article_id, topic,created_at, COALESCE(comment_count,0)::int as comment_count FROM articles 
        LEFT JOIN (SELECT article_id, count(*) as comment_count FROM comments GROUP BY article_id) b on articles.article_id = b.article_id ORDER BY created_at DESC`
    )
    .then(({ rows: articles }) => articles);
};

exports.selectArticleWithId = (article_id) => {
  return db
    .query(`SELECT * FROM articles where article_id = $1`, [article_id])
    .then(({ rows: [article] }) => {
      if (article) {
        return article;
      } else {
        return Promise.reject({ status: 404, msg: "not found" });
      }
    });
};

exports.updateVotesArticlesTable = (inc_votes, article_id) => {
  const query =
    "UPDATE articles SET votes = votes + $1 WHERE article_id=$2 RETURNING *;";
  return db
    .query(query, [inc_votes, article_id])
    .then(({ rows: [article] }) => article);
};
