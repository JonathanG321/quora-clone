const { allow } = require('../../lib/permissions');
const User = require('../user.model');
const Question = require('../question.model');
const Answer = require('../answer.model');
const Reply = require('../reply.model');
const Topic = require('../topic.model');
const Space = require('../space.model');

allow(User, 'manage', Question, (user, question) => question.userId === user.id || user.isAdmin);

allow(User, 'manage', Answer, (user, answer) => answer.userId === user.id || user.isAdmin);

allow(User, 'manage', Reply, (user, reply) => reply.userId === user.id || user.isAdmin);

allow(User, 'manage', Topic, (user, topic) => user.isAdmin);

allow(User, 'manage', Space, (user, space) => user.isAdmin);
