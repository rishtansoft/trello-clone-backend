const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 8000;

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
