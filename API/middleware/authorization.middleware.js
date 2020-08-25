const { can } = require('../lib/permissions');

const Authorization = {
  authorizeCurrentUser(action, getModel, ...getOtherModels) {
    return async (request, response, next) => {
      const { currentUser } = response.locals;
      const allowed = await can(
        currentUser,
        action,
        await getModel(request, response),
        await Promise.all(getOtherModels.map((getOtherModel) => getOtherModel(request, response))),
      );
      if (allowed) {
        next();
      } else {
        response.status(403).send();
      }
    };
  },
};

module.exports = Authorization;
