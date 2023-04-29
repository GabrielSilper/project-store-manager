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
    productId: 65,
    quantity: 5,
  },
];

const correctResolves = {
  type: null,
  status: 201,
  message: {
    id: 3,
    itemsSold: [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ],
  },
};

const wrongResolves = {
  type: "PRODUCT_NOT_FOUND",
  status: 404,
  message: "Product not found",
};

const allSalesServiceResponse = {
  type: null,
  status: 200,
  message: [
    {
      saleId: 1,
      date: "2021-09-09T04:54:29.000Z",
      productId: 1,
      quantity: 2,
    },
    {
      saleId: 1,
      date: "2021-09-09T04:54:54.000Z",
      productId: 2,
      quantity: 2,
    },
  ],
};

const salesByIdServiceResponse = {
  type: null,
  status: 200,
  message: [
    {
      date: "2021-09-09T04:54:29.000Z",
      productId: 1,
      quantity: 2,
    },
    {
      date: "2021-09-09T04:54:54.000Z",
      productId: 2,
      quantity: 2,
    },
  ],
};

const salesByIdwrongCaseResponse = {
  type: "SALE_NOT_FOUND",
  status: 404,
  message: "Sale not found",
};

const updateProductResponse = {
  type: null,
  status: 200,
  message: {
    id: 3,
    name: "Novo Produto",
  },
};

module.exports = {
  allProductsResponse,
  newProductResponse,
  correctResolves,
  wrongResolves,
  listItemsSold,
  wrongListItemsSold,
  allSalesServiceResponse,
  salesByIdServiceResponse,
  salesByIdwrongCaseResponse,
  updateProductResponse
};
