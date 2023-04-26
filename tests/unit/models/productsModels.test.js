const sinon = require("sinon");
const { expect } = require("chai");
const { productsModel } = require("../../../src/models");
const { allProductsResponse } = require("./mock/products.model.mock");
const connection = require("../../../src/models/connection");

describe("Teste da camada Model dos products.", () => {
  afterEach(() => sinon.restore());

  describe("Testando a função getAllProducts: ", () => {
    it("Se todos os produtos são retornados;", async () => {
      sinon.stub(connection, "execute").resolves([allProductsResponse]);
      const products = await productsModel.getAllProducts();

      expect(products).to.be.an("array");
      expect(products).to.have.length(3);
      expect(products).to.be.equal(allProductsResponse);
    });
  });

  describe("Testando a função getProductByID: ", () => {
    it("Se o produto de id 1 é retornado corretamente;", async () => {
      sinon.stub(connection, "execute").resolves([[allProductsResponse[0]]]);
      const product = await productsModel.getProductByID(1);

      expect(product).to.be.an("object");
      expect(product.id).to.be.equal(1);
      expect(product).to.have.keys(["id", "name"]);
    });
  });
});
