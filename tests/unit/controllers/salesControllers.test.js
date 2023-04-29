const chai = require("chai");
const Sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { salesService } = require("../../../src/services");
const {
  correctResolves,
  listItemsSold,
  wrongResolves,
  wrongListItemsSold,
  allSalesServiceResponse,
  salesByIdServiceResponse,
  salesByIdwrongCaseResponse,
  reqIdWrong,
  reqIdCorrect,
} = require("./mock");
const { salesController } = require("../../../src/controllers");
const { it } = require("mocha");
const { expect } = chai;

chai.use(sinonChai);

describe("Teste da camada Controller referente a sales.", () => {
  afterEach(Sinon.restore);
  describe("Teste da função addNewSale: ", () => {
    it("Se retorna todas as informações referente ao caso de sucesso;", async () => {
      Sinon.stub(salesService, "addNewSale").resolves(correctResolves);

      const req = {
        body: listItemsSold,
      };
      const res = {};
      res.json = Sinon.stub().returns(res);
      res.status = Sinon.stub().returns(res);

      await salesController.addNewSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(correctResolves.message);
    });

    it("Se retorna todas as informações referente ao caso de falha;", async () => {
      Sinon.stub(salesService, "addNewSale").resolves(wrongResolves);

      const req = {
        body: wrongListItemsSold,
      };
      const res = {};
      res.json = Sinon.stub().returns(res);
      res.status = Sinon.stub().returns(res);

      await salesController.addNewSale(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: wrongResolves.message,
      });
    });
  });

  describe("Teste da função getAllSales: ", () => {
    it("Se retorna todas as informações com o caso de sucesso;", async () => {
      Sinon.stub(salesService, "getAllSales").resolves(allSalesServiceResponse);

      const req = {};
      const res = {};
      res.json = Sinon.stub().returns(res);
      res.status = Sinon.stub().returns(res);

      await salesController.getAllSales(req, res);

      expect(res.status).to.have.been.calledWith(
        allSalesServiceResponse.status
      );
      expect(res.json).to.have.been.calledWith(allSalesServiceResponse.message);
    });
  });

  describe("Teste da função getSalesByID: ", () => {
    it("Se retorna todas as informações com o caso de sucesso;", async () => {
      Sinon.stub(salesService, "getSalesByID").resolves(
        salesByIdServiceResponse
      );

      const req = reqIdCorrect;
      const res = {};
      res.json = Sinon.stub().returns(res);
      res.status = Sinon.stub().returns(res);

      await salesController.getSalesByID(req, res);

      expect(res.status).to.have.been.calledWith(
        salesByIdServiceResponse.status
      );
      expect(res.json).to.have.been.calledWith(
        salesByIdServiceResponse.message
      );
    });

    it("Se retorna todas as informações com o caso de falha;", async () => {
      Sinon.stub(salesService, "getSalesByID").resolves(
        salesByIdwrongCaseResponse
      );

      const req = reqIdWrong;
      const res = {};
      res.json = Sinon.stub().returns(res);
      res.status = Sinon.stub().returns(res);

      await salesController.getSalesByID(req, res);

      expect(res.status).to.have.been.calledWith(
        salesByIdwrongCaseResponse.status
      );
      expect(res.json).to.have.been.calledWith({
        message: salesByIdwrongCaseResponse.message,
      });
    });
  });

  describe("Teste da função deleteSales: ", () => {
    it("Se retorna todas as informações com o caso de sucesso;", async () => {
      Sinon.stub(salesService, "deleteSale").resolves({
        type: null,
        status: 204,
      });

      const req = reqIdCorrect;
      const res = {};
      res.json = Sinon.stub().returns(res);
      res.status = Sinon.stub().returns(res);

      await salesController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(204);
      expect(res.json).to.have.been.calledWith();
    });

    it("Se retorna todas as informações com o caso de falha;", async () => {
      Sinon.stub(salesService, "deleteSale").resolves(
        salesByIdwrongCaseResponse
      );
      const req = reqIdWrong;
      const res = {};
      res.json = Sinon.stub().returns(res);
      res.status = Sinon.stub().returns(res);
      await salesController.deleteSale(req, res);
      expect(res.status).to.have.been.calledWith(
        salesByIdwrongCaseResponse.status
      );
      expect(res.json).to.have.been.calledWith({
        message: salesByIdwrongCaseResponse.message,
      });
    });
  });
});
