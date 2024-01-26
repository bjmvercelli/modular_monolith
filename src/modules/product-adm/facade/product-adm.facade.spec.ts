import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import { ProductFacadeFactory } from "../factory/facade.factory";

describe("Product Adm Facade tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should add a product", async () => {
    const productAdmFacade = ProductFacadeFactory.create();

    const productToAdd = {
      id: "1",
      name: "product name",
      description: "product description",
      purchasePrice: 100,
      stock: 10,
    }
    await productAdmFacade.addProduct(productToAdd);

    const productAdded = await ProductModel.findOne({
      where: { id: productToAdd.id },
    });

    expect(productAdded.id).toEqual(productToAdd.id);
    expect(productAdded.name).toEqual(productToAdd.name);
    expect(productAdded.description).toEqual(productToAdd.description);
    expect(productAdded.purchasePrice).toEqual(productToAdd.purchasePrice);
    expect(productAdded.stock).toEqual(productToAdd.stock);
  });

  it("should check stock of a product", async () => {
    const productAdmFacade = ProductFacadeFactory.create();

    const productToAdd = {
      id: "1",
      name: "product name",
      description: "product description",
      purchasePrice: 100,
      stock: 10,
    }
    await productAdmFacade.addProduct(productToAdd);

    const stock = await productAdmFacade.checkStock({ productId: "1" });

    expect(stock.productId).toEqual(productToAdd.id);
    expect(stock.stock).toEqual(productToAdd.stock);
  });
});