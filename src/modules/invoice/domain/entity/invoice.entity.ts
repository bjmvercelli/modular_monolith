import { AggregateRoot } from "../../../@shared/domain/entity/aggregate-root.interface";
import { BaseEntity } from "../../../@shared/domain/entity/base.entity";
import { Address } from "../../../@shared/domain/value-object/address.value-object";
import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { InvoiceItems } from "./invoice-items.entity";

type InvoiceProps = {
  id?: Id;
  name: string;
  document: string;
  address: Address;
  items: InvoiceItems[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class Invoice extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _document: string;
  private _items: InvoiceItems[];
  private _address: Address;
  
  constructor(props: InvoiceProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._document = props.document;
    this._items = props.items;
    this._address = props.address;
  }

  get name(): string {
    return this._name;
  }

  get document(): string {
    return this._document;
  }

  get items(): InvoiceItems[] {
    return this._items;
  }

  get address(): Address {
    return this._address;
  }

  get total(): number {
    return this._items.reduce((total, item) => total + item.price, 0);
  }
}