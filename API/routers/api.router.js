const Router = require('express').Router;
const v1Router = require('./api/v1.router');
const { RecordNotFoundError, ApiController } = require('../controllers/api.controller');
const Sequelize = require('sequelize');

const router = new Router();

router.use('/v1', v1Router);

router.use((err, req, res, next) => {
  if (err instanceof RecordNotFoundError) {
    return ApiController.recordNotFound(err, req, res);
  }
  if (err instanceof Sequelize.ValidationError) {
    return ApiController.validationError(err, req, res);
  }
  return ApiController.serverError(err, req, res);
});

router.use('/*', ApiController.notFound);

module.exports = router;
