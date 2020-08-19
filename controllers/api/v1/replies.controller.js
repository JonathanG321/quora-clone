const Sequelize = require('sequelize');
const Reply = require('../../../models/reply.model');

const RepliesController = {
  async create(request, response, next) {
    try {
      const { body } = request.body;
      const { id } = request.params;
      const newReply = { body, userId: response.locals.currentUser.id, answerId: id };
      const reply = await Reply.create(newReply);
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
};

module.exports = RepliesController;
