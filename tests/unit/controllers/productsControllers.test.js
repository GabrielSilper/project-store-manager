const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { productsService } = require("../../../src/services");
const {
  allProductsResponse,
} = require("../controllers/mock/products.controller.mock");
const { productsController } = require("../../../src/controllers");
const { expect } = require("chai");

chai.use(sinonChai);

describe("Teste da camada Controller dos products.", () => {
  afterEach(() => sinon.restore());
  describe("Testando a função getAllProducts: ", () => {
    it("Se retorna todas as informações de sucesso;", async () => {
      sinon
        .stub(productsService, "getAllProducts")
        .resolves(allProductsResponse);

      const req = {};
      const res = {};
      res.json = sinon.stub().returns(res);
      res.status = sinon.stub().returns(res);

      await productsController.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsResponse);
    });
  });

  describe("Testando a função getProductByID: ", () => {
    it("Se passar 1 no id params, retorna respostas de caso de sucesso;", async () => {
      sinon
        .stub(productsService, "getProductByID")
        .resolves({ type: null, status: 200, message: allProductsResponse[0] });

      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};
      res.json = sinon.stub().returns(res);
      res.status = sinon.stub().returns(res);

      await productsController.getProductByID(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsResponse[0]);
    });

    it("Se passar um id inexistente no params, retorna respostas de caso de falha;", async () => {
      sinon.stub(productsService, "getProductByID").resolves({
        type: "PRODUCT_NOT_FOUND",
        status: 404,
        message: "Product not found",
      });

      const req = {
        params: {
          id: 28,
        },
      };
      const res = {};
      res.json = sinon.stub().returns(res);
      res.status = sinon.stub().returns(res);

      await productsController.getProductByID(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });
  });
});
