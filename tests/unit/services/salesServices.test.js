const Sinon = require("sinon");
const {
  productsModel,
  salesModel,
  salesProductModel,
} = require("../../../src/models");
const {
  allProductsResponse,
  listItemsSold,
  correctMessage,
  wrongListItemsSold,
  productNotFoundMessage,
} = require("./mock");
const { salesService } = require("../../../src/services");
const { expect } = require("chai");

describe("Teste da camada Service referente a sales.", () => {
  afterEach(Sinon.restore);
  describe("Teste da função addNewSale: ", () => {
    it("Se uma lista com produtos existentes, é feito uma venda com sucesso;", async () => {
      Sinon.stub(productsModel, "getProductByID")
        .onFirstCall()
        .resolves(allProductsResponse[0])
        .onSecondCall()
        .resolves(allProductsResponse[1]);

      Sinon.stub(salesModel, "addNewSale").resolves(3);

      Sinon.stub(salesProductModel, "addNewSalesProduct")
        .onFirstCall()
        .resolves(true)
        .onSecondCall()
        .resolves(true);

      const result = await salesService.addNewSale(listItemsSold);

      expect(result).to.be.an("object");
      expect(result.type).to.be.null;
      expect(result.status).to.be.equal(201);
      expect(result.message).to.deep.equal(correctMessage);
    });
  });

  describe("Teste da função addNewSale: ", () => {
    it("Se uma lista com produtos inexistentes, retorna a mensagem de produto não encontrado;", async () => {
      Sinon.stub(productsModel, "getProductByID").resolves(undefined);

      const result = await salesService.addNewSale(wrongListItemsSold);

      expect(result).to.be.an("object");
      expect(result).to.deep.equal(productNotFoundMessage);
    });
  });
});
