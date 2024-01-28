import { UseCaseInterface } from "../../@shared/usecase/use-case.interface";
import {
  PaymentFacadeInputDTO,
  PaymentFacadeInterface,
  PaymentFacadeOutputDTO,
} from "./payment.facade.interface";

export class PaymentFacade implements PaymentFacadeInterface {
  constructor(private readonly processPaymentUseCase: UseCaseInterface) {}

  processPayment(
    input: PaymentFacadeInputDTO
  ): Promise<PaymentFacadeOutputDTO> {
    return this.processPaymentUseCase.execute(input);
  }
}
