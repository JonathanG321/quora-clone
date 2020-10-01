const Router = require('express').Router;
const ApiV1VotesController = require('../../../controllers/api/v1/votes.controller');
const Authentication = require('../../../middleware/api/v1/authentication.middleware');
const Authorization = require('../../../middleware/authorization.middleware');
const Vote = require('../../../models/vote.model');

const router = new Router({ mergeParams: true });

// /api/v1/questions/:questionId/answers/:answerId/votes

router.use(Authentication.authenticate);

router.get('/', ApiV1VotesController.getVote);

router.post(
  '/',
  Authorization.authorizeCurrentUser('create', () => new Vote()),
  ApiV1VotesController.create,
);

router.delete(
  '/',
  Authorization.authorizeCurrentUser('delete', getVote),
  ApiV1VotesController.destroy,
);

function getVote(request, response) {
  const { answerId } = request.params;
  return Vote.findOne({ where: { userId: response.locals.currentUser.id, answerId } });
}

module.exports = router;
