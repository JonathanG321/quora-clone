const Router = require('express').Router;
const ApiV1TopicsController = require('../../../controllers/api/v1/topics.controller');
const Authentication = require('../../../middleware/api/v1/authentication.middleware');
const Authorization = require('../../../middleware/authorization.middleware');
const Topic = require('../../../models/topic.model');

const router = new Router();

// /api/v1/topics

router.get('/all', ApiV1TopicsController.allTopics);

router.get('/', ApiV1TopicsController.userTopics);

router.get('/:id', ApiV1TopicsController.show);

router.get('/:topicId/questions', ApiV1TopicsController.getQuestions);

router.get('/:id/follows', ApiV1TopicsController.getFollows);

router.get('/:id/follow', ApiV1TopicsController.getFollow);

router.use(Authentication.authenticate);

router.post('/:id/follow', ApiV1TopicsController.follow);

router.delete('/:id/follow', ApiV1TopicsController.unFollow);

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
