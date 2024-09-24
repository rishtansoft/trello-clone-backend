const { Sequelize } = require('sequelize');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const models = {
  User: require('./user')(sequelize),
  Board: require('./board')(sequelize),
  Task: require('./task')(sequelize),
  Comment: require('./comment')(sequelize),
};

// Associations o'rnatish
Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
