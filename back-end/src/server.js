const express = require('express');
const employeeRoutes = require('./routes/employee.routes');
const initDB = require('./models/init');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(employeeRoutes);

app.listen(PORT, async () => {
  try {
    await initDB().sync();
    console.log('Database synchronized');
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error(error);
  }
});