const Sequelize = require('sequelize');
const User = require('../../../models/user.model');
const Answer = require('../../../models/answer.model');

const AnswersController = {
  async create(request, response, next) {
    try {
      const { body } = request.body;
      const { id } = request.params;
      const newAnswer = { body, userId: response.locals.currentUser.id, questionId: id };
      const answer = await Answer.create(newAnswer);
      response.status(201).json(answer);
    } catch (e) {
      next(e);
    }
  },
  async destroy(request, response, next) {
    try {
      const { id } = request.body;
      Answer.destroy({ where: { id } }).then(() => {
        response.json({ status: 200, ok: true });
      });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = AnswersController;
