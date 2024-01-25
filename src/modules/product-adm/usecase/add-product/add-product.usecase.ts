import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Product } from "../../domain/entity/product.entity";
import { ProductGateway } from "../../gateway/product.gateway";
import { AddProductDTOInput, AddProductDTOOutput } from "./add-product.dto";

export class AddProductUseCase {

  constructor(
    private readonly productRepository: ProductGateway,
  ){}

  async execute(input: AddProductDTOInput): Promise<AddProductDTOOutput> {
    const props = {
      id: new Id(input?.id),
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
    }

    const product = new Product(props);

    await this.productRepository.add(product);

    return {
      id: product.id.value,
      name: product.name,
      description: product.description,
      price: product.purchasePrice,
      quantity: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }
  }
}