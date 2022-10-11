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

//insert new bow
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

//get bow by id
app.get('/api/bow/:id', (req, res) => {
  const { id } = req.params;

  const query = {
    _id: id
  }

  db.findOne(query, (err, result) => {
    if(err){
      res.status(500).send('Internal error');
    } else {
      res.json(result);
    }
  })
})

//get all bows
app.get('/api/bows', (req, res) => {
  
  db.find({}, (err, result) => {
    if(err){
      res.status(500).send('Internal error');
    } else {
      res.json(result);
    }
  })
});

//update bow by id
app.patch('/api/bow/:id', (req, res) => {

  const { id } = req.params;
  const { type, length, drawWeight, brand, modelName, hand, braceHeight } = req.body;

  const bow = {
    ...(type && {type}),
    ...(length && {length}),
    ...(drawWeight && {drawWeight}),
    ...(brand && {brand}),
    ...(modelName && {modelName}),
    ...(hand && {hand}),
    ...(braceHeight && {braceHeight}),    
  }

  const query = {
    _id: id,
  }

  const update = {
    $set: bow,
  }
  const options = {}

  db.update(query, update, options, (err, numAffected) => {
    if (err) {
      res.status(500).send('Internal server error.');
    } else {            
      res.json(numAffected);
    }
  })
})

app.delete('/api/bow/:id', (req, res) => {
  
  const { id } = req.params;

  const query = {
    _id: id,
  }

  db.remove(query, (err, result) => {
    if (err) {
      res.status(500).send('Internal server error.');
    } else {            
      res.json(result);
    }
  })
})

