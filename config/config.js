require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: '1',
    database: 'trello_clone',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
