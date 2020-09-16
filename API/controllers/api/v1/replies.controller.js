const Sequelize = require('sequelize');
const Reply = require('../../../models/reply.model');
const User = require('../../../models/user.model');

const RepliesController = {
  async create(request, response, next) {
    try {
      const { body } = request.body;
      const { answerId } = request.params;
      const newReply = { body, userId: response.locals.currentUser.id, answerId };
      const createdReply = await Reply.create(newReply);
      const reply = await Reply.findOne({
        where: { id: createdReply.id },
        include: { model: User },
      });
      response.status(201).json(reply);
    } catch (e) {
      next(e);
    }
  },
  async update(request, response, next) {
    try {
      const { body } = request.body;
      const { replyId: id } = request.params;
      const newReply = { body };
      const reply = await Reply.create(newReply, { where: id });
      response.status(201).json(reply);
    } catch (e) {
      next(e);
    }
  },
  async destroy(request, response, next) {
    try {
      const { id } = request.body;
      Reply.destroy({ where: { id } }).then(() => {
        response.json({ status: 200, ok: true });
      });
    } catch (e) {
      next(e);
    }
  },
  async getReplies(request, response, next) {
    try {
      const { answerId } = request.params;
      const { limit, offset } = request.query;
      const replies = await Reply.findAll({
        where: { answerId },
        include: { model: User },
        limit,
        offset,
        order: [
          ['createdAt', 'DESC'],
          ['id', 'DESC'],
        ],
      });
      response.json(replies);
    } catch (e) {
      next(e);
    }
  },
};

module.exports = RepliesController;
