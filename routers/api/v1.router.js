const Router = require('express').Router;
const questionsRouter = require('./v1/questions.router');
const spacesRouter = require('./v1/spaces.router');
const topicsRouter = require('./v1/topics.router');
const tagsRouter = require('./v1/tags.router');
const sessionRouter = require('./v1/session.router');
const usersRouter = require('./v1/users.router');

const router = new Router();

router.use('/questions', questionsRouter);

router.use('/spaces', spacesRouter);

router.use('/topics', topicsRouter);

router.use('/tags', tagsRouter);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

module.exports = router;
