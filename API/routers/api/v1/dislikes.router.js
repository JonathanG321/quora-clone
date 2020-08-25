const Router = require('express').Router;
const ApiV1DislikesController = require('../../../controllers/api/v1/dislikes.controller');
const Authentication = require('../../../middleware/api/v1/authentication.middleware');
const Authorization = require('../../../middleware/authorization.middleware');
const Dislike = require('../../../models/dislike.model');

const router = new Router({ mergeParams: true });

// /api/v1/questions/:id/dislikes

router.use(Authentication.authenticate);

router.post(
  '/',
  Authorization.authorizeCurrentUser('create', () => new Dislike()),
  ApiV1DislikesController.create,
);

router.delete(
  '/',
  Authorization.authorizeCurrentUser('delete', getDislike),
  ApiV1DislikesController.destroy,
);

function getDislike(request, response) {
  const { id } = request.params;
  return Dislike.findOne({ where: { userId: response.locals.currentUser.id, questionId: id } });
}

module.exports = router;
