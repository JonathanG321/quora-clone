const Router = require('express').Router;
const ApiV1AnswersController = require('../../../controllers/api/v1/answers.controller');
const repliesRouter = require('./replies.router');

const router = new Router();

// /api/v1/questions/:id/answers

router.post('/', ApiV1AnswersController.create);

router.patch('/:answerId', ApiV1AnswersController.update);

router.delete('/:answerId', ApiV1AnswersController.destroy);

router.use('/:answerId/replies', repliesRouter);

module.exports = router;
