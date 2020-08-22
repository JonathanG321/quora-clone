const User = require('../../../models/user.model');
const bcrypt = require('bcrypt');

module.exports = {
  async create(request, response, next) {
    try {
      const { email: _email = 'INVALID', password } = request.body;
      const email = _email.toLowerCase();
      const user = await User.findOne({
        where: { email },
        attributes: { include: ['passwordDigest'] },
      });
      request.session.userId = user.id;
      response.json({ id: user.id });
    } catch (error) {
      next(error);
    }
  },
  destroy(request, response, next) {
    try {
      delete request.session.userId;
      response.json({ status: 200, ok: true });
    } catch (e) {
      next(e);
    }
  },
};
