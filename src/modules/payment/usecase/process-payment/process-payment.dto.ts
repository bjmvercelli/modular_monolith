export interface ProcessPaymentInputDTO {
  orderId: string;
  amount: number;
}

export interface ProcessPaymentOutputDTO {
  transactionId: string;
  status: string;
  orderId: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}