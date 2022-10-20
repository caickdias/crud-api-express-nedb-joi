const Joi = require('joi');

const postSchema = Joi.object({
    user: Joi.string().required(),
    password: Joi.string().required(),
})

module.exports = {
    postSchema,
}