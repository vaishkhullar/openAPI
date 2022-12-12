const db = require("../db/connection");

exports.getTopics = () => {
  return db.query(`SELECT * FROM topics`).then(({ rows: topics }) => topics);
};

exports.selectArticles = () => {
  return db
    .query(
      `SELECT author,title, articles.article_id, topic,created_at, COALESCE(comment_count,0)::int as comment_count FROM articles 
      LEFT JOIN (SELECT article_id, count(*) as comment_count FROM comments GROUP BY article_id) b on articles.article_id = b.article_id ORDER BY created_at DESC`
    )
    .then(({ rows: articles }) => articles);
};
