const { productsService } = require('../services');

const getAllProducts = async (req, res) => {
  const products = await productsService.getAllProducts();
  return res.status(200).json(products);
};

const getProductByID = async (req, res) => {
  const { id } = req.params;
  const { status, message, type } = await productsService.getProductByID(id);
  if (type) return res.status(status).json({ message });
  return res.status(status).json(message);
};

module.exports = { getAllProducts, getProductByID };
