const express = require('express');
const { productsController } = require('../controllers');

const productRouter = express.Router();

productRouter.get('/', productsController.getAllProducts);
productRouter.get('/:id', productsController.getProductByID);

module.exports = productRouter;
