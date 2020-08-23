const { allow } = require('../../lib/permissions');
const User = require('../user.model');
const Question = require('../question.model');

allow(User, 'manage', Question, (user, question) => question.userId === user.id);
