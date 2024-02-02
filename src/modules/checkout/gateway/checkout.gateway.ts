import { Order } from "../domain/entity/order.entity";

export interface CheckoutGateway {
  addOrder(order: Order): Promise<void>;
  findOrder(id: string): Promise<Order>;
}