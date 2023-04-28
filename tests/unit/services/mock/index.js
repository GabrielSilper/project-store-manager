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

module.exports = {
  allProductsResponse,
  newProductResponse,
  listItemsSold,
  correctMessage,
  wrongListItemsSold,
  productNotFoundMessage
};
