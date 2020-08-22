const Router = require('express').Router;
const ApiV1AnswersController = require('../../../controllers/api/v1/answers.controller');
const repliesRouter = require('./replies.router');
const votesRouter = require('./votes.router');
const Authentication = require('../../../middleware/api/v1/authentication.middleware');
const Authorization = require('../../../middleware/authorization.middleware');
const Answer = require('../../../models/answer.model');
const AnswerPermissions = require('../../../models/permissions/answers');

const router = new Router({ mergeParams: true });

// /api/v1/questions/:questionId/answers

router.use('/:answerId/replies', repliesRouter);

router.use('/:answerId/votes', votesRouter);

router.use(Authentication.authenticate);

router.post('/', ApiV1AnswersController.create);

router.patch(
  '/:id',
  Authorization.authorize(AnswerPermissions, 'edit', Answer),
  ApiV1AnswersController.update,
);

router.delete(
  '/:id',
  Authorization.authorize(AnswerPermissions, 'delete', Answer),
  ApiV1AnswersController.destroy,
);

module.exports = router;
