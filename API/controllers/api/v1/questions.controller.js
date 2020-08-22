const Sequelize = require('sequelize');
const Question = require('../../../models/question.model');
const User = require('../../../models/user.model');
const Answer = require('../../../models/answer.model');
const Reply = require('../../../models/reply.model');
const Tag = require('../../../models/tag.model');
const { RecordNotFoundError } = require('../../api.controller');

const QuestionsController = {
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
      if (!question) {
        throw new RecordNotFoundError(Question, id);
      }
      response.json(question);
    } catch (e) {
      next(e);
    }
  },
  async create(request, response, next) {
    try {
      const { title, body, tags, spaceId } = request.body;
      const questionTags = await Tag.findAll({ where: { name: tags } });
      const newQuestion = { title, body, userId: response.locals.currentUser.id, spaceId };
      const question = await Question.create(newQuestion);
      await question.addTags(questionTags);
      response.status(201).json(question);
    } catch (e) {
      next(e);
    }
  },
  async update(request, response, next) {
    try {
      const { title, body, tags } = request.body;
      const { id } = request.params;
      const question = await Question.findOne({ where: { id } });
      const questionTags = await Tag.findAll({ where: { name: tags } });
      const newQuestion = { title, body };
      await question.update(newQuestion, { where: { id } });
      await question.setTags(questionTags, {
        through: 'questionTags',
      });
      response.status(201).json(question);
    } catch (e) {
      next(e);
    }
  },
  async destroy(request, response, next) {
    try {
      const { id } = request.params;
      Question.destroy({ where: { id } }).then(() => {
        response.json({ status: 200, ok: true });
      });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = QuestionsController;
