require('dotenv').config();

module.exports = {
  development: {
    username: 'your_db_username',
    password: 'your_db_password',
    database: 'trello_clone',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
