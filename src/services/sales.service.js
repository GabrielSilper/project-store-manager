const camelize = require('camelize');
const { salesModel, salesProductModel, productsModel } = require('../models');

// Função auxiliar pra verificar se todos os produtos da lista itemsSold existe.
// Caso não exista algum produto, retorna um objeto referente as respostas de caso de erro.
const allProductsExist = async (itemsSold) => {
  let productNotFound = null;
  await Promise.all(
    itemsSold.map(async ({ productId }) => {
      const product = await productsModel.getProductByID(productId);
      if (!product) {
        productNotFound = {
          type: 'PRODUCT_NOT_FOUND',
          status: 404,
          message: 'Product not found',
        };
      }
    }),
  );
  return productNotFound;
};

// Função auxiliar para inserir todos os produtos da lista itemsSold.
const insertEachItemSold = async (newSaleId, itemsSold) => {
  await Promise.all(
    itemsSold.map(({ productId, quantity }) =>
      salesProductModel.addNewSalesProduct({
        saleId: newSaleId,
        productId,
        quantity,
      })),
  );
};

const addNewSale = async (itemsSold) => {
  const productNotFound = await allProductsExist(itemsSold);
  if (productNotFound) {
    return productNotFound;
  }

  const newSaleId = await salesModel.addNewSale();
  await insertEachItemSold(newSaleId, itemsSold);
  return {
    type: null,
    status: 201,
    message: {
      id: newSaleId,
      itemsSold,
    },
  };
};

const getAllSales = async () => {
  const result = await salesProductModel.getAllSales();
  const sales = camelize(result);
  return { type: null, status: 200, message: sales };
};

const getSalesByID = async (id) => {
  const result = await salesProductModel.getSalesByID(id);
  if (result.length < 1) {
    return { type: 'SALE_NOT_FOUND', status: 404, message: 'Sale not found' };
  }
  const sales = camelize(result);
  return { type: null, status: 200, message: sales };
};

const deleteSale = async (id) => {
  const result = await salesProductModel.getSalesByID(id);
  if (result.length < 1) {
    return { type: 'SALE_NOT_FOUND', status: 404, message: 'Sale not found' };
  }
  await salesProductModel.deleteSale(id);
  return { type: null, status: 204 };
};

module.exports = { addNewSale, getAllSales, getSalesByID, deleteSale };
