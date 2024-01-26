import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import { ProductRepository } from "./product.repository";

describe("Product Repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      models: [ProductModel],
      sync: { force: true },
    });

    await sequelize.sync({ force: true });
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

    const repository = new ProductRepository();
    const products = await repository.findAll();

    expect(products).toHaveLength(2);
    expect(products[0].id.value).toEqual(product1.id);
    expect(products[0].name).toEqual(product1.name);
    expect(products[0].description).toEqual(product1.description);
    expect(products[0].salesPrice).toEqual(product1.salesPrice);
    expect(products[1].id.value).toEqual(product2.id);
    expect(products[1].name).toEqual(product2.name);
    expect(products[1].description).toEqual(product2.description);
    expect(products[1].salesPrice).toEqual(product2.salesPrice);

  });

  it("should find a product", async () => {
    const product = {
      id: "1",
      name: "product name",
      description: "product description",
      salesPrice: 100,
    };
    await ProductModel.create(product);

    const repository = new ProductRepository();
    const productFound = await repository.find(product.id);

    expect(productFound.id.value).toEqual(product.id);
    expect(productFound.name).toEqual(product.name);
    expect(productFound.description).toEqual(product.description);
    expect(productFound.salesPrice).toEqual(product.salesPrice);
  });
});