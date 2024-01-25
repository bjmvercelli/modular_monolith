import { UseCaseInterface } from "../../@shared/usecase/use-case.interface";
import { AddProductDTOInput, AddProductDTOOutput } from "../usecase/add-product/add-product.dto";
import {
  AddProductFacadeInputDTO,
  CheckStockFacadeInputDTO,
  CheckStockFacadeOutputDTO,
} from "./product-adm.facade.dto";
import { ProductAdmFacadeInterface } from "./product-adm.facade.interface";

export class ProductAdmFacade implements ProductAdmFacadeInterface {
  constructor(
    private readonly addProductUseCase: UseCaseInterface<AddProductDTOInput, AddProductDTOOutput>,
    private readonly checkStockUseCase: UseCaseInterface<any, any>
  ) {}

  addProduct(input: AddProductFacadeInputDTO): void {
    this.addProductUseCase.execute(input);
  }

  checkStock(
    input: CheckStockFacadeInputDTO
  ): Promise<CheckStockFacadeOutputDTO> {
    return this.checkStockUseCase.execute(input);
  }
}
