const Router = require('express').Router;
const ApiV1AnswersController = require('../../../controllers/api/v1/answers.controller');
const repliesRouter = require('./replies.router');
const votesRouter = require('./votes.router');

const router = new Router({ mergeParams: true });

// /api/v1/questions/:questionId/answers

router.use('/:answerId/replies', repliesRouter);

router.use('/:answerId/votes', votesRouter);

router.post('/', ApiV1AnswersController.create);

router.patch('/:id', ApiV1AnswersController.update);

router.delete('/:id', ApiV1AnswersController.destroy);

module.exports = router;
