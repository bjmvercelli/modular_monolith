import { UseCaseInterface } from "../../@shared/usecase/use-case.interface";
import { FindAllProductsUseCase } from "../usecase/find-all-products/find-all-products.usecase";
import {
  StoreCatalogFacadeFindAllOutputDTO,
  StoreCatalogFacadeFindInputDTO,
  StoreCatalogFacadeFindOutputDTO,
} from "./store-catalog.facade.dto";
import { StoreCatalogFacadeInterface } from "./store-catalog.facade.interface";

export class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  constructor(
    private readonly findAllProductsUseCase: UseCaseInterface<
      undefined,
      StoreCatalogFacadeFindAllOutputDTO
    >,
    private readonly findProductUseCase: UseCaseInterface<
      StoreCatalogFacadeFindInputDTO,
      StoreCatalogFacadeFindOutputDTO
    >
  ) {}
  async findAll(): Promise<StoreCatalogFacadeFindAllOutputDTO> {
    return await this.findAllProductsUseCase.execute();
  }
  async find(
    input: StoreCatalogFacadeFindInputDTO
  ): Promise<StoreCatalogFacadeFindOutputDTO> {
    return await this.findProductUseCase.execute(input);
  }
}
