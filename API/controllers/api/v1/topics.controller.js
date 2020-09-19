const Sequelize = require('sequelize');
const Topic = require('../../../models/topic.model');
const Space = require('../../../models/space.model');
const Question = require('../../../models/question.model');
const User = require('../../../models/user.model');
const Answer = require('../../../models/answer.model');
const Vote = require('../../../models/vote.model');
const { RecordNotFoundError } = require('../../api.controller');

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
      if (!topic) {
        throw new RecordNotFoundError(Topic, id);
      }
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
  async getQuestions(request, response, next) {
    const { limit = 20, offset = 0, topicId } = request.params;
    try {
      const spaceIds = (await Space.findAll({ where: { topicId } })).map((space) => space.id);
      const questions = await Question.findAll({
        where: { spaceId: spaceIds },
        order: [
          ['createdAt', 'DESC'],
          ['id', 'DESC'],
        ],
        include: { model: Answer, include: [{ model: User }, { model: Vote }] },
        limit,
        offset,
      });
      console.log(questions);
      response.json(questions);
    } catch (e) {
      next(e);
    }
  },
};

module.exports = TopicsController;
