const { productsService } = require('../services');

const getAllProducts = async (_req, res) => {
  const products = await productsService.getAllProducts();
  return res.status(200).json(products);
};

const getProductByID = async (req, res) => {
  const { id } = req.params;
  const { status, message, type } = await productsService.getProductByID(id);
  if (type) return res.status(status).json({ message });
  return res.status(status).json(message);
};

const addNewProduct = async (req, res) => {
  const { status, message } = await productsService.addNewProduct(req.body);
  return res.status(status).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { status, type, message } = await productsService.updateProduct({ id, name });
  if (type) return res.status(status).json({ message });
  return res.status(status).json(message);
};

module.exports = { getAllProducts, getProductByID, addNewProduct, updateProduct };
