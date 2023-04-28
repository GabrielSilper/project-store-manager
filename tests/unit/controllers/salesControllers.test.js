const chai = require("chai");
const Sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { salesService } = require("../../../src/services");
const {
  correctResolves,
  listItemsSold,
  wrongResolves,
  wrongListItemsSold,
} = require("./mock");
const { salesController } = require("../../../src/controllers");
const { expect } = chai;

chai.use(sinonChai);

describe("Teste da camada Controller referente a sales.", () => {
  afterEach(Sinon.restore);
  describe("Teste da função addNewSale", () => {
    it("Se retorna todas as informações referente ao caso de sucesso.", async () => {
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

    it("Se retorna todas as informações referente ao caso de falha.", async () => {
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
});
