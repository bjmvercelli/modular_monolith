import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Client } from "../../domain/client.entity";
import { FindClientUseCase } from "./find-client.usecase";

const findMock = new Client({
  id: new Id("123"),
  name: "John",
  email: "john@doe.com",
  document: "123456789",
  street: "Street 1",
  number: "123",
  complement: "Complement 1",
  city: "City 1",
  state: "State 1",
  zipCode: "12345678",
});

const MockRepository = () => ({
  add: jest.fn(),
  find: jest.fn().mockResolvedValue(findMock),
});

describe("Find client usecase test", () => {
  it("should find a client", async () => {
    const mockRepository = MockRepository();
    const findClientUseCase = new FindClientUseCase(mockRepository);

    const result = await findClientUseCase.execute({ id: findMock.id.value });

    expect(mockRepository.find).toHaveBeenCalled();
    expect(result.id).toEqual(findMock.id.value);
    expect(result.name).toEqual(findMock.name);
    expect(result.email).toEqual(findMock.email);
    expect(result.street).toEqual(findMock.street);
    expect(result.createdAt).toEqual(expect.any(Date));
    expect(result.updatedAt).toEqual(expect.any(Date));
  });
});
