const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products ORDER BY id;',
  );
  return products;
};

const getProductByID = async (id) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = (?);',
    [id],
  );
  return product;
};

const addNewProduct = async ({ name }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products ( `name` ) VALUES (?);',
    [name],
  );
  return insertId;
};

module.exports = { getAllProducts, getProductByID, addNewProduct };
