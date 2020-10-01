const User = require('../../../models/user.model');
const Space = require('../../../models/space.model');
const Topic = require('../../../models/topic.model');
const { RecordNotFoundError } = require('../../api.controller');

module.exports = {
  async create(request, response, next) {
    try {
      const { firstName, lastName, password = '', passwordConfirmation, email = '' } = request.body;
      const newUser = {
        firstName,
        lastName,
        avatar,
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
  async update(request, response, next) {
    try {
      const { id } = request.params;
      const { firstName, lastName } = request.body;
      const newUser = {
        firstName,
        lastName,
      };
      const user = await User.update(newUser, { where: id });
      response.json({ user });
    } catch (e) {
      next(e);
    }
  },
  async show(request, response, next) {
    try {
      const { id } = request.params;
      const user = await User.findOne({ where: { id } });
      if (!user) {
        throw new RecordNotFoundError(User, id);
      }
      response.json({ user });
    } catch (e) {
      next(e);
    }
  },
  async getUserSpaces(request, response, next) {
    try {
      const user = await User.findOne({
        where: { id: response.locals.currentUser.id },
        include: { model: Space },
      });
      if (!user) {
        throw new RecordNotFoundError(User, id);
      }
      response.json(user.spaces);
    } catch (e) {
      next(e);
    }
  },
  async getUserTopics(request, response, next) {
    try {
      const user = await User.findOne({
        where: { id: response.locals.currentUser.id },
        include: { model: Topic },
      });
      if (!user) {
        throw new RecordNotFoundError(User, id);
      }
      response.json(user.topics);
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
