import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Product } from "../../domain/product.entity";
import { FindAllProductsUseCase } from "./find-all-products.usecase";

const product1 = new Product({
  id: new Id("1"),
  name: "product name",
  description: "product description",
  salesPrice: 100,
});

const product2 = new Product({
  id: new Id("2"),
  name: "product name",
  description: "product description",
  salesPrice: 100,
});

const MockRepository = () => {
  return {
    findAll: jest.fn().mockResolvedValue([product1, product2]),
    find: jest.fn()
  }
}

describe("Find All Products Usecase tests", () => {

  it("should find all products", async () => {
    const repository = MockRepository();
    const findAllProductsUseCase = new FindAllProductsUseCase(repository);
    const products = await findAllProductsUseCase.execute();

    expect(repository.findAll).toHaveBeenCalled();
    expect(products).toEqual({
      products: [
        {
          id: product1.id.value,
          name: product1.name,
          description: product1.description,
          salesPrice: product1.salesPrice,
        },
        {
          id: product2.id.value,
          name: product2.name,
          description: product2.description,
          salesPrice: product2.salesPrice,
        },
      ]
    });
  });
});