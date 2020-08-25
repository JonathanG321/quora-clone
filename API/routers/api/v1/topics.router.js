const Router = require('express').Router;
const ApiV1TopicsController = require('../../../controllers/api/v1/topics.controller');
const Authentication = require('../../../middleware/api/v1/authentication.middleware');
const Authorization = require('../../../middleware/authorization.middleware');
const Topic = require('../../../models/topic.model');

const router = new Router();

// /api/v1/topics

router.get('/:id', ApiV1TopicsController.show);

router.use(Authentication.authenticate);

router.post(
  '/',
  Authorization.authorizeCurrentUser('create', () => new Topic()),
  ApiV1TopicsController.create,
);

router.patch(
  '/:id',
  Authorization.authorizeCurrentUser('edit', getTopic),
  ApiV1TopicsController.update,
);

router.delete(
  '/:id',
  Authorization.authorizeCurrentUser('delete', getTopic),
  ApiV1TopicsController.destroy,
);

function getTopic(request) {
  const { id } = request.params;
  return Topic.findOne({ where: { id } });
}

module.exports = router;
