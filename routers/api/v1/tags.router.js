const Router = require('express').Router;
const ApiV1TagsController = require('../../../controllers/api/v1/tags.controller');
const Authentication = require('../../../middleware/api/v1/authentication.middleware');

const router = new Router();

// /api/v1/tags

router.get('/', ApiV1TagsController.index);

router.get('/:id', ApiV1TagsController.show);

router.use(Authentication.authenticate);

router.post('/', ApiV1TagsController.create);

module.exports = router;
