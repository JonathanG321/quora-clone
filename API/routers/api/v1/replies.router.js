const Router = require('express').Router;
const ApiV1RepliesController = require('../../../controllers/api/v1/replies.controller');
const Authentication = require('../../../middleware/api/v1/authentication.middleware');
const Authorization = require('../../../middleware/authorization.middleware');
const Reply = require('../../../models/reply.model');

const router = new Router({ mergeParams: true });

// /api/v1/questions/:questionId/answers/:answerId/replies

router.use(Authentication.authenticate);

router.get('/', ApiV1RepliesController.getReplies);

router.post(
  '/',
  Authorization.authorizeCurrentUser('create', () => new Reply()),
  ApiV1RepliesController.create,
);

router.patch(
  '/:id',
  Authorization.authorizeCurrentUser('edit', getReply),
  ApiV1RepliesController.update,
);

router.delete(
  '/:id',
  Authorization.authorizeCurrentUser('delete', getReply),
  ApiV1RepliesController.destroy,
);

function getReply(request) {
  const { id } = request.params;
  return Reply.findOne({ where: { id } });
}

module.exports = router;
