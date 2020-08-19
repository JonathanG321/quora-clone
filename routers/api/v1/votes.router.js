const Router = require('express').Router;
const ApiV1VotesController = require('../../../controllers/api/v1/votes.controller');

const router = new Router();

// /api/v1/questions/:id/answers

router.post('/:answerId', ApiV1VotesController.create);

router.patch('/:answerId', ApiV1VotesController.update);

router.delete('/:answerId', ApiV1VotesController.destroy);

module.exports = router;
