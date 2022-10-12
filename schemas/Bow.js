const Joi = require('joi');

const postSchema = Joi.object({
    type: Joi.string().required(),
    length: Joi.number(),
    drawWeight: Joi.number(),
    brand: Joi.string(),
    modelName: Joi.string(),
    hand: Joi.string()
      .valid("right", "left", "two-handed")
      .required(),
    braceHeight: Joi.number(),
  })
  
const patchSchema = Joi.object({
  type: Joi.string(),
  length: Joi.number(),
  drawWeight: Joi.number(),
  brand: Joi.string(),
  modelName: Joi.string(),
  hand: Joi.string()
    .valid("right", "left", "two-handed"),    
  braceHeight: Joi.number(),
})

const querySchema = Joi.object({
  _id: Joi.string().required(),
})

module.exports = {
  postSchema,
  patchSchema,
  querySchema
  }