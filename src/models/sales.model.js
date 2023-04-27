const connection = require('./connection');

const addNewSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales VALUES();',
  );
  return insertId;
};

module.exports = { addNewSale };