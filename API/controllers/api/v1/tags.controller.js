const Sequelize = require('sequelize');
const User = require('../../../models/user.model');
const Question = require('../../../models/question.model');
const Tag = require('../../../models/tag.model');
const { RecordNotFoundError } = require('../../api.controller');

const TagsController = {
  async index(request, response, next) {
    try {
      const tags = await Tag.findAll();
      response.json(tags);
    } catch (e) {
      next(e);
    }
  },
  async show(request, response, next) {
    try {
      const { id } = request.params;
      const tag = await Tag.findOne({
        where: { id },
        include: [
          {
            model: Question,
            include: { model: User },
          },
        ],
      });
      if (!tag) {
        throw new RecordNotFoundError(Tag, id);
      }
      response.json(tag);
    } catch (e) {
      next(e);
    }
  },
  async create(request, response, next) {
    try {
      const { name } = request.body;
      const newTag = { name };
      const tag = await Tag.create(newTag);
      response.status(201).json(tag);
    } catch (e) {
      next(e);
    }
  },
};

module.exports = TagsController;
