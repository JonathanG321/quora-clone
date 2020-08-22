const Router = require('express').Router;
const ApiV1UsersController = require('../../../controllers/api/v1/users.controller');
const Authentication = require('../../../middleware/api/v1/authentication.middleware');

const router = new Router();

// /api/v1/users

router.get('/current', Authentication.authenticate, ApiV1UsersController.currentUser);

router.post('/', ApiV1UsersController.create);

router.get('/:id', ApiV1UsersController.show);

router.use(Authentication.authenticate);

router.patch('/:id', ApiV1UsersController.update);

module.exports = router;
