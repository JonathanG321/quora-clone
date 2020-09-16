const Sequelize = require('sequelize');
const User = require('../../../models/user.model');
const Answer = require('../../../models/answer.model');
const Reply = require('../../../models/reply.model');

const AnswersController = {
  async create(request, response, next) {
    try {
      const { body } = request.body;
      const { questionId } = request.params;
      const newAnswer = { body, userId: response.locals.currentUser.id, questionId };
      const answer = await Answer.create(newAnswer);
      response.status(201).json(answer);
    } catch (e) {
      next(e);
    }
  },
  async update(request, response, next) {
    try {
      const { body } = request.body;
      const { id } = request.params;
      const newAnswer = { body };
      const answer = await Answer.update(newAnswer, { where: { id } });
      response.status(201).json(answer);
    } catch (e) {
      next(e);
    }
  },
  async destroy(request, response, next) {
    try {
      const { id } = request.params;
      Answer.destroy({ where: { id } }).then(() => {
        response.json({ status: 200, ok: true });
      });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = AnswersController;
