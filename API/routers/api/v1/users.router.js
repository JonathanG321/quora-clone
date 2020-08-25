const Router = require('express').Router;
const ApiV1UsersController = require('../../../controllers/api/v1/users.controller');
const Authentication = require('../../../middleware/api/v1/authentication.middleware');
const Authorization = require('../../../middleware/authorization.middleware');
const User = require('../../../models/user.model');

const router = new Router();

// /api/v1/users

router.get('/current', Authentication.authenticate, ApiV1UsersController.currentUser);

router.post('/', ApiV1UsersController.create);

router.get('/:id', ApiV1UsersController.show);

router.use(Authentication.authenticate);

router.patch(
  '/:id',
  Authorization.authorizeCurrentUser('edit', getUser),
  ApiV1UsersController.update,
);

function getUser(request, response) {
  const { id } = request.params;
  return User.findOne({ where: { userId: id } });
}

module.exports = router;
