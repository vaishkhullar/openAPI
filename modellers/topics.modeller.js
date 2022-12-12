const db = require("../db/connection");

exports.getTopics = () => {
  return db.query(`select * from topics`).then(({ rows: topics }) => topics);
};
