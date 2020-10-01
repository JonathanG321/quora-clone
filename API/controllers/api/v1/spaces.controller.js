const Sequelize = require('sequelize');
const Space = require('../../../models/space.model');
const Question = require('../../../models/question.model');
const User = require('../../../models/user.model');
const { RecordNotFoundError } = require('../../api.controller');

const SpacesController = {
  async show(request, response, next) {
    try {
      const { id } = request.params;
      const space = await Space.findOne({
        where: { id },
        include: [{ model: Question, include: { model: User } }, { model: User }],
      });
      if (!space) {
        throw new RecordNotFoundError(Space, id);
      }
      response.json(space);
    } catch (e) {
      next(e);
    }
  },
  async getFollows(request, response, next) {
    try {
      const { id } = request.params;
      const space = await Space.findOne({
        where: { id },
        include: { model: User },
      });
      if (!space) {
        throw new RecordNotFoundError(Space, id);
      }
      response.json(space.users);
    } catch (e) {
      next(e);
    }
  },
  async follow(request, response, next) {
    try {
      const { id } = request.params;
      const space = await Space.findOne({ where: { id } });
      const user = await User.findOne({ where: { id: response.locals.currentUser.id } });
      await user.addSpace(space);
      response.status(201).json(space);
    } catch (e) {
      next(e);
    }
  },
  async unFollow(request, response, next) {
    try {
      const { id } = request.params;
      const space = await Space.findOne({ where: { id } });
      const user = await User.findOne({ where: { id: response.locals.currentUser.id } });
      await user.removeSpace(space);
      response.json({ status: 200, ok: true });
    } catch (e) {
      next(e);
    }
  },
  async getSpaces(request, response, next) {
    try {
      const spaces = await Space.findAll({ limit: 8 });
      response.json(spaces);
    } catch (e) {
      next(e);
    }
  },
  async getTopicSpaces(request, response, next) {
    try {
      const { id } = request.params;
      const spaces = await Space.findAll({ where: { topicId: id }, limit: 8 });
      response.json(spaces);
    } catch (e) {
      next(e);
    }
  },
  async getFollow(request, response, next) {
    try {
      const { id } = request.params;
      const space = await Space.findOne({
        where: { id },
        include: { model: User },
      });
      if (!space) {
        throw new RecordNotFoundError(Space, id);
      }
      const isFollowed = !!space.users.filter((user) => user.id === response.locals.currentUser.id)
        .length;
      response.json({ isFollowed });
    } catch (e) {
      next(e);
    }
  },
  async create(request, response, next) {
    try {
      const { name, tagline, description, topicId } = request.body;
      const newSpace = { name, tagline, description, topicId };
      const space = await Space.create(newSpace);
      response.status(201).json(space);
    } catch (e) {
      next(e);
    }
  },
  async update(request, response, next) {
    try {
      const { name, tagline, description } = request.body;
      const { id } = request.params;
      const newSpace = { name, tagline, description };
      await Space.update(newSpace, { where: { id } });
      const space = await Space.findOne({ where: { id } });
      response.status(201).json(space);
    } catch (e) {
      next(e);
    }
  },
  async destroy(request, response, next) {
    try {
      const { id } = request.params;
      Space.destroy({ where: { id } }).then(() => {
        response.json({ status: 200, ok: true });
      });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = SpacesController;
