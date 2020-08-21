const Router = require('express').Router;
const ApiV1TopicsController = require('../../../controllers/api/v1/topics.controller');

const router = new Router();

// /api/v1/topics

router.get('/:id', ApiV1TopicsController.show);

router.post('/', ApiV1TopicsController.create);

router.patch('/:id', ApiV1TopicsController.update);

router.delete('/:id', ApiV1TopicsController.destroy);

module.exports = router;
