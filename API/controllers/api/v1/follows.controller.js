const { Op } = require('sequelize');
const Topic = require('../../../models/topic.model');
const Space = require('../../../models/space.model');
const { RecordNotFoundError } = require('../../api.controller');

module.exports = {
  async getFollows(request, response, next) {
    try {
      const follows = (await response.locals.currentUser.getSpaces())
        .map((space) => {
          space.type = 'space';
          return space;
        })
        .concat(
          (await response.locals.currentUser.getTopics()).map((topic) => {
            topic.type = 'topic';
            return topic;
          }),
        );
      if (follows.length === 0) {
        throw new RecordNotFoundError(Topic, id);
      }
      response.json({ follows });
    } catch (e) {
      next(e);
    }
  },
};
