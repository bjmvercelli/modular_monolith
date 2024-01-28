import { UseCaseInterface } from "../../@shared/usecase/use-case.interface";
import { AddProductDTOInput, AddProductDTOOutput } from "../usecase/add-product/add-product.dto";
import { CheckStockInputDTO, CheckStockOutputDTO } from "../usecase/check-stock/check-stock.dto";
import {
  AddProductFacadeInputDTO,
  CheckStockFacadeInputDTO,
  CheckStockFacadeOutputDTO,
} from "./product-adm.facade.dto";
import { ProductAdmFacadeInterface } from "./product-adm.facade.interface";

export class ProductAdmFacade implements ProductAdmFacadeInterface {
  constructor(
    private readonly addProductUseCase: UseCaseInterface,
    private readonly checkStockUseCase: UseCaseInterface
  ) {}

  async addProduct(input: AddProductFacadeInputDTO): Promise<void> {
    await this.addProductUseCase.execute(input);
  }

  async checkStock(
    input: CheckStockFacadeInputDTO
  ): Promise<CheckStockFacadeOutputDTO> {
    return await this.checkStockUseCase.execute(input);
  }
}
