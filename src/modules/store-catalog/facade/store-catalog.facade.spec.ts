import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import { StoreCatalogFacadeFactory } from "../factory/facade.factory";

describe("Store Catalog Facade tests", () => {
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

  it("should find all products", async () => {
    const product1 = {
      id: "1",
      name: "product name",
      description: "product description",
      salesPrice: 100,
    };
    await ProductModel.create(product1);

    const product2 = {
      id: "2",
      name: "product name",
      description: "product description",
      salesPrice: 100,
    };
    await ProductModel.create(product2);

    const storeCatalogFacade = StoreCatalogFacadeFactory.create();
    const result = await storeCatalogFacade.findAll();

    expect(result.products).toHaveLength(2);
    expect(result.products[0].id).toEqual(product1.id);
    expect(result.products[0].name).toEqual(product1.name);
    expect(result.products[1].id).toEqual(product2.id);
    expect(result.products[1].name).toEqual(product2.name);
  });

  it("should find a product", async () => {
    const product = {
      id: "1",
      name: "product name",
      description: "product description",
      salesPrice: 100,
    };
    await ProductModel.create(product);

    const storeCatalogFacade = StoreCatalogFacadeFactory.create();
    const result = await storeCatalogFacade.find({ id: product.id });

    expect(result.id).toEqual(product.id);
    expect(result.name).toEqual(product.name);
    expect(result.description).toEqual(product.description);
    expect(result.salesPrice).toEqual(product.salesPrice);
  });
});
