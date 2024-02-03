import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import { ClientRepository } from "./client.repository";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Client } from "../domain/client.entity";

describe("Client repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      models: [ClientModel],
      logging: false,
      sync: { force: true },
    });
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const repository = new ClientRepository();
    const client = new Client({
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
    await repository.add(client);

    const result = await ClientModel.findOne({ where: { id: client.id.value } });

    expect(result.id).toEqual(client.id.value);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.street).toEqual(client.street);
    expect(result.createdAt).toEqual(client.createdAt);
    expect(result.updatedAt).toEqual(client.updatedAt);
  });

  it("should find a client", async () => {
    const client = await ClientModel.create({
      id: "123",
      name: "John",
      email: "john@doe.com",
      document: "123456789",
      street: "Street 1",
      number: "123",
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipCode: "12345678",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const repository = new ClientRepository();
    const result = await repository.find(client.id);

    expect(result.id.value).toEqual(client.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.street).toEqual(client.street);
    expect(result.createdAt).toEqual(client.createdAt);
    expect(result.updatedAt).toEqual(client.updatedAt);
  });
});
