const express = require('express');
const { salesController } = require('../controllers');
const { validataSale } = require('../middlewares/sales.middleware');

const salesRouter = express.Router();

salesRouter.get('/', salesController.getAllSales);
salesRouter.get('/:id', salesController.getSalesByID);
salesRouter.delete('/:id', salesController.deleteSale);

salesRouter.use(validataSale);
salesRouter.post('/', salesController.addNewSale);
salesRouter.put('/:id', salesController.updateSale);

module.exports = salesRouter;
