const sinon = require("sinon");
const { expect } = require("chai");
const { productsModel } = require("../../../src/models");
const { productsService } = require("../../../src/services");
const {
  allProductsResponse,
  newProductResponse,
  productByIdResponse,
  updatedProductResponse,
  productWrongId,
} = require("./mock");
const Sinon = require("sinon");

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

  describe("Testando a função addNewProduct: ", () => {
    it("Se passado um produto, cadastra e retorna o produto;", async () => {
      sinon.stub(productsModel, "addNewProduct").resolves(5);
      sinon.stub(productsModel, "getProductByID").resolves(newProductResponse);

      const result = await productsService.addNewProduct({
        name: "Óculos do Tony Stark",
      });

      expect(result.type).to.be.null;
      expect(result.status).to.be.equal(201);
      expect(result.message).to.have.keys(["id", "name"]);
      expect(result.message.id).to.be.equal(5);
      expect(result.message.name).to.be.equal("Óculos do Tony Stark");
    });
  });

  describe("Testando a função updateProduct: ", () => {
    it("Se passado um id existente, retorna o produto atualizado e uma mensagem de sucesso;", async () => {
      Sinon.stub(productsModel, "getProductByID")
        .onFirstCall()
        .resolves(productByIdResponse)
        .onSecondCall()
        .resolves(updatedProductResponse);

      Sinon.stub(productsModel, "updateProduct").resolves();

      const { message, status, type } = await productsService.updateProduct(
        productByIdResponse
      );

      expect(type).to.be.null;
      expect(status).to.be.equal(200);
      expect(message).to.deep.equal(updatedProductResponse);
    });

    it("Se passado um id inexistente, retorna uma mensagem de falha;", async () => {
      Sinon.stub(productsModel, "getProductByID").resolves(undefined);

      const { message, status, type } = await productsService.updateProduct(
        productWrongId
      );

      expect(status).to.be.equal(404);
      expect(type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(message).to.be.equal("Product not found");
    });
  });
});
