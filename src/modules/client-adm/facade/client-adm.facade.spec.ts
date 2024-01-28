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
      address: "John Doe Street",
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
      address: "John Doe Street",
      updatedAt: new Date(),
      createdAt: new Date(),
    }
    await ClientModel.create(input);

    const client = await facade.find({ id: "1" });

    expect(client).toBeDefined();
    expect(client.id).toEqual(input.id);
    expect(client.name).toEqual(input.name);
    expect(client.email).toEqual(input.email);
    expect(client.address).toEqual(input.address);
    expect(client.createdAt).toEqual(expect.any(Date));
    expect(client.updatedAt).toEqual(expect.any(Date));
  });
});
