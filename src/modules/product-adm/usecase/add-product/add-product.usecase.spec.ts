import { AddProductUseCase } from "./add-product.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  }
}

describe("Add Product Use Case unit tests", () => {
  it("Should add a product", async () => {
    //repo
    const productRepository = MockRepository();
    //usecase
    const addProductUseCase = new AddProductUseCase(productRepository);
    //input
    const input = {
      name: "product name",
      description: "product description",
      purchasePrice: 10,
      stock: 10,
    };

    const result = await addProductUseCase.execute(input);

    expect(productRepository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.description).toBe(input.description);
    expect(result.price).toBe(input.purchasePrice);
    expect(result.quantity).toBe(input.stock);
    expect(result.createdAt).toBeDefined();
    expect(result.updatedAt).toBeDefined();
  });
});
