import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product.model";
import { ProductRepository } from "./product.repository";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Product } from "../domain/entity/product.entity";

describe("Product Repository tests", () => {
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

  it("Should add a product", async () => {
    const newProductData = {
      id: new Id("1"),
      name: "product name",
      description: "product description",
      purchasePrice: 10,
      stock: 10,
    };
    const productToCreate = new Product(newProductData);
    const productRepository = new ProductRepository();
    await productRepository.add(productToCreate);

    const product = await ProductModel.findOne({
      where: { id: 1 },
      raw: true,
    });

    expect(product.id).toEqual(newProductData.id.value);
    expect(product.name).toEqual(newProductData.name);
    expect(product.description).toEqual(newProductData.description);
    expect(product.purchasePrice).toEqual(newProductData.purchasePrice);
    expect(product.stock).toEqual(newProductData.stock);
  });

  it("should find a product", async () => {
    const newProductData = {
      id: new Id("1"),
      name: "product name",
      description: "product description",
      purchasePrice: 10,
      stock: 10,
    };
    const productToCreate = new Product(newProductData);
    const productRepository = new ProductRepository();
    await productRepository.add(productToCreate);

    const product = await productRepository.find("1");

    expect(product.id.value).toEqual(newProductData.id.value);
    expect(product.name).toEqual(newProductData.name);
    expect(product.description).toEqual(newProductData.description);
    expect(product.purchasePrice).toEqual(newProductData.purchasePrice);
    expect(product.stock).toEqual(newProductData.stock);
  });
});
