const Authentication = {
  authenticate(request, response, next) {
    if (!response.locals.currentUser.id) {
      response.status(401).json({ status: 401 });
    } else {
      next();
    }
  },
};

module.exports = Authentication;
