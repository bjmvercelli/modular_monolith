import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Transaction } from "../../domain/transaction.entity";
import ProcessPaymentUseCase from "./process-payment.usecase";

const validTransaction = new Transaction({
  amount: 100,
  orderId: "1",
  id: new Id("1"),
  status: "approved",
});

const invalidTransaction = new Transaction({
  amount: 50,
  orderId: "1",
  id: new Id("1"),
  status: "declined",
});

const MockRepository = () => ({
  save: jest.fn().mockResolvedValue(validTransaction),
});

const MockRepositoryInvalid = () => ({
  save: jest.fn().mockResolvedValue(invalidTransaction),
});

describe("Process payment usecase test", () => {
  it("Should approve a payment", async () => {
    const repository = MockRepository();
    const usecase = new ProcessPaymentUseCase(repository);

    const input = {
      amount: 100,
      orderId: "1",
    };
    const result = await usecase.execute(input);

    expect(result.transactionId).toEqual(validTransaction.id.value);
    expect(repository.save).toBeCalledTimes(1);
    expect(result.amount).toEqual(input.amount);
    expect(result.orderId).toEqual(input.orderId);
    expect(result.status).toEqual("approved");
    expect(result.createdAt).toEqual(validTransaction.createdAt);
    expect(result.updatedAt).toEqual(validTransaction.updatedAt);
  });

  it("Should decline a payment", async () => {
    const repository = MockRepositoryInvalid();
    const usecase = new ProcessPaymentUseCase(repository);

    const input = {
      amount: 50,
      orderId: "1",
    };
    const result = await usecase.execute(input);

    expect(result.transactionId).toEqual(invalidTransaction.id.value);
    expect(repository.save).toBeCalledTimes(1);
    expect(result.amount).toEqual(input.amount);
    expect(result.orderId).toEqual(input.orderId);
    expect(result.status).toEqual("declined");
    expect(result.createdAt).toEqual(invalidTransaction.createdAt);
    expect(result.updatedAt).toEqual(invalidTransaction.updatedAt);
  });
});
