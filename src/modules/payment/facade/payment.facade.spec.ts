import { Sequelize } from "sequelize-typescript";
import { TransactionModel } from "../repository/transaction.model";
import { PaymentFacadeFactory } from "../factory/payment.facade.factory";

describe("Payment facade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
      models: [TransactionModel],
    });
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should save a transaction", async () => {
    const facade = PaymentFacadeFactory.create();
    const input = {
      orderId: "1",
      amount: 100,
    }
    const transaction = await facade.processPayment(input);

    expect(transaction.transactionId).toBeDefined();
    expect(transaction.orderId).toBe(input.orderId);
    expect(transaction.amount).toBe(input.amount);
    expect(transaction.status).toBe("approved");
    expect(transaction.createdAt).toBeDefined();
    expect(transaction.updatedAt).toBeDefined();
  });
});