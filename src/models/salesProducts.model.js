const connection = require('./connection');

const addNewSalesProduct = async ({ saleId, productId, quantity }) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?,?,?);',
    [saleId, productId, quantity],
  );
  return true;
};

const getSalesProductsByID = async (id) => {
  const [sales] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE sale_id = (?);',
    [id],
  );
  return sales;
};

module.exports = { addNewSalesProduct, getSalesProductsByID };
