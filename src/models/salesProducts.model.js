const connection = require('./connection');

const addNewSalesProduct = async ({ saleId, productId, quantity }) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?,?,?);',
    [saleId, productId, quantity],
  );
  return true;
};

const getSalesByID = async (id) => {
  const [sales] = await connection.execute(
    `
    SELECT 
      sp.product_id, sp.quantity, sa.date
    FROM
      StoreManager.sales_products sp
        INNER JOIN
      StoreManager.sales sa ON sp.sale_id = sa.id
    WHERE 
      sp.sale_id = (?)  
    ORDER BY sp.sale_id , sp.product_id;
  `,
    [id],
  );
  return sales;
};

const getAllSales = async () => {
  const [sales] = await connection.execute(`
    SELECT 
      sp.sale_id, sp.product_id, sp.quantity, sa.date
    FROM
      StoreManager.sales_products sp
        INNER JOIN
      StoreManager.sales sa ON sp.sale_id = sa.id
    ORDER BY sp.sale_id , sp.product_id;
  `);
  return sales;
};

const deleteSale = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = (?)',
    [id],
  );
  return affectedRows;
};

const updateSale = async ({ saleId, productId, quantity }) => {
  const [{ changedRows }] = await connection.execute(
    `
    UPDATE StoreManager.sales_products
    SET quantity = (?)
    WHERE sale_id = (?) AND product_id = (?);
  `,
    [quantity, saleId, productId],
  );
  return changedRows;
};

module.exports = {
  addNewSalesProduct,
  getSalesByID,
  getAllSales,
  deleteSale,
  updateSale,
};
