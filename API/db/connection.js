const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://localhost/quora_clone_dev');

module.exports = sequelize;
