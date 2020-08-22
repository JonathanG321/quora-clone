const Router = require('express').Router;
const ApiV1SpacesController = require('../../../controllers/api/v1/spaces.controller');
const Authentication = require('../../../middleware/api/v1/authentication.middleware');

const router = new Router();

// /api/v1/spaces

router.get('/:id', ApiV1SpacesController.show);

router.use(Authentication.authenticate);

router.post('/', ApiV1SpacesController.create);

router.patch('/:id', ApiV1SpacesController.update);

router.delete('/:id', ApiV1SpacesController.destroy);

module.exports = router;
