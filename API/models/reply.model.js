const Sequelize = require('sequelize');
const sequelize = require('../db/connection');

const Reply = sequelize.define('replies', {
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Reply body cannot be empty',
      },
    },
  },
});

module.exports = Reply;
