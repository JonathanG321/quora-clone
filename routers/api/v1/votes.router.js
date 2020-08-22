const Router = require('express').Router;
const ApiV1VotesController = require('../../../controllers/api/v1/votes.controller');
const Authentication = require('../../../middleware/api/v1/authentication.middleware');

const router = new Router({ mergeParams: true });

// /api/v1/questions/:questionId/answers/:answerId/votes

router.use(Authentication.authenticate);

router.post('/', ApiV1VotesController.create);

router.patch('/', ApiV1VotesController.update);

router.delete('/', ApiV1VotesController.destroy);

module.exports = router;
