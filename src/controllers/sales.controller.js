const { salesService } = require('../services');

const addNewSale = async (req, res) => {
  const { status, message, type } = await salesService.addNewSale(req.body);
  if (type) return res.status(status).json({ message });
  return res.status(status).json(message);
};

module.exports = { addNewSale };
