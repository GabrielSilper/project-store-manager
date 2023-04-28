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

module.exports = { addNewSalesProduct, getSalesByID, getAllSales };
