const allProductsResponse = [
  { id: 1, name: "Martelo de Thor" },
  { id: 2, name: "Traje de encolhimento" },
  { id: 3, name: "Escudo do Capitão América" },
];

const salesByIdResponse = [
  {
    product_id: 1,
    quantity: 5,
    date: "2023-04-28T20:09:11.000Z",
  },
  {
    product_id: 2,
    quantity: 10,
    date: "2023-04-28T20:09:11.000Z",
  },
];

const allSalesResponse = [
  {
    sale_id: 1,
    product_id: 1,
    quantity: 5,
    date: "2023-04-28T20:09:11.000Z",
  },
  {
    sale_id: 1,
    product_id: 2,
    quantity: 10,
    date: "2023-04-28T20:09:11.000Z",
  },
  {
    sale_id: 2,
    product_id: 3,
    quantity: 15,
    date: "2023-04-28T20:09:11.000Z",
  },
];

module.exports = { allProductsResponse, salesByIdResponse, allSalesResponse };
