const db = require("../db/connection");

exports.selectArticles = (sort_by='created_at', topic, order='desc') => {

  console.log(topic)
  const valid_columns = ['author', 'title', 'article_id', 'topic', 'created_at', 'comment_count'];
  if(!valid_columns.includes(sort_by)){
    return Promise.reject({status:400, msg:'bad request'})
  }

  let queryFormatted = `SELECT author,title, articles.article_id, topic,created_at, COALESCE(comment_count,0)::int as comment_count FROM articles 
  LEFT JOIN (SELECT article_id, count(*) as comment_count FROM comments GROUP BY article_id) b on articles.article_id = b.article_id `
  const queryValues = [];
  
  if(topic){
    queryFormatted += `WHERE topic = $1 `
    queryValues.push(topic)
  }

  queryFormatted += `ORDER BY ${sort_by} `
  
  
  if(order === 'asc' || order==='desc'){ queryFormatted += `${order};`} 
  else {return Promise.reject({status:400, msg:'bad request'})}

 
  return db
    .query(
      queryFormatted, queryValues
    )
    .then(({ rows: articles }) => articles);
};

exports.selectArticleWithId = (article_id) => {
  return db
    .query(`SELECT articles.*, COALESCE(comment_count,0)::int as comment_count FROM articles LEFT JOIN (SELECT article_id, count(*) as comment_count FROM comments GROUP BY article_id) b on articles.article_id = b.article_id where articles.article_id = $1`, [article_id])
    .then(({ rows: [article] }) => {
      console.log(article)
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
