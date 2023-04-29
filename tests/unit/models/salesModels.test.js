const Sinon = require("sinon");
const connection = require("../../../src/models/connection");
const { salesModel, salesProductModel } = require("../../../src/models");
const { expect } = require("chai");
const { salesByIdResponse, allSalesResponse, saleToUpdate } = require("./mock");

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

  describe("Teste da função getSalesByID: ", () => {
    it("Se passado um id, retorna as vendas relacionadas; ", async () => {
      Sinon.stub(connection, "execute").resolves([salesByIdResponse]);

      const sales = await salesProductModel.getSalesByID(1);

      expect(sales).to.be.an("array");
      expect(sales).to.have.length(2);
      expect(sales[0]).to.have.keys(["date", "product_id", "quantity"]);
    });
  });

  describe("Teste da função getAllSales: ", () => {
    it("Se retorna todos as vendas; ", async () => {
      Sinon.stub(connection, "execute").resolves([allSalesResponse]);

      const sales = await salesProductModel.getAllSales();

      expect(sales).to.be.an("array");
      expect(sales).to.have.length(3);
      expect(sales[0]).to.have.keys([
        "sale_id",
        "date",
        "product_id",
        "quantity",
      ]);
    });
  });

  describe("Teste da função deleteSale: ", () => {
    it("Se as vendas são deletadas do banco; ", async () => {
      Sinon.stub(connection, "execute").resolves([{ affectedRows: 1}]);

      const affectedRows = await salesProductModel.deleteSale(1);

      expect(affectedRows).to.be.an("number");
      expect(affectedRows).to.be.equal(1);
    });
  });

  describe("Teste da função updateSale: ", () => {
    it("Se passado saleId, productId e quantity, atualiza as vendas relacionadas; ", async () => {
      Sinon.stub(connection, "execute").resolves([{ changedRows: 1 }]);

      const changedRows = await salesProductModel.updateSale(saleToUpdate);

      expect(changedRows).to.be.an("number");
      expect(changedRows).to.be.equal(1);
    });
  });
});
