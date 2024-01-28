import { UseCaseInterface } from "../../../@shared/usecase/use-case.interface";
import { Transaction } from "../../domain/transaction.entity";
import { PaymentGateway } from "../../gateway/payment.gateway";
import {
  ProcessPaymentInputDTO,
  ProcessPaymentOutputDTO,
} from "./process-payment.dto";

export default class ProcessPaymentUseCase implements UseCaseInterface {
  constructor(private readonly transactionRepository: PaymentGateway) {}

  async execute(
    input: ProcessPaymentInputDTO
  ): Promise<ProcessPaymentOutputDTO> {
    const transaction = new Transaction({
      amount: input.amount,
      orderId: input.orderId,
    });
    transaction.process();

    const savedTransaction = await this.transactionRepository.save(transaction);
    return {
      transactionId: savedTransaction.id.value,
      amount: savedTransaction.amount,
      orderId: savedTransaction.orderId,
      status: savedTransaction.status,
      createdAt: savedTransaction.createdAt,
      updatedAt: savedTransaction.updatedAt,
    };
  }
}
