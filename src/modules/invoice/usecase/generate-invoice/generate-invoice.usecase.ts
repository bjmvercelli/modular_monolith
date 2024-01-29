import { Address } from "../../../@shared/domain/value-object/address.value-object";
import { UseCaseInterface } from "../../../@shared/usecase/use-case.interface";
import { InvoiceItem } from "../../domain/entity/invoice-items.entity";
import { Invoice } from "../../domain/entity/invoice.entity";
import { InvoiceGateway } from "../../gateway/invoice.gateway";
import { GenerateInvoiceUseCaseInputDTO, GenerateInvoiceUseCaseOutputDTO } from "./generate-invoice.usecase.dto";

export class GenerateInvoiceUseCase implements UseCaseInterface {
  constructor(
    private readonly invoiceRepository: InvoiceGateway,
  ){}

  async execute(input: GenerateInvoiceUseCaseInputDTO): Promise<GenerateInvoiceUseCaseOutputDTO> {
    const invoice = new Invoice({
      name: input.name,
      document: input.document,
      items: input.items.map(item => new InvoiceItem({
        name: item.name,
        price: item.price,
      })),
      address: new Address({
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode,
      }),
    });
    const savedInvoice = await this.invoiceRepository.save(invoice);

    return {
      id: savedInvoice.id.value,
      name: savedInvoice.name,
      document: savedInvoice.document,
      items: savedInvoice.items.map(item => ({
        id: item.id.value,
        name: item.name,
        price: item.price,
      })),
      street: savedInvoice.address.street,
      number: savedInvoice.address.number,
      complement: savedInvoice.address.complement,
      city: savedInvoice.address.city,
      state: savedInvoice.address.state,
      zipCode: savedInvoice.address.zipCode,
      total: savedInvoice.total 
    };
  }

  
}