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
  allSalesResponse,
  allSalesCamelize,
  salesByIdResponse,
  salesByIdCamelize,
  listItemsUpdated,
  wrongListProduct,
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

  describe("Teste da função getAllSales: ", () => {
    it("Se retorna a mensagem com todos as vendas e caso de sucesso;", async () => {
      Sinon.stub(salesProductModel, "getAllSales").resolves(allSalesResponse);

      const { type, status, message } = await salesService.getAllSales();
      expect(type).to.be.null;
      expect(status).to.be.equal(200);
      expect(message).to.deep.equal(allSalesCamelize);
    });
  });

  describe("Teste da função getSalesByID: ", () => {
    it("Se passado um venda existente, retorna a mensagem com caso de sucesso;", async () => {
      Sinon.stub(salesProductModel, "getSalesByID").resolves(salesByIdResponse);

      const { type, status, message } = await salesService.getSalesByID(1);
      expect(type).to.be.null;
      expect(status).to.be.equal(200);
      expect(message).to.deep.equal(salesByIdCamelize);
    });

    it("Se passado um venda inexistente, retorna a mensagem com caso de falha;", async () => {
      Sinon.stub(salesProductModel, "getSalesByID").resolves([]);

      const { type, status, message } = await salesService.getSalesByID(10);
      expect(type).to.be.equal("SALE_NOT_FOUND");
      expect(status).to.be.equal(404);
      expect(message).to.deep.equal("Sale not found");
    });
  });

  describe("Teste da função deleteSale: ", () => {
    it("Se passado um venda existente, retorna a mensagem com caso de sucesso;", async () => {
      Sinon.stub(salesProductModel, "getSalesByID").resolves(salesByIdResponse);
      Sinon.stub(salesProductModel, "deleteSale").resolves(1);

      const { type, status } = await salesService.deleteSale(1);
      expect(type).to.be.null;
      expect(status).to.be.equal(204);
    });

    it("Se passado um venda inexistente, retorna a mensagem com caso de falha;", async () => {
      Sinon.stub(salesProductModel, "getSalesByID").resolves([]);

      const { type, status, message } = await salesService.deleteSale(10);
      expect(type).to.be.equal("SALE_NOT_FOUND");
      expect(status).to.be.equal(404);
      expect(message).to.deep.equal("Sale not found");
    });
  });

  describe("Teste da função updateSale: ", () => {
    it("Se passado uma venda e produto existentes, retorna a mensagem com caso de sucesso;", async () => {
      Sinon.stub(salesProductModel, "getSalesByID").resolves(salesByIdResponse);

      Sinon.stub(productsModel, "getProductByID")
        .onFirstCall()
        .resolves(allProductsResponse[0])
        .onSecondCall()
        .resolves(allProductsResponse[1]);

      Sinon.stub(productsModel, "updateProduct")
        .onFirstCall()
        .resolves(1)
        .onSecondCall()
        .resolves(1);

      const { status, message, type } = await salesService.updateSale(
        1,
        listItemsUpdated
      );

      expect(type).to.be.null;
      expect(status).to.be.equal(200);
      expect(message).to.deep.equal({
        saleId: 1,
        itemsUpdated: listItemsUpdated,
      });
    });

    it("Se passado uma lista com um produto inexistente, retorna a mensagem com caso de falha;", async () => {
      Sinon.stub(salesProductModel, "getSalesByID").resolves(salesByIdResponse);

      Sinon.stub(productsModel, "getProductByID").resolves(undefined);

      const { status, message, type } = await salesService.updateSale(
        1,
        wrongListProduct
      );

      expect(type).to.be.equal("PRODUCT_NOT_FOUND");
      expect(status).to.be.equal(404);
      expect(message).to.deep.equal("Product not found");
    });

    it("Se passado uma venda inexistente, retorna a mensagem com caso de falha;", async () => {
      Sinon.stub(salesProductModel, "getSalesByID").resolves([]);

      const { status, message, type } = await salesService.updateSale(
        345,
        wrongListProduct
      );

      expect(type).to.be.equal("SALE_NOT_FOUND");
      expect(status).to.be.equal(404);
      expect(message).to.deep.equal("Sale not found");
    });
  });
});
