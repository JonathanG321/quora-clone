const Router = require('express').Router;
const ApiV1FollowsController = require('../../../controllers/api/v1/follows.controller');
const Authentication = require('../../../middleware/api/v1/authentication.middleware');

const router = new Router({ mergeParams: true });

// /api/v1/follows

router.use(Authentication.authenticate);

router.get('/', ApiV1FollowsController.getFollows);

module.exports = router;
