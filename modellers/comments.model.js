const db = require("../db/connection");

exports.getComments = (article_id) => {
  return db
    .query(`SELECT * FROM comments where article_id = $1`, [article_id])
    .then(({ rows }) => {
      //console.log(rows, "comments models");
      return rows;
    });
};
