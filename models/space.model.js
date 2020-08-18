const Sequelize = require('sequelize');
const sequelize = require('../db/connection');

const Space = sequelize.define('spaces', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Name cannot be empty',
      },
    },
  },
});

module.exports = Space;
