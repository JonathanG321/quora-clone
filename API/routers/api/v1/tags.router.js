const Router = require('express').Router;
const ApiV1TagsController = require('../../../controllers/api/v1/tags.controller');
const Authentication = require('../../../middleware/api/v1/authentication.middleware');
const Authorization = require('../../../middleware/authorization.middleware');
const Tag = require('../../../models/tag.model');

const router = new Router();

// /api/v1/tags

router.get('/', ApiV1TagsController.index);

router.get('/:id', ApiV1TagsController.show);

router.use(Authentication.authenticate);

router.post(
  '/',
  Authorization.authorizeCurrentUser('create', () => new Tag()),
  ApiV1TagsController.create,
);

module.exports = router;
