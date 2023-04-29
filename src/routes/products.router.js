const express = require('express');
const { productsController } = require('../controllers');
const { validateProductName } = require('../middlewares/products.middleware');

const productRouter = express.Router();

productRouter.get('/', productsController.getAllProducts);
productRouter.get('/:id', productsController.getProductByID);
productRouter.delete('/:id', productsController.deleteProduct);

productRouter.use(validateProductName);
productRouter.put('/:id', productsController.updateProduct);
productRouter.post('/', productsController.addNewProduct);

module.exports = productRouter;
