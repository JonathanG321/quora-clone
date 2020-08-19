const Sequelize = require('sequelize');
const Question = require('../../../models/question.model');
const User = require('../../../models/user.model');
const Answer = require('../../../models/answer.model');
const Reply = require('../../../models/reply.model');
const Tag = require('../../../models/tag.model');

const QuestionsController = {
  async index(request, response, next) {
    try {
      const questions = await Question.findAll({
        order: [['createdAt', 'DESC']],
        include: { model: User },
      });
      response.json(questions);
    } catch (e) {
      next(e);
    }
  },
  async show(request, response, next) {
    try {
      const { id } = request.params;
      const question = await Question.findOne({
        where: { id },
        include: [
          { model: User },
          {
            model: Answer,
            include: [{ model: User }, { model: Reply, include: { model: User } }],
          },
          { model: Tag },
        ],
      });
      response.json(question);
    } catch (e) {
      next(e);
    }
  },
  async create(request, response, next) {},
  async destroy(request, response, next) {},
};

module.exports = QuestionsController;
