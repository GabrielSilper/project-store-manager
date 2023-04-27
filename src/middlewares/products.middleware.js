const { nameSchema } = require('./schemas/products.schema');

const validateProductName = (req, res, next) => {
  const { error } = nameSchema.validate(req.body);
  if (error) {
    const [{ type, message }] = error.details;
    if (type === 'any.required') return res.status(400).json({ message });
    if (type === 'string.min') return res.status(422).json({ message });
  }
  return next();
};

module.exports = { validateProductName };
