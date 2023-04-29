const { salesService } = require('../services');

const addNewSale = async (req, res) => {
  const { status, message, type } = await salesService.addNewSale(req.body);
  if (type) return res.status(status).json({ message });
  return res.status(status).json(message);
};

const getAllSales = async (_req, res) => {
  const { status, message } = await salesService.getAllSales();
  return res.status(status).json(message);
};

const getSalesByID = async (req, res) => {
  const { id } = req.params;
  const { status, message, type } = await salesService.getSalesByID(id);
  if (type) return res.status(status).json({ message });
  return res.status(status).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { status, message, type } = await salesService.deleteSale(id);
  if (type) return res.status(status).json({ message });
  return res.status(status).json(message);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { status, message, type } = await salesService.updateSale(id, req.body);
  if (type) return res.status(status).json({ message });
  return res.status(status).json(message);
};

module.exports = { addNewSale, getAllSales, getSalesByID, deleteSale, updateSale };
