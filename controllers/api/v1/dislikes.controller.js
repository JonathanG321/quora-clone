const Sequelize = require('sequelize');
const Dislike = require('../../../models/dislike.model');

const DislikesController = {
  async create(request, response, next) {
    try {
      const { id } = request.params;
      const newDislike = { userId: response.locals.currentUser.id, id };
      const vote = await Dislike.create(newDislike);
      response.status(201).json(vote);
    } catch (e) {
      next(e);
    }
  },
  async destroy(request, response, next) {
    try {
      const { id } = request.params;
      Dislike.destroy({ where: { questionId: id, userId: response.locals.currentUser.id } }).then(
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
