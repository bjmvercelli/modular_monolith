import { Address } from "../../@shared/domain/value-object/address.value-object";
import { Id } from "../../@shared/domain/value-object/id.value-object";
import { InvoiceItem } from "../domain/entity/invoice-items.entity";
import { Invoice } from "../domain/entity/invoice.entity";
import { InvoiceGateway } from "../gateway/invoice.gateway";
import { AddressModel } from "./address.model";
import { InvoiceItemModel } from "./invoice-item.model";
import { InvoiceModel } from "./invoice.model";

export class InvoiceRepository implements InvoiceGateway {
  async save(invoice: Invoice): Promise<Invoice> {
    await InvoiceModel.create({
      id: invoice.id.value,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
      },
      items: invoice.items.map((item) => ({
        id: item.id.value,
        name: item.name,
        price: item.price,
      })),
    }, {
      include: [AddressModel, InvoiceItemModel],
    });

    return invoice;
  }
  async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findByPk(id, {
      include: [AddressModel, InvoiceItemModel],
    });

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: new Address({
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
      }),
      items: invoice.items.map((item) => new InvoiceItem({
        id: new Id(item.id),
        name: item.name,
        price: item.price,
      })),
    });
  }

}