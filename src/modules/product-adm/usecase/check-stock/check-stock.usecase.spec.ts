import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Product } from "../../domain/entity/product.entity";
import { CheckStockUseCase } from "./check-stock.usecase";

const productMock = new Product({
  id: new Id("1"),
  name: "product name",
  description: "product description",
  purchasePrice: 100,
  stock: 10,
})

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockResolvedValue(productMock),
  }
}

describe("Check Stock Use Case unit tests", () => {
  it("Should get stock of a product", async () => {
    const repository = MockRepository();
    const useCase = new CheckStockUseCase(repository);

    const input = {
      productId: "1",
    }

    const output = await useCase.execute(input);

    expect(output.productId).toEqual(input.productId);
    expect(output.stock).toEqual(productMock.stock);
    expect(repository.find).toHaveBeenCalled();
  });
});