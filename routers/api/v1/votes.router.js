const Router = require('express').Router;
const ApiV1VotesController = require('../../../controllers/api/v1/votes.controller');

const router = new Router();

// /api/v1/questions/:questionId/answers/:answerId/votes

router.post('/', ApiV1VotesController.create);

router.patch('/:id', ApiV1VotesController.update);

router.delete('/:id', ApiV1VotesController.destroy);

module.exports = router;
