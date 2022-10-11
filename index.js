const express = require("express");
const nedb = require('nedb');

const PORT = process.env.PORT || 8000;
const DB_PATH = process.env.DB_PATH || 'data.db';

const db = new nedb({ filename: DB_PATH, autoload: true});
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`[ index.js ] Listening on port ${PORT}`);
});

// Create
app.get('/bows', async (req, res, next) => {
  
  const fakeData = [{
    id: 123,
    type: 'recurve',
    length: 66,
    drawWeight: 40,
    brand: 'samick',
    modelName: 'polaris',
    hand: 'right',
    braceHeight: 7,    
  }]
  
  res.status(200).send(fakeData);
});

