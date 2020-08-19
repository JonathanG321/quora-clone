const Router = require('express').Router;
const ApiV1TagsController = require('../../../controllers/api/v1/tags.controller');

const router = new Router();

// /api/v1/tags

router.get('/', ApiV1TagsController.index);

router.post('/', ApiV1TagsController.create);

router.post('/:id', ApiV1TagsController.show);

module.exports = router;
