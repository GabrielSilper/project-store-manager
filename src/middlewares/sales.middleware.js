const { productRequired } = require('./schemas/sales.schema');

const validateSaleId = (req, res, next) => {
  let haveError = null;
  req.body.forEach((itemSold) => {
    const { error } = productRequired.validate(itemSold);
    if (error) haveError = error;
  });
  if (haveError) {
    const [{ type, message }] = haveError.details;
    if (type === 'any.required') return res.status(400).json({ message });
    return res.status(422).json({ message });
  }
  next();
};

module.exports = { validateSaleId };
