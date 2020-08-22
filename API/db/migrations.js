const sequelize = require('./connection');
require('./client');

sequelize.sync({ alter: true }).then(() => {
  sequelize.close();
});
