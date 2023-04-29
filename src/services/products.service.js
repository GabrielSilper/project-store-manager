const { productsModel } = require('../models');

const productNotFound = {
  type: 'PRODUCT_NOT_FOUND',
  status: 404,
  message: 'Product not found',
};

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return products;
};

const getProductByID = async (id) => {
  const product = await productsModel.getProductByID(id);
  if (!product) {
    return productNotFound;
  }
  return { type: null, status: 200, message: product };
};

const addNewProduct = async (product) => {
  const insertId = await productsModel.addNewProduct(product);
  const newProduct = await productsModel.getProductByID(insertId);
  return { type: null, status: 201, message: newProduct };
};

const updateProduct = async ({ id, name }) => {
  const product = await productsModel.getProductByID(id);
  if (!product) {
    return productNotFound;
  }

  await productsModel.updateProduct({ id, name });
  const updatedProduct = await productsModel.getProductByID(id);
  return { type: null, status: 200, message: updatedProduct };
};

module.exports = {
  getAllProducts,
  getProductByID,
  addNewProduct,
  updateProduct,
};
