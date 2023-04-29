const allProductsResponse = [
  { id: 1, name: "Martelo de Thor" },
  { id: 2, name: "Traje de encolhimento" },
  { id: 3, name: "Escudo do Capitão América" },
];

const newProductResponse = {
  id: 5,
  name: "Óculos do Tony Stark",
};

const listItemsSold = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const wrongListItemsSold = [
  {
    productId: 34,
    quantity: 1,
  },
  {
    productId: 56,
    quantity: 5,
  },
];

const correctMessage = {
  id: 3,
  itemsSold: listItemsSold,
};

const productNotFoundMessage = {
  type: "PRODUCT_NOT_FOUND",
  status: 404,
  message: "Product not found",
};

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

const allSalesCamelize = [
  {
    saleId: 1,
    productId: 1,
    quantity: 5,
    date: "2023-04-28T20:09:11.000Z",
  },
  {
    saleId: 1,
    productId: 2,
    quantity: 10,
    date: "2023-04-28T20:09:11.000Z",
  },
  {
    saleId: 2,
    productId: 3,
    quantity: 15,
    date: "2023-04-28T20:09:11.000Z",
  },
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

const salesByIdCamelize = [
  { productId: 1, quantity: 5, date: "2023-04-28T20:09:11.000Z" },
  { productId: 2, quantity: 10, date: "2023-04-28T20:09:11.000Z" },
];

const productByIdResponse = { id: 1, name: "Martelo de Thor" };

const updatedProductResponse = { id: 1, name: "Mjolnir" };

const productWrongId = { id: 34, name: "Não existo" };

const listItemsUpdated = [
  {
    productId: 1,
    quantity: 30,
  },
  {
    productId: 2,
    quantity: 50,
  },
];

const wrongListProduct = [
  {
    productId: 345,
    quantity: 30,
  },
  {
    productId: 543,
    quantity: 50,
  },
];

const termResponse = [
  { id: 1, name: "Martelo de Thor" },
  { id: 2, name: "Traje de encolhimento" },
];

module.exports = {
  allProductsResponse,
  newProductResponse,
  listItemsSold,
  correctMessage,
  wrongListItemsSold,
  productNotFoundMessage,
  allSalesResponse,
  allSalesCamelize,
  salesByIdResponse,
  salesByIdCamelize,
  productByIdResponse,
  updatedProductResponse,
  productWrongId,
  listItemsUpdated,
  wrongListProduct,
  termResponse,
};
