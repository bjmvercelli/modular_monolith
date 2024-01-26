import { UseCaseInterface } from "../../../@shared/usecase/use-case.interface";
import { ProductGateway } from "../../gateway/product.gateway";
import { FindAllProductsoOutputDTO } from "./find-all-products.dto";

export class FindAllProductsUseCase implements UseCaseInterface<undefined, FindAllProductsoOutputDTO> {
  constructor(private readonly productRepository: ProductGateway) {}

  async execute(): Promise<FindAllProductsoOutputDTO> {
    const products = await this.productRepository.findAll();

    return {
      products: products.map((product) => ({
        id: product.id.value,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      })),
    };
  }
}
