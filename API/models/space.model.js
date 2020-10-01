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
  tagline: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Tagline cannot be empty',
      },
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Description cannot be empty',
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
  banner: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Description cannot be empty',
      },
    },
  },
});

module.exports = Space;
