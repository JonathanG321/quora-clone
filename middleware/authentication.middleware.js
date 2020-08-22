const User = require('../models/user.model');

const Authentication = {
  async setCurrentUser(request, response, next) {
    const { userId } = request.session;
    response.locals.currentUser = {};
    try {
      if (!userId) {
        throw new NoSessionError();
      }
      const user = await User.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw new NoSessionError();
      }
      response.locals.currentUser = user;
      next();
    } catch (error) {
      if (error instanceof NoSessionError) {
        next();
        return;
      }
    }
  },
  authenticate(request, response, next) {
    if (!response.locals.currentUser.id) {
      response.redirect('/session/new');
    } else {
      next();
    }
  },
};

class NoSessionError extends Error {}

module.exports = Authentication;
