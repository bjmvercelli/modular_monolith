import { AddProductFacadeInputDTO, CheckStockFacadeInputDTO, CheckStockFacadeOutputDTO } from "./product-adm.facade.dto";

export interface ProductAdmFacadeInterface {
  addProduct(input: AddProductFacadeInputDTO): Promise<void>;
  checkStock(input: CheckStockFacadeInputDTO): Promise<CheckStockFacadeOutputDTO>;
}