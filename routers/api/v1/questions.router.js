const Router = require('express').Router;
const ApiV1QuestionsController = require('../../../controllers/api/v1/questions.controller');
const answersRouter = require('./answers.router');
const dislikesRouter = require('./dislikes.router');

const router = new Router();

// /api/v1/questions

router.get('/:id', ApiV1QuestionsController.show);

router.post('/', ApiV1QuestionsController.create);

router.patch('/:id', ApiV1QuestionsController.update);

router.delete('/:id', ApiV1QuestionsController.destroy);

router.use('/:questionId/answers', answersRouter);

router.use('/:questionId/dislikes', dislikesRouter);

module.exports = router;
