const Sequelize = require('sequelize');
const sequelize = require('../db/connection');

const Question = sequelize.define('questions', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Question title cannot be empty',
      },
    },
  },
  body: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Question body cannot be empty',
      },
    },
  },
});

module.exports = Question;
