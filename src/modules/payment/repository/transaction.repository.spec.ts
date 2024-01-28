import { Sequelize } from "sequelize-typescript";
import { TransactionModel } from "./transaction.model";
import { TransactionRepository } from "./transaction.repository";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { Transaction } from "../domain/transaction.entity";

describe("Transaction repository test", () => {
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
    const repository = new TransactionRepository();
    const transaction = new Transaction({
      id: new Id("1"),
      orderId: "1",
      amount: 100,
    })
    const result = await repository.save(transaction);

    expect(result.id.value).toEqual(transaction.id.value);
    expect(result.orderId).toEqual(transaction.orderId);
    expect(result.amount).toEqual(transaction.amount);
    expect(result.status).toEqual(transaction.status);
    expect(result.createdAt).toEqual(transaction.createdAt);
    expect(result.updatedAt).toEqual(transaction.updatedAt);    
  });
});
