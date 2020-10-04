const express = require('express');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const redis = require('redis');
const cors = require('cors');
const path = require('path');
const RedisStore = require('connect-redis')(session);
require('dotenv').config();
require('./db/client');

const Authentication = require('./middleware/authentication.middleware');
const apiRouter = require('./routers/api.router');

const app = express();

app.use(express.static('public'));
app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const redisClientUrl = process.env.REDIS_URL || undefined;
const redisClient = redis.createClient(redisClientUrl);
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

app.use(Authentication.setCurrentUser);

const allowList = ['http://localhost:3001'];
const corsOptions = {
  origin: allowList,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
};
app.use(cors(corsOptions));

app.use('/api', apiRouter);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`the server is listening at http://localhost:${PORT}`);
});
