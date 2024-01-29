import { AutoIncrement, BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";

//https://stackoverflow.com/questions/949320/ddd-value-objects-and-orm
@Table({
  tableName: "addresses",
  timestamps: false,
})
export class AddressModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({ allowNull: false })
  declare id: number;

  @Column({ allowNull: false })
  declare street: string;

  @Column({ allowNull: false })
  declare number: string;

  @Column({ allowNull: false })
  declare complement: string;

  @Column({ allowNull: false })
  declare city: string;

  @Column({ allowNull: false })
  declare state: string;

  @Column({ allowNull: false })
  declare zipCode: string;

  @HasMany(() => InvoiceModel)
  declare invoice: Awaited<InvoiceModel[]>;
}