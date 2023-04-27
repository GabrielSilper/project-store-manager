const express = require('express');
const { salesController } = require('../controllers');
const { validateSaleId } = require('../middlewares/sales.middleware');

const salesRouter = express.Router();

salesRouter.use(validateSaleId);
salesRouter.post('/', salesController.addNewSale);

module.exports = salesRouter;