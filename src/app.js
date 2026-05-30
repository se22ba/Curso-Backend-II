const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger.config');
require('dotenv').config();

const adoptionRouter = require('./router/adoption.router');
const petsRouter = require('./router/pets.router');
const usersRouter = require('./router/users.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api/adoptions', adoptionRouter);
app.use('/api/pets', petsRouter);
app.use('/api/users', usersRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/adoptions';

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Swagger UI disponible en http://localhost:${PORT}/api-docs`);
      console.log(`OpenAPI spec disponible en http://localhost:${PORT}/api-docs.json`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = app;
