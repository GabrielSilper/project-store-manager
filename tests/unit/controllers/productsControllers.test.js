const chai = require("chai");
const Sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { productsService } = require("../../../src/services");
const {
  allProductsResponse,
  newProductResponse,
  updateProductResponse,
  wrongResolves,
} = require("./mock");
const { productsController } = require("../../../src/controllers");
const { expect } = require("chai");

chai.use(sinonChai);

describe("Teste da camada Controller dos products.", () => {
  afterEach(() => Sinon.restore());
  describe("Testando a função getAllProducts: ", () => {
    it("Se retorna todas as informações de sucesso;", async () => {
      Sinon.stub(productsService, "getAllProducts").resolves(
        allProductsResponse
      );

      const req = {};
      const res = {};
      res.json = Sinon.stub().returns(res);
      res.status = Sinon.stub().returns(res);

      await productsController.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsResponse);
    });
  });

  describe("Testando a função getProductByID: ", () => {
    it("Se passar 1 no id params, retorna respostas de caso de sucesso;", async () => {
      Sinon.stub(productsService, "getProductByID").resolves({
        type: null,
        status: 200,
        message: allProductsResponse[0],
      });

      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};
      res.json = Sinon.stub().returns(res);
      res.status = Sinon.stub().returns(res);

      await productsController.getProductByID(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProductsResponse[0]);
    });

    it("Se passar um id inexistente no params, retorna respostas de caso de falha;", async () => {
      Sinon.stub(productsService, "getProductByID").resolves({
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
      res.json = Sinon.stub().returns(res);
      res.status = Sinon.stub().returns(res);

      await productsController.getProductByID(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Product not found",
      });
    });
  });

  describe("Testando a função addNewProduct: ", () => {
    it("Se passar um produto, insere no banco e retorna respostas de caso de sucesso;", async () => {
      Sinon.stub(productsService, "addNewProduct").resolves({
        type: null,
        status: 201,
        message: newProductResponse,
      });

      req = {
        body: {
          name: "Óculos do Tony Stark",
        },
      };
      res = {};
      res.json = Sinon.stub().returns(res);
      res.status = Sinon.stub().returns(res);

      await productsController.addNewProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProductResponse);
    });
  });

  describe("Testando a função updateProduct: ", () => {
    it("Se passar um id existente, vai retornar um resposta com caso de sucesso.", async () => {
      Sinon.stub(productsService, "updateProduct").resolves(
        updateProductResponse
      );

      const req = {
        params: {
          id: 3
        },
        body: {
          name: "Produto 100% atualizado",
        },
      };
      const res = {};
      res.json = Sinon.stub().returns(res);
      res.status = Sinon.stub().returns(res);

      await productsController.updateProduct(req, res);

      expect(res.json).to.have.been.calledWith(updateProductResponse.message);
      expect(res.status).to.have.been.calledWith(updateProductResponse.status);
    });

    it("Se passar um id inexistente, vai retornar um resposta com caso de falha.", async () => {
      Sinon.stub(productsService, "updateProduct").resolves(
        wrongResolves
      );

      const req = {
        params: {
          id: 456,
        },
        body: {
          name: "Produto 100% desatualizado",
        },
      };
      const res = {};
      res.json = Sinon.stub().returns(res);
      res.status = Sinon.stub().returns(res);

      await productsController.updateProduct(req, res);

      expect(res.json).to.have.been.calledWith({ message: wrongResolves.message});
      expect(res.status).to.have.been.calledWith(wrongResolves.status);
    });
  });
});
