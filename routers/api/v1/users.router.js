const Router = require('express').Router;
const ApiV1UsersController = require('../../../controllers/api/v1/users.controller');

const router = new Router();

// /api/v1/users

// router.post('/', ApiV1UsersController.create);

// router.get('/current', ApiV1UsersController.currentUser);

module.exports = router;
