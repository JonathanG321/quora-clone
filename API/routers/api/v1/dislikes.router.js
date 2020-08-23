const Router = require('express').Router;
const ApiV1DislikesController = require('../../../controllers/api/v1/dislikes.controller');
const Authentication = require('../../../middleware/api/v1/authentication.middleware');
const Authorization = require('../../../middleware/authorization.middleware');
const Question = require('../../../models/question.model');

const router = new Router({ mergeParams: true });

// /api/v1/questions/:id/dislikes

router.use(Authentication.authenticate);

router.post(
  '/',
  // Authorization.authorize(QuestionPermissions, 'dislike', Question),
  ApiV1DislikesController.create,
);

router.delete(
  '/',
  // Authorization.authorize(QuestionPermissions, 'dislike', Question),
  ApiV1DislikesController.destroy,
);

module.exports = router;
