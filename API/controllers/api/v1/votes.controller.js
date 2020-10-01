const Sequelize = require('sequelize');
const Vote = require('../../../models/vote.model');

const VotesController = {
  async create(request, response, next) {
    try {
      const { isUpVote } = request.body;
      const { answerId } = request.params;
      await Vote.destroy({ where: { answerId, userId: response.locals.currentUser.id } });
      const newVote = { userId: response.locals.currentUser.id, answerId, isUpVote };
      await Vote.create(newVote);
      const vote = await Vote.findOne({
        where: { userId: response.locals.currentUser.id, answerId },
      });
      response.status(201).json(vote);
    } catch (e) {
      next(e);
    }
  },
  async destroy(request, response, next) {
    try {
      const { answerId } = request.params;
      Vote.destroy({ where: { answerId, userId: response.locals.currentUser.id } }).then(() => {
        response.json({ status: 200, ok: true });
      });
    } catch (e) {
      next(e);
    }
  },
  async getVote(request, response, next) {
    try {
      const { answerId } = request.params;
      const vote = await Vote.findOne({
        where: { answerId, userId: response.locals.currentUser.id },
      });
      response.json(vote);
    } catch (e) {
      next(e);
    }
  },
};

module.exports = VotesController;
