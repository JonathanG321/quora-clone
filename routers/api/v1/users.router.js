const Router = require('express').Router;
const ApiV1UsersController = require('../../../controllers/api/v1/users.controller');

const router = new Router();

// /api/v1/users

router.get('/current', ApiV1UsersController.currentUser);

router.post('/', ApiV1UsersController.create);

router.get('/:id', ApiV1UsersController.show);

router.patch('/:id', ApiV1UsersController.update);

module.exports = router;
