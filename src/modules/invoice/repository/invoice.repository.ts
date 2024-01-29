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
  find(id: string): Promise<Invoice> {
    throw new Error("Method not implemented.");
  }

}