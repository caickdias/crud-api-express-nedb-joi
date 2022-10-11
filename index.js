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

app.post('/api/bow', (req, res) => {
  const { type, length, drawWeight, brand, modelName, hand, braceHeight } = req.body;

  const bow = {
    type, 
    length,
    drawWeight,
    brand,
    modelName,
    hand,
    braceHeight
  }

  db.insert(bow, (err, result) => {
    if(err){
      res.status(500).send('Internal error');
    } else {
      res.json(result);
    }
  })
})


app.get('/api/bows', async (req, res, next) => {
  
  db.find({}, (err, result) => {
    if(err){
      res.status(500).send('Internal error');
    } else {
      res.json(result);
    }
  })
});

