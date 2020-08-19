const Router = require('express').Router;
const ApiV1SessionController = require('../../../controllers/api/v1/session.controller');

const router = new Router();

// /api/v1/session

router.post('/', ApiV1SessionController.create);

router.delete('/', ApiV1SessionController.destroy);

module.exports = router;
