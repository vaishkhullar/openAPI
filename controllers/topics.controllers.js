const { getTopics } = require("../modellers/topics.model");

exports.getTopics = (req, res) => {
  getTopics().then((topics) => {
    res.status(200).send(topics);
  });
};
