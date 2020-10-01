const Router = require('express').Router;
const ApiV1QuestionsController = require('../../../controllers/api/v1/questions.controller');
const answersRouter = require('./answers.router');
const dislikesRouter = require('./dislikes.router');
const Authentication = require('../../../middleware/api/v1/authentication.middleware');
const Authorization = require('../../../middleware/authorization.middleware');
const Question = require('../../../models/question.model');

const router = new Router();

// /api/v1/questions

router.use('/:questionId/answers', answersRouter);

router.use('/:questionId/dislikes', dislikesRouter);

router.get('/:id/card', ApiV1QuestionsController.showCard);

router.get('/recent', ApiV1QuestionsController.getRecent);

router.get('/related/:spaceId', ApiV1QuestionsController.getRelated);

router.get('/feed', Authentication.authenticate, ApiV1QuestionsController.getFeed);

router.get('/:id', ApiV1QuestionsController.show);

router.use(Authentication.authenticate);

router.post(
  '/',
  Authorization.authorizeCurrentUser('create', () => new Question()),
  ApiV1QuestionsController.create,
);

router.patch(
  '/:id',
  Authorization.authorizeCurrentUser('edit', getQuestion),
  ApiV1QuestionsController.update,
);

router.delete(
  '/:id',
  Authorization.authorizeCurrentUser('delete', getQuestion),
  ApiV1QuestionsController.destroy,
);

function getQuestion(request) {
  const { id } = request.params;
  return Question.findOne({ where: { id } });
}

module.exports = router;
