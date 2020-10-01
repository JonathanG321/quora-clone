const Sequelize = require('sequelize');
const Dislike = require('../../../models/dislike.model');

const DislikesController = {
  async getDislike(request, response, next) {
    try {
      const { questionId } = request.params;
      const dislike = await Dislike.findOne({
        where: { userId: response.locals.currentUser.id, questionId },
      });
      response.json(dislike);
    } catch (e) {
      next(e);
    }
  },
  async create(request, response, next) {
    try {
      const { questionId } = request.params;
      const newDislike = { userId: response.locals.currentUser.id, questionId };
      const dislike = await Dislike.create(newDislike);
      response.status(201).json(dislike);
    } catch (e) {
      next(e);
    }
  },
  async destroy(request, response, next) {
    try {
      const { questionId } = request.params;
      Dislike.destroy({ where: { questionId, userId: response.locals.currentUser.id } }).then(
        () => {
          response.json({ status: 200, ok: true });
        },
      );
    } catch (e) {
      next(e);
    }
  },
};

module.exports = DislikesController;
