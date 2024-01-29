import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "../repository/invoice.model";
import { AddressModel } from "../repository/address.model";
import { InvoiceItemModel } from "../repository/invoice-item.model";
import { InvoiceFacadeFactory } from "../factory/invoice.facade.factory";

describe("Invoice facade tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      models: [InvoiceModel, AddressModel, InvoiceItemModel],
      logging: false,
    });
    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should generate an invoice", async () => {
    const invoiceToCreate = {
      name: "John Doe",
      document: "12345678900",
      street: "Rua dos bobos",
      number: "0",
      complement: "Casa",
      city: "São Paulo",
      state: "SP",
      zipCode: "12345678",
      items: [
        {
          id: "123",
          name: "Item 1",
          price: 10,
        },
      ],
    };
    const facade = InvoiceFacadeFactory.create();
    const result = await facade.generateInvoice(invoiceToCreate);

    expect(result.id).toBeDefined();
    expect(result.name).toEqual(invoiceToCreate.name);
    expect(result.document).toEqual(invoiceToCreate.document);
    expect(result.street).toEqual(invoiceToCreate.street);
    expect(result.items[0].id).toEqual(invoiceToCreate.items[0].id);
    expect(result.items[0].name).toEqual(invoiceToCreate.items[0].name);
    expect(result.items[0].price).toEqual(invoiceToCreate.items[0].price);
  });

  it("should find an invoice", async () => {
    const invoiceToCreate = {
      name: "John Doe",
      document: "12345678900",
      street: "Rua dos bobos",
      number: "0",
      complement: "Casa",
      city: "São Paulo",
      state: "SP",
      zipCode: "12345678",
      items: [
        {
          id: "123",
          name: "Item 1",
          price: 10,
        },
      ],
    };
    const facade = InvoiceFacadeFactory.create();
    const createdInvoice = await facade.generateInvoice(invoiceToCreate);
    const result = await facade.findInvoice({ id: createdInvoice.id });

    expect(result.id).toEqual(createdInvoice.id);
    expect(result.name).toEqual(createdInvoice.name);
    expect(result.document).toEqual(createdInvoice.document);
    expect(result.address.street).toEqual(createdInvoice.street);
    expect(result.address.number).toEqual(createdInvoice.number);
    expect(result.items[0].id).toEqual(createdInvoice.items[0].id);
    expect(result.items[0].name).toEqual(createdInvoice.items[0].name);
    expect(result.items[0].price).toEqual(createdInvoice.items[0].price);
  });
});
