import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Client } from "../../domain/client.entity";
import { AddClientUseCase } from "./add-client.usecase";

const MockRepository = () => ({
  add: jest.fn(),
  find: jest.fn(),
});

describe("Add client usecase test", () => {
  it("should add a client", async () => {
    const repository = MockRepository();
    const usecase = new AddClientUseCase(repository);
    
    const client = {
      name: "John Doe",
      email: "john@doe.com",
      address: "John Doe Street",
    }
    const result = await usecase.execute(client);

    expect(repository.add).toHaveBeenCalled();
    expect(result).toEqual({
      id: expect.any(String),
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
