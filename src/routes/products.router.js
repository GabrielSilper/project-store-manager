const express = require('express');
const { productsController } = require('../controllers');
const { validateProductName } = require('../middlewares/products.middleware');

const productRouter = express.Router();

productRouter.get('/', productsController.getAllProducts);
productRouter.get('/:id', productsController.getProductByID);

productRouter.use(validateProductName);
productRouter.post('/', productsController.addNewProduct);

module.exports = productRouter;
