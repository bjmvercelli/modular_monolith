import { Address } from "../../../@shared/domain/value-object/address.value-object";
import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { InvoiceItem } from "../../domain/entity/invoice-items.entity";
import { Invoice } from "../../domain/entity/invoice.entity";
import { GenerateInvoiceUseCase } from "./generate-invoice.usecase";

const mockGeneratedInvoice = new Invoice({
  id: new Id("123"),
  name: "John Doe",
  document: "12345678910",
  items: [
    new InvoiceItem({
      id: new Id("1"),
      name: "Item 1",
      price: 100,
    }),
    new InvoiceItem({
      id: new Id("2"),
      name: "Item 2",
      price: 200,
    }),
  ],
  address: new Address({
    street: "Street",
    number: "123",
    complement: "Complement",
    city: "City",
    state: "State",
    zipCode: "12345678",
  }),
});

const MockRepository = () => ({
  save: jest.fn().mockResolvedValue(mockGeneratedInvoice),
  find: jest.fn(),
});

describe("Generate invoice usecase tests", () => {
  it("should generate an invoice", async () => {
    const repository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(repository);

    const input = {
      name: "John Doe",
      document: "12345678910",
      items: [
        {
          name: "Item 1",
          price: 100,
        },
        {
          name: "Item 2",
          price: 200,
        },
      ],
      street: "Street",
      number: "123",
      complement: "Complement",
      city: "City",
      state: "State",
      zipCode: "12345678",
    };
    const result = await usecase.execute(input);

    expect(repository.save).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.document).toEqual(input.document);
    expect(result.items).toHaveLength(2);
    expect(result.items[0].name).toEqual(input.items[0].name);
    expect(result.street).toEqual(input.street);
    expect(result.number).toEqual(input.number);
    expect(result.complement).toEqual(input.complement);
  });
});
