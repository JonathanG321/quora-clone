const Sequelize = require('sequelize');
const sequelize = require('../db/connection');

const Tag = sequelize.define('tags', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      async isUnique(name) {
        const tag = await Tag.findOne({ where: { name } });
        if (tag) {
          throw new Error('Tag already exists');
        }
      },
      notEmpty: {
        msg: 'Tag cannot be empty',
      },
    },
  },
});

module.exports = Tag;
