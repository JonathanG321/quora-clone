const User = require('../models/user.model');

const Authorization = {
  authorize(Permission, action, Model) {
    return (request, response, next) => {
      const { currentUser } = response.locals;
      const { id } = request.params;
      Model.findOne({ where: { id }, include: [{ model: User }] }).then((model) => {
        if (Permission.cannot(currentUser, action, model)) {
          response.redirect('/');
        } else {
          next();
        }
      });
    };
  },
};

module.exports = Authorization;
