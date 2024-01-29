import { Address } from "../../../@shared/domain/value-object/address.value-object";
import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { InvoiceItem } from "../../domain/entity/invoice-items.entity";
import { Invoice } from "../../domain/entity/invoice.entity";
import { FindInvoiceUseCase } from "./find-invoice.usecase";

const InvoiceMock = new Invoice({
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
  ],
});

const MockRepository = () => ({
  save: jest.fn(),
  find: jest.fn().mockResolvedValue(InvoiceMock),
});

describe("Find invoice usecase tests", () => {
  it("should find an invoice", async () => {
    const repository = MockRepository();
    const usecase = new FindInvoiceUseCase(repository);

    const input = {
      id: "123",
    };
    const result = await usecase.execute(input);

    expect(repository.find).toBeCalledWith(input.id);
    expect(result).toEqual({
      id: "123",
      name: "John Doe",
      document: "12345678900",
      address: {
        street: "Rua dos bobos",
        number: "0",
        complement: "Casa",
        city: "São Paulo",
        state: "SP",
        zipCode: "12345678",
      },
      items: [
        {
          id: "123",
          name: "Item 1",
          price: 10,
        },
      ],
    });
  });
});
