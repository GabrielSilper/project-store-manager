const sinon = require("sinon");
const { expect } = require("chai");
const { productsModel } = require("../../../src/models");
const { allProductsResponse } = require("./mock/");
const connection = require("../../../src/models/connection");

describe("Teste da camada Model referente a products.", () => {
  afterEach(() => sinon.restore());

  describe("Testando a função getAllProducts: ", () => {
    it("Se todos os produtos são retornados;", async () => {
      sinon.stub(connection, "execute").resolves([allProductsResponse]);
      const products = await productsModel.getAllProducts();

      expect(products).to.be.an("array");
      expect(products).to.have.length(3);
      expect(products).to.be.equal(allProductsResponse);
    });
  });

  describe("Testando a função getProductByID: ", () => {
    it("Se o produto de id 1 é retornado corretamente;", async () => {
      sinon.stub(connection, "execute").resolves([[allProductsResponse[0]]]);
      const product = await productsModel.getProductByID(1);

      expect(product).to.be.an("object");
      expect(product.id).to.be.equal(1);
      expect(product).to.have.keys(["id", "name"]);
    });
  });

  describe("Testando a função addNewProduct: ", () => {
    it("Se um novo produto é adicionado no banco;", async () => {
      sinon.stub(connection, "execute").resolves([{ insertId: 5 }]);
      const newId = await productsModel.addNewProduct({ name: 'Novo produto' });

      expect(newId).to.be.an('number');
      expect(newId).to.be.equal(5);
    });
  });

  describe("Testando a função : ", () => {
    it("Se produto é atualizado no banco;", async () => {
      sinon.stub(connection, "execute").resolves([{ changedRows: 1 }]);
      const changeRows = await productsModel.updateProduct({ name: "Produto Atualizado" });

      expect(changeRows).to.be.an("number");
      expect(changeRows).to.be.equal(1);
    });
  });
});
