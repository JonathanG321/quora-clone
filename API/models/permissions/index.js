const { allow } = require('../../lib/permissions');
const User = require('../user.model');
const Question = require('../question.model');
const Answer = require('../answer.model');
const Reply = require('../reply.model');
const Topic = require('../topic.model');
const Space = require('../space.model');
const Dislike = require('../dislike.model');
const Vote = require('../vote.model');
const Tag = require('../tag.model');

allow(User, 'manage', Question, (user, question) => question.userId === user.id || user.isAdmin);

allow(User, 'create', Question, (user, question) => !!user.id || user.isAdmin);

allow(User, 'manage', Answer, (user, answer) => answer.userId === user.id || user.isAdmin);

allow(User, 'create', Answer, (user, answer) => !!user.id || user.isAdmin);

allow(User, 'manage', Reply, (user, reply) => reply.userId === user.id || user.isAdmin);

allow(User, 'create', Reply, (user, reply) => !!user.id || user.isAdmin);

allow(User, 'manage', Topic, (user, topic) => user.isAdmin);

allow(User, 'create', Topic, (user, topic) => !!user.id && user.isAdmin);

allow(User, 'manage', Space, (user, space) => user.isAdmin);

allow(User, 'create', Space, (user, space) => !!user.id && user.isAdmin);

allow(User, 'manage', Dislike, (user, dislike) => dislike.userId === user.id);

allow(User, 'create', Dislike, (user, dislike) => !!user.id || user.isAdmin);

allow(User, 'manage', Vote, (user, vote) => vote.userId === user.id);

allow(User, 'create', Vote, (user, vote) => !!user.id || user.isAdmin);

allow(User, 'edit', User, (user, editedUser) => user.id === editedUser.id);

allow(User, 'create', Tag, (user, tag) => !!user.id || user.isAdmin);
