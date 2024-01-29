import { UseCaseInterface } from "../../../@shared/usecase/use-case.interface";
import { InvoiceGateway } from "../../gateway/invoice.gateway";
import {
  FindInvoiceUseCaseInputDTO,
  FindInvoiceUseCaseOutputDTO,
} from "./find-invoice.usecase.dto";

export class FindInvoiceUseCase implements UseCaseInterface {
  constructor(private readonly invoiceRepository: InvoiceGateway) {}

  async execute(
    input: FindInvoiceUseCaseInputDTO
  ): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this.invoiceRepository.find(input.id);
    return {
      id: invoice.id.value,
      name: invoice.name,
      document: invoice.document,
      items: invoice.items.map((item) => ({
        id: item.id.value,
        name: item.name,
        price: item.price,
      })),
      address: {
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
      },
      total: invoice.total,
      createdAt: invoice.createdAt,
    };
  }
}
