const Sequelize = require('sequelize');
const sequelize = require('../db/connection');

const Answer = sequelize.define('answers', {
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Answer body cannot be empty',
      },
    },
  },
});

module.exports = Answer;
