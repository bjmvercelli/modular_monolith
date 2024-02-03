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
      document: "123456789",
      street: "Street 1",
      number: "123",
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipCode: "12345678",
    }
    const result = await usecase.execute(client);

    expect(repository.add).toHaveBeenCalled();
    expect(result).toEqual({
      id: expect.any(String),
      name: client.name,
      email: client.email,
      document: client.document,
      street: client.street,
      number: client.number,
      complement: client.complement,
      city: client.city,
      state: client.state,
      zipCode: client.zipCode,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
