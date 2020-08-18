const Router = require('express').Router;
const questionsRouter = require('./v1/questions.router');
const sessionRouter = require('./v1/session.router');
const usersRouter = require('./v1/users.router');

const router = new Router();

router.use('/questions', questionsRouter);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

module.exports = router;
