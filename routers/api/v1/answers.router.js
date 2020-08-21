const Router = require('express').Router;
const ApiV1AnswersController = require('../../../controllers/api/v1/answers.controller');
const repliesRouter = require('./replies.router');

const router = new Router({ mergeParams: true });

// /api/v1/questions/:questionId/answers

router.post('/', ApiV1AnswersController.create);

router.patch('/:id', ApiV1AnswersController.update);

router.delete('/:id', ApiV1AnswersController.destroy);

router.use('/:answerId/replies', repliesRouter);

module.exports = router;
