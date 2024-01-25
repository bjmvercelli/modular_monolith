import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import { ProductFacadeFactory } from "../factory/facade.factory";

describe("Product Adm Facade tests", () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      models: [ProductModel],
      logging: false,
      sync: { force: true },
    });
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
    productAdmFacade.addProduct(productToAdd);

    const productAdded = await ProductModel.findOne({
      where: { id: productToAdd.id },
      raw: true,
    });

    expect(productAdded.id).toEqual(productToAdd.id);
    expect(productAdded.name).toEqual(productToAdd.name);
    expect(productAdded.description).toEqual(productToAdd.description);
    expect(productAdded.purchasePrice).toEqual(productToAdd.purchasePrice);
    expect(productAdded.stock).toEqual(productToAdd.stock);
  });

});