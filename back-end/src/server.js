const express = require('express');
const router = require('./routes');
const { ERROR } = require('./config/defaults.config');
const { database } = require('./models');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const corsOptions = {
  origin: 'http://localhost:9090',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(router);

app.get('/images/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'tmp', filename);

  const dir = fs.readdirSync(path.join(__dirname, 'tmp')); // Ensure directory exists

  console.log(dir);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(500).send('File not found');
    } else {
      res.writeHead(200, { 'Content-Type': 'image/png' }); // Adjust MIME type as needed
      res.end(data, 'binary');
    }
  });
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json(ERROR);
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.listen(PORT, async () => {
  try {
    if (!fs.existsSync(path.join(__dirname, 'tmp'))) {
      fs.mkdirSync(path.join(__dirname, 'tmp'));
      console.log('Temporary directory created');
    }

    await database.sync({ alter: true });
    console.log('Database synchronized');
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error(error);
  }
});