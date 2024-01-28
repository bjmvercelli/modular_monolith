export interface PaymentFacadeInputDTO {
  orderId: string;
  amount: number;
}

export interface PaymentFacadeOutputDTO {
  transactionId: string;
  status: string;
  orderId: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentFacadeInterface {
  processPayment(input: PaymentFacadeInputDTO): Promise<PaymentFacadeOutputDTO>;
}