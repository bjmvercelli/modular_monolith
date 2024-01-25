export interface AddProductDTOInput {
  id?: string,
  name: string,
  description: string,
  purchasePrice: number,
  stock: number,
}

export interface AddProductDTOOutput {
  id: string,
  name: string,
  description: string,
  price: number,
  quantity: number,
  createdAt: Date,
  updatedAt: Date,
}