import { UseCaseInterface } from "../../@shared/usecase/use-case.interface";
import {
  FindInvoiceFacadeInputDTO,
  FindInvoiceFacadeOutputDTO,
  GenerateInvoiceFacadeInputDTO,
  GenerateInvoiceFacadeOutputDTO,
  InvoiceFacadeInterface,
} from "./invoice.facade.interface";

export class InvoiceFacade implements InvoiceFacadeInterface {
  constructor(
    private generateInvoiceUseCase: UseCaseInterface,
    private findInvoiceUseCase: UseCaseInterface
  ) {}

  async generateInvoice(
    input: GenerateInvoiceFacadeInputDTO
  ): Promise<GenerateInvoiceFacadeOutputDTO> {
    return await this.generateInvoiceUseCase.execute(input);
  }
  async findInvoice(
    input: FindInvoiceFacadeInputDTO
  ): Promise<FindInvoiceFacadeOutputDTO> {
    return await this.findInvoiceUseCase.execute(input);
  }
}
