const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRotes');
const boardRoutes = require('./routes/boardRoute');
const taskRoutes = require('./routes/taskRoute');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/tasks', taskRoutes);


// swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.options('*', cors()); // Allow preflight requests for all routes

// Swagger options
const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API Information',
      },
      servers: [
        {
          url: process.env.BASE_URL,
        },
      ],
    },
    apis: ['./swagger/auth.js', './swagger/board.js', './swagger/tasks.js', './swagger.comments.js'],
  };

  // Swagger docs va UI ni o'rnatish
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;
