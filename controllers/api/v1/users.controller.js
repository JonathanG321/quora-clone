const Sequelize = require('sequelize');
const User = require('../../../models/user.model');

module.exports = {
  async create(request, response, next) {
    try {
      const { firstName, lastName, password = '', passwordConfirmation, email = '' } = request.body;
      const newUser = {
        firstName,
        lastName,
        password,
        passwordConfirmation,
        email: email.toLowerCase(),
      };
      const user = await User.create(newUser);
      request.session.userId = user.id;
      response.json({ id: user.id });
    } catch (e) {
      next(e);
    }
  },
  async currentUser(request, response, next) {
    try {
      response.json(response.locals.currentUser);
    } catch (e) {
      next(e);
    }
  },
};
