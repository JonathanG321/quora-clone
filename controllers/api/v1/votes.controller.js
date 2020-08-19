const Sequelize = require('sequelize');
const Vote = require('../../../models/vote.model');

const VotesController = {
  async create(request, response, next) {
    try {
      const { answerId, isUpVote } = request.body;
      const newVote = { userId: response.locals.currentUser.id, answerId, isUpVote };
      const vote = await Vote.create(newVote);
      response.status(201).json(vote);
    } catch (e) {
      next(e);
    }
  },
  async update(request, response, next) {
    try {
      const { answerId, isUpVote } = request.body;
      const newVote = { isUpVote };
      const vote = await Vote.update(newVote, {
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
