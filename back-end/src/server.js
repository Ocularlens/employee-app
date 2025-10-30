const express = require('express');
const employeeRoutes = require('./routes/employee.routes');
const { ERROR } = require('./config/defaults.config');
const { database } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(employeeRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json(ERROR);
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