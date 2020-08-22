const Router = require('express').Router;
const ApiV1RepliesController = require('../../../controllers/api/v1/replies.controller');
const Authentication = require('../../../middleware/api/v1/authentication.middleware');

const router = new Router({ mergeParams: true });

// /api/v1/questions/:questionId/answers/:answerId/replies

router.use(Authentication.authenticate);

router.post('/', ApiV1RepliesController.create);

router.patch('/:id', ApiV1RepliesController.update);

router.delete('/:id', ApiV1RepliesController.destroy);

module.exports = router;
