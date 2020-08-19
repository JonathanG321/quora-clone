const Router = require('express').Router;
const ApiV1QuestionsController = require('../../../controllers/api/v1/questions.controller');
const answersRouter = require('./answers.router');

const router = new Router();

// /api/v1/questions

router.get('/', ApiV1QuestionsController.index);

router.get('/:id', ApiV1QuestionsController.show);

router.post('/', ApiV1QuestionsController.create);

router.delete('/:id', ApiV1QuestionsController.destroy);

router.use('/:id', answersRouter);

module.exports = router;
