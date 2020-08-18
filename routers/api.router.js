const Router = require('express').Router;
const v1Router = require('./api/v1.router');

const router = new Router();

router.use('/v1', v1Router);

module.exports = router;
