import express from "express";
import { Sequelize } from "sequelize-typescript";
import { clientRouter } from "./routes/client.route";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import { InvoiceModel } from "../../modules/invoice/repository/invoice.model";
import { TransactionModel } from "../../modules/payment/repository/transaction.model";
import { InvoiceItemModel } from "../../modules/invoice/repository/invoice-item.model";
import { AddressModel } from "../../modules/invoice/repository/address.model";

const app = express();
app.use(express.json());
app.use("/clients", clientRouter)

let sequelize: Sequelize;

(async () => {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
    sync: { force: true },
  });
  sequelize.addModels([
    ClientModel,
    ProductModel,
    InvoiceModel,
    TransactionModel,
    InvoiceItemModel,
    AddressModel
  ]);
  await sequelize.sync();
})();

export { app, sequelize };
