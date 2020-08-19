const express = require('express');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
require('dotenv').config();
require('./db/client');

const apiRouter = require('./routers/api.router');

const redisClient = redis.createClient();

const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

redisClient.on('error', console.error);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ client: redisClient }),
  }),
);

app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  }),
);

app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`the server is listening at http://localhost:${PORT}`);
});
