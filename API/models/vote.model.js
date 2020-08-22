const Sequelize = require('sequelize');
const sequelize = require('../db/connection');

const Vote = sequelize.define('votes', {
  isUpVote: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Vote cannot be empty',
      },
    },
  },
});

module.exports = Vote;
