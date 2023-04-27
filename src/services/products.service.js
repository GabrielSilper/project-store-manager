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

const addNewProduct = async (product) => {
  const insertId = await productsModel.addNewProduct(product);
  const newProduct = await productsModel.getProductByID(insertId);
  return { type: null, status: 201, message: newProduct };
};

module.exports = {
  getAllProducts,
  getProductByID,
  addNewProduct,
};
