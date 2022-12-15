const db = require("../db/connection");

exports.getComments = (article_id) => {
  return db
    .query(`SELECT * FROM comments where article_id = $1`, [article_id])
    .then(({ rows }) => {
      return rows;
    });
};

exports.addCommenttoTable = (article_id, comment) => {
  return db
    .query(
      `INSERT INTO comments (article_id, author, body) VALUES ($1,$2, $3) RETURNING *`,
      [article_id, comment.username, comment.body]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
