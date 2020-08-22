const Sequelize = require('sequelize');
const sequelize = require('../db/connection');
const bcrypt = require('bcrypt');

const User = sequelize.define(
  'user',
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'First Name cannot be empty',
        },
      },
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Last Name cannot be empty',
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        async isUnique(email) {
          const user = await User.findOne({ where: { email } });
          if (user) {
            throw new Error('Email already exists');
          }
        },
        notEmpty: {
          msg: 'Email cannot be empty',
        },
        isEmail: {
          msg: 'Must input a valid email',
        },
      },
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notNull: true,
      },
    },
    passwordDigest: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    passwordConfirmation: {
      type: Sequelize.VIRTUAL,
      validate: {
        notEmpty: {
          msg: 'Password Confirmation cannot be empty',
        },
      },
    },
    password: {
      type: Sequelize.VIRTUAL,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty',
        },
        len: {
          args: [8, Infinity],
          msg: 'Password must be at least 8 characters long',
        },
        isConfirmed() {
          if (this.password !== this.passwordConfirmation) {
            throw new Error('Password must match Password Confirmation');
          }
        },
      },
    },
  },
  {
    hooks: {
      beforeBulkCreate(instances, options) {
        instances.map((instance) => {
          instance.passwordDigest = bcrypt.hashSync(instance.password, 10);
        });
      },
      beforeValidate(instance, options) {
        instance.passwordDigest = bcrypt.hashSync(instance.password, 10);
      },
    },
    defaultScope: {
      attributes: { exclude: ['passwordDigest'] },
    },
  },
);

module.exports = User;
