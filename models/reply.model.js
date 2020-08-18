const Sequelize = require('sequelize');
const sequelize = require('../db/connection');

const Reply = sequelize.define('replies', {
  body: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Reply body cannot be empty',
      },
    },
  },
});

module.exports = Reply;
