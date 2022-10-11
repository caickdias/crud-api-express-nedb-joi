const express = require("express");
const nedb = require('nedb-async').AsyncNedb;
const { patchSchema, postSchema, querySchema } = require('./schemas/Bow');
const morgan = require('morgan');

const PORT = process.env.PORT || 8000;
const DB_PATH = process.env.DB_PATH || 'data.db';

const db = new nedb({ filename: DB_PATH, autoload: true});
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

app.listen(PORT, () => {
  console.log(`[ index.js ] Listening on port ${PORT}`);
});

//insert new bow
app.post('/api/bow', async (req, res, next) => {
  try {
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

    await postSchema.validateAsync(bow);
    const data = await db.asyncInsert(bow)
    res.json(data);
  } catch(err){
    next(err);
  }
})

//get bow by id
app.get('/api/bow/:id', async (req, res, next) => {
  
  const { id } = req.params;
  const query = {
    _id: id
  }

  try {
    await querySchema.validateAsync(query);
    const data = await db.asyncFindOne(query);      
    res.json(data);
  } catch(err){
    next(err)
  }
  
})

//get all bows
app.get('/api/bows', async (req, res, next) => {
  try{
    const data = await db.asyncFind({});
    res.json(data);
  } catch(err) {
    next(err)
  }
  
});

//update bow by id
app.patch('/api/bow/:id', async (req, res, next) => {

  const { id } = req.params;
  const query = {
    _id: id,
  }

  try{
    const bow = req.body;
    
    const update = {
      $set: bow,
    }
    const options = {}
  
    await querySchema.validateAsync(query);
    await patchSchema.validateAsync(bow);
    const numAffected = await db.asyncUpdate(query, update, options);
    res.json({ affected: numAffected});

  } catch(err) {
    next(err);
  }
 
})

//delete bow by id
app.delete('/api/bow/:id', async (req, res, next) => {
  
  const { id } = req.params;
  const query = {
    _id: id,
  }
  const options = {};

  try {
    await querySchema.validateAsync(query);
    const numAffected = await db.asyncRemove(query, options)
    res.json({ affected: numAffected });
  } catch(err) {
    next(err)
  }  
})

