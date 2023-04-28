const Sinon = require("sinon");
const connection = require("../../../src/models/connection");
const { salesModel, salesProductModel } = require("../../../src/models");
const { expect } = require("chai");
const { getSalesResponse } = require("./mock");

describe("Teste da camada Model referente a sales.", () => {
  afterEach(Sinon.restore);

  describe("Teste da função addNewSale: ", () => {
    it("Se uma nova venda é adicionada ao banco;", async () => {
      Sinon.stub(connection, "execute").resolves([{ insertId: 3 }]);

      const newSaleId = await salesModel.addNewSale();

      expect(newSaleId).to.be.an("number");
      expect(newSaleId).to.be.equal(3);
    });
  });
});

describe("Teste da camada Model referente a salesProducts.", () => {
  afterEach(Sinon.restore);

  describe("Teste da função addNewSalesProduct: ", () => {
    it("Se uma nova venda de produto é adicionada ao banco;", async () => {
      Sinon.stub(connection, "execute").resolves();

      const wasAdded = await salesProductModel.addNewSalesProduct({
        saleId: 3,
        productId: 2,
        quantity: 10,
      });

      expect(wasAdded).to.be.true;
    });
  });

  describe("Teste da função getSalesProductsByID: ", () => {
    it("Se passado um id de uma venda, retorna todos os produtos relacionados a venda; ", async () => {
      Sinon.stub(connection, "execute").resolves([getSalesResponse]);

      const sales = await salesProductModel.getSalesProductsByID(1);

      expect(sales).to.be.an("array");
      expect(sales).to.have.length(2);
      expect(sales[0]).to.have.keys(["sale_id", "product_id", "quantity"]);
    });
  });
});
