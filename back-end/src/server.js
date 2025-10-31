const express = require('express');
const router = require('./routes');
const { ERROR } = require('./config/defaults.config');
const { database } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json(ERROR);
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(PORT, async () => {
  try {
    await database.sync({ alter: true });
    console.log('Database synchronized');
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error(error);
  }
});