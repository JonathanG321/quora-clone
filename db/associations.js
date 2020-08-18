const sequelize = require('./connection');
const User = require('../models/user.model');
const Question = require('../models/question.model');
const Answer = require('../models/answer.model');
const Reply = require('../models/reply.model');
const Tag = require('../models/tag.model');
const Dislike = require('../models/dislike.model');
const Space = require('../models/space.model');
const Topic = require('../models/topic.model');
const Vote = require('../models/vote.model');

User.hasMany(Question, { foreignKey: { allowNull: false } });
Question.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

User.hasMany(Answer, { foreignKey: { allowNull: false } });
Answer.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

Question.hasMany(Answer, { foreignKey: { allowNull: false } });
Answer.belongsTo(Question, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

Answer.hasMany(Reply, { foreignKey: { allowNull: false } });
Reply.belongsTo(Answer, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

User.hasMany(Reply, { foreignKey: { allowNull: false } });
Reply.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

User.hasMany(Dislike);
Question.hasMany(Dislike);
Dislike.belongsTo(User);
Dislike.belongsTo(Question);

Question.belongsToMany(Tag, {
  through: 'questionTags',
});
Tag.belongsToMany(Question, {
  through: 'questionTags',
});

Space.hasMany(Question, { foreignKey: { allowNull: false } });
Question.belongsTo(Space, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

Topic.hasMany(Space, { foreignKey: { allowNull: false } });
Space.belongsTo(Topic, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

Space.belongsToMany(User, {
  through: 'userSpaces',
});
User.belongsToMany(Space, {
  through: 'userSpaces',
});

Topic.belongsToMany(User, {
  through: 'userTopics',
});
User.belongsToMany(Topic, {
  through: 'userTopics',
});

Answer.hasMany(Vote, { foreignKey: { allowNull: false } });
Vote.belongsTo(Answer, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

User.hasMany(Vote, { foreignKey: { allowNull: false } });
Vote.belongsTo(User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
