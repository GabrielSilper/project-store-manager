const sinon = require("sinon");
const { expect } = require("chai");
const { productsModel } = require("../../../src/models");
const { productsService } = require("../../../src/services");
const {
  allProductsResponse,
} = require("../services/mock/products.service.mock");

describe("Teste da camada Service dos products.", () => {
  afterEach(() => sinon.restore());

  describe("Testando a função getAllProducts: ", () => {
    it("Se todos os produtos são retornados;", async () => {
      sinon.stub(productsModel, "getAllProducts").resolves(allProductsResponse);
      const products = await productsService.getAllProducts();

      expect(products).to.be.an("array");
      expect(products).to.have.length(3);
      expect(products).to.be.equal(allProductsResponse);
    });
  });

  describe("Testando a função getProductByID: ", () => {
    it("Se passado um id existente, retorna o produto;", async () => {
      sinon
        .stub(productsModel, "getProductByID")
        .resolves(allProductsResponse[0]);
      const result = await productsService.getProductByID(1);

      expect(result).to.be.an("object");
      expect(result.status).to.be.equal(200);
      expect(result.type).to.be.null;
      expect(result.message).to.be.equal(allProductsResponse[0]);
    });

    it("Se passado um id inexistente, retorna a mensagem de 'Product not found';", async () => {
      sinon
        .stub(productsModel, "getProductByID")
        .resolves(allProductsResponse[45]);
      const result = await productsService.getProductByID(46);

      expect(result).to.be.an("object");
      expect(result.status).to.be.equal(404);
      expect(result.type).to.be.equal("PRODUCT_NOT_FOUND");
      expect(result.message).to.be.equal("Product not found");
    });
  });
});