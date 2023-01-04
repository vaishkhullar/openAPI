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

exports.deleteCommentById = (comment_id) =>{
  return db.query(
    `DELETE FROM comments where comment_id = $1 RETURNING *`, [comment_id]).then(({rows})=>{
      if(rows.length ===0 )
    {
        return Promise.reject({status:404, msg:'bad request'})
      }
  })
}
