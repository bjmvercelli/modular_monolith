import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import { ClientAdmFacadeFactory } from "../factory/client-adm.facade.factory";

describe("Client adm facade test", () => {
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

  it("Should add a client", async () => {
    const facade = ClientAdmFacadeFactory.create();

    const input = {
      id: "1",
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
    await facade.add(input);

    const client = await ClientModel.findOne({
      where: { id: "1" },
    });

    expect(client).toBeDefined();
    expect(client.id).toEqual(input.id);
    expect(client.name).toEqual(input.name);
  });

  it("Should find a client", async () => {
    const facade = ClientAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "John Doe",
      email: "john@doe.com",
      document: "123456789",
      street: "Street 1",
      number: "123",
      complement: "Complement 1",
      city: "City 1",
      state: "State 1",
      zipCode: "12345678",
      updatedAt: new Date(),
      createdAt: new Date(),
    }
    await ClientModel.create(input);

    const client = await facade.find({ id: "1" });

    expect(client).toBeDefined();
    expect(client.id).toEqual(input.id);
    expect(client.name).toEqual(input.name);
    expect(client.email).toEqual(input.email);
    expect(client.street).toEqual(input.street);
    expect(client.createdAt).toEqual(expect.any(Date));
    expect(client.updatedAt).toEqual(expect.any(Date));
  });
});
