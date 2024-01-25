import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { FindProductUseCase } from "./find-product.usecase";

const productMock = {
  id: new Id("1"),
  name: "Product 1",
  description: "Product 1 description",
  salesPrice: 100
}

const MockRepository = () => ({
  findAll: jest.fn(),
  find: jest.fn().mockResolvedValue(productMock),
})

describe("Find Product UseCase tests", () => {
  it("should find a product", async () => {
    const repository = MockRepository();
    const findProductUseCase = new FindProductUseCase(repository);
    const product = await findProductUseCase.execute({ id: "1" });

    expect(repository.find).toHaveBeenCalled();
    expect(product.id).toEqual(productMock.id.value);
    expect(product.name).toEqual(productMock.name);
    expect(product.description).toEqual(productMock.description);
    expect(product.salesPrice).toEqual(productMock.salesPrice);
  });
});