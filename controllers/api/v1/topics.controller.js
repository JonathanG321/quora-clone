const Sequelize = require('sequelize');
const Topic = require('../../../models/topic.model');
const Space = require('../../../models/space.model');
const User = require('../../../models/user.model');

const TopicsController = {
  async index(request, response, next) {
    try {
      const topics = await Topic.findAll();
      response.json(topics);
    } catch (e) {
      next(e);
    }
  },
  async show(request, response, next) {
    try {
      const { id } = request.params;
      const topic = await Topic.findOne({
        where: { id },
        include: { model: Space, include: { model: User } },
      });
      response.json(topic);
    } catch (e) {
      next(e);
    }
  },
  async create(request, response, next) {
    try {
      const { name, tagline, description } = request.body;
      const newTopic = { name, tagline, description };
      const topic = await Topic.create(newTopic);
      response.status(201).json(topic);
    } catch (e) {
      next(e);
    }
  },
  async update(request, response, next) {
    try {
      const { name, tagline, description } = request.body;
      const { id } = request.params;
      const newTopic = { name, tagline, description };
      await Topic.update(newTopic, { where: { id } });
      const topic = await Topic.findOne({ where: { id } });
      response.status(201).json(topic);
    } catch (e) {
      next(e);
    }
  },
  async destroy(request, response, next) {
    try {
      const { id } = request.params;
      Topic.destroy({ where: { id } }).then(() => {
        response.json({ status: 200, ok: true });
      });
    } catch (e) {
      next(e);
    }
  },
};

module.exports = TopicsController;
