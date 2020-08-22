const Router = require('express').Router;
const ApiV1QuestionsController = require('../../../controllers/api/v1/questions.controller');
const answersRouter = require('./answers.router');
const dislikesRouter = require('./dislikes.router');
const Authentication = require('../../../middleware/api/v1/authentication.middleware');
const Authorization = require('../../../middleware/authorization.middleware');
const Question = require('../../../models/question.model');
const QuestionPermissions = require('../../../models/permissions/questions');

const router = new Router();

// /api/v1/questions

router.use('/:questionId/answers', answersRouter);

router.use('/:questionId/dislikes', dislikesRouter);

router.get('/:id', ApiV1QuestionsController.show);

router.use(Authentication.authenticate);

router.post('/', ApiV1QuestionsController.create);

router.patch(
  '/:id',
  Authorization.authorize(QuestionPermissions, 'edit', Question),
  ApiV1QuestionsController.update,
);

router.delete(
  '/:id',
  Authorization.authorize(QuestionPermissions, 'delete', Question),
  ApiV1QuestionsController.destroy,
);

module.exports = router;
