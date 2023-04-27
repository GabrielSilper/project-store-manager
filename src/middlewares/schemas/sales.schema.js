const Joi = require('joi');

const productRequired = Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().required().min(1),
});

module.exports = { productRequired };
