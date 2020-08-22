const Sequelize = require('sequelize');
const Vote = require('../../../models/vote.model');

const VotesController = {
  async create(request, response, next) {
    try {
      const { isUpVote } = request.body;
      const { answerId } = request.params;
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
  async update(request, response, next) {
    try {
      const { isUpVote } = request.body;
      const { answerId } = request.params;
      const newVote = { isUpVote };
      await Vote.update(newVote, {
        where: { answerId, userId: response.locals.currentUser.id },
      });
      const vote = await Vote.findOne({
        where: { answerId, userId: response.locals.currentUser.id },
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
};

module.exports = VotesController;
