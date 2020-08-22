const Router = require('express').Router;
const ApiV1RepliesController = require('../../../controllers/api/v1/replies.controller');
const Authentication = require('../../../middleware/api/v1/authentication.middleware');
const Authorization = require('../../../middleware/authorization.middleware');
const Reply = require('../../../models/reply.model');
const ReplyPermissions = require('../../../models/permissions/replies');

const router = new Router({ mergeParams: true });

// /api/v1/questions/:questionId/answers/:answerId/replies

router.use(Authentication.authenticate);

router.post('/', ApiV1RepliesController.create);

router.patch(
  '/:id',
  Authorization.authorize(ReplyPermissions, 'edit', Reply),
  ApiV1RepliesController.update,
);

router.delete(
  '/:id',
  Authorization.authorize(ReplyPermissions, 'delete', Reply),
  ApiV1RepliesController.destroy,
);

module.exports = router;
