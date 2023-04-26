const { productsModel } = require('../models');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return products;
};

const getProductByID = async (id) => {
  const product = await productsModel.getProductByID(id);
  if (!product) {
    return {
      type: 'PRODUCT_NOT_FOUND',
      status: 404,
      message: 'Product not found',
    };
  }
  return { type: null, status: 200, message: product };
};

module.exports = {
  getAllProducts,
  getProductByID,
};
