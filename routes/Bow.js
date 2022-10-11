//insert new bow
const express = require('express');
const { patchSchema, postSchema, querySchema } = require('../schemas/Bow');
const db = require('../database/db.js');

const router = express.Router();

router.post('/bow', async (req, res, next) => {
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
  router.get('/bow/:id', async (req, res, next) => {
    
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
  router.get('/bows', async (req, res, next) => {
    try{
      const data = await db.asyncFind({});
      res.json(data);
    } catch(err) {
      next(err)
    }
    
  });
  
  //update bow by id
  router.patch('/bow/:id', async (req, res, next) => {
  
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
  router.delete('/bow/:id', async (req, res, next) => {
    
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
  
  module.exports = router;