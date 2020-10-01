const Sequelize = require('sequelize');
const sequelize = require('../db/connection');

const Topic = sequelize.define('topics', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Name cannot be empty',
      },
    },
  },
  image: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Description cannot be empty',
      },
    },
  },
});

module.exports = Topic;
