const Router = require('express').Router;
const ApiV1DislikesController = require('../../../controllers/api/v1/dislikes.controller');

const router = new Router({ mergeParams: true });

// /api/v1/questions/:id/dislikes

router.post('/', ApiV1DislikesController.create);

router.delete('/', ApiV1DislikesController.destroy);

module.exports = router;
