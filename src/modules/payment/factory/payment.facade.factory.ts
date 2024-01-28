import { PaymentFacade } from "../facade/payment.facade";
import { TransactionRepository } from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";

export class PaymentFacadeFactory {
  static create() {
    const repository = new TransactionRepository();
    const processPaymentUseCase = new ProcessPaymentUseCase(repository);
    return new PaymentFacade(processPaymentUseCase);
  }
}
