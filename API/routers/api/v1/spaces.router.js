const Router = require('express').Router;
const ApiV1SpacesController = require('../../../controllers/api/v1/spaces.controller');
const Authentication = require('../../../middleware/api/v1/authentication.middleware');
const Authorization = require('../../../middleware/authorization.middleware');
const Space = require('../../../models/space.model');

const router = new Router();

// /api/v1/spaces

router.get('/', ApiV1SpacesController.getSpaces);

router.get('/topic/:id', ApiV1SpacesController.getTopicSpaces);

router.get('/:id/follows', ApiV1SpacesController.getFollows);

router.get('/:id/follow', ApiV1SpacesController.getFollow);

router.get('/:id', ApiV1SpacesController.show);

router.use(Authentication.authenticate);

router.post('/:id/follow', ApiV1SpacesController.follow);

router.delete('/:id/follow', ApiV1SpacesController.unFollow);

router.post(
  '/',
  Authorization.authorizeCurrentUser('create', () => new Space()),
  ApiV1SpacesController.create,
);

router.patch(
  '/:id',
  Authorization.authorizeCurrentUser('edit', getSpace),
  ApiV1SpacesController.update,
);

router.delete(
  '/:id',
  Authorization.authorizeCurrentUser('delete', getSpace),
  ApiV1SpacesController.destroy,
);

function getSpace(request) {
  const { id } = request.params;
  return Space.findOne({ where: { id } });
}

module.exports = router;
