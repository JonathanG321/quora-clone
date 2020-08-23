const Router = require('express').Router;
const ApiV1VotesController = require('../../../controllers/api/v1/votes.controller');
const Authentication = require('../../../middleware/api/v1/authentication.middleware');
const Authorization = require('../../../middleware/authorization.middleware');
const Answer = require('../../../models/answer.model');

const router = new Router({ mergeParams: true });

// /api/v1/questions/:questionId/answers/:answerId/votes

router.use(Authentication.authenticate);

router.post(
  '/',
  // Authorization.authorize(AnswerPermissions, 'vote', Answer),
  ApiV1VotesController.create,
);

router.patch(
  '/',
  // Authorization.authorize(AnswerPermissions, 'vote', Answer),
  ApiV1VotesController.update,
);

router.delete(
  '/',
  // Authorization.authorize(AnswerPermissions, 'vote', Answer),
  ApiV1VotesController.destroy,
);

module.exports = router;
