const Router = require('express').Router;
const ApiV1AnswersController = require('../../../controllers/api/v1/answers.controller');

const router = new Router();

// /api/v1/questions/:id/answers/:answerId/replies

router.post('/', ApiV1AnswersController.create);

router.patch('/:replyId', ApiV1AnswersController.update);

router.delete('/:replyId', ApiV1AnswersController.destroy);

module.exports = router;
