import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";
import { AddressModel } from "./address.model";
import { InvoiceItemModel } from "./invoice-item.model";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { InvoiceRepository } from "./invoice.repository";
import { Invoice } from "../domain/entity/invoice.entity";
import { Address } from "../../@shared/domain/value-object/address.value-object";
import { InvoiceItem } from "../domain/entity/invoice-items.entity";

describe("Invoice repository tests", () => {
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

  it("should create an invoice", async () => {
    const invoiceToCreate = new Invoice({
      id: new Id("123"),
      name: "John Doe",
      document: "12345678900",
      address: new Address({
        street: "Rua dos bobos",
        number: "0",
        complement: "Casa",
        city: "São Paulo",
        state: "SP",
        zipCode: "12345678",
      }),
      items: [
        new InvoiceItem({
          id: new Id("123"),
          name: "Item 1",
          price: 10,
        }),
      ]
    });
    const repository = new InvoiceRepository();
    await repository.save(invoiceToCreate);

    const createdInvoice = await InvoiceModel.findByPk(invoiceToCreate.id.value, {
      include: [AddressModel, InvoiceItemModel],
    });
    
    expect(createdInvoice.id).toEqual(invoiceToCreate.id.value);
    expect(createdInvoice.name).toEqual(invoiceToCreate.name);
    expect(createdInvoice.document).toEqual(invoiceToCreate.document);
    expect(createdInvoice.address.street).toEqual(invoiceToCreate.address.street);
    expect(createdInvoice.items[0].id).toEqual(invoiceToCreate.items[0].id.value);
  });

  it("should find an invoice", async () => {
    const invoiceToCreate = new Invoice({
      id: new Id("123"),
      name: "John Doe",
      document: "12345678900",
      address: new Address({
        street: "Rua dos bobos",
        number: "0",
        complement: "Casa",
        city: "São Paulo",
        state: "SP",
        zipCode: "12345678",
      }),
      items: [
        new InvoiceItem({
          name: "Item 1",
          price: 10,
        }),
      ]
    });
    await InvoiceModel.create({
      id: invoiceToCreate.id.value,
      name: invoiceToCreate.name,
      document: invoiceToCreate.document,
      address: {
        street: invoiceToCreate.address.street,
        number: invoiceToCreate.address.number,
        complement: invoiceToCreate.address.complement,
        city: invoiceToCreate.address.city,
        state: invoiceToCreate.address.state,
        zipCode: invoiceToCreate.address.zipCode,
      },
      items: invoiceToCreate.items.map((item) => ({
        id: item.id.value,
        name: item.name,
        price: item.price,
      })),
    }, {
      include: [AddressModel, InvoiceItemModel],
    });

    const repository = new InvoiceRepository();
    const foundInvoice = await repository.find(invoiceToCreate.id.value);

    expect(foundInvoice.id).toEqual(invoiceToCreate.id);
    expect(foundInvoice.name).toEqual(invoiceToCreate.name);
    expect(foundInvoice.document).toEqual(invoiceToCreate.document);
    expect(foundInvoice.address.street).toEqual(invoiceToCreate.address.street);
    expect(foundInvoice.items[0].id).toEqual(invoiceToCreate.items[0].id);
  });
});