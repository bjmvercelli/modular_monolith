import {
  StoreCatalogFacadeFindAllOutputDTO,
  StoreCatalogFacadeFindInputDTO,
  StoreCatalogFacadeFindOutputDTO,
} from "./store-catalog.facade.dto";

export interface StoreCatalogFacadeInterface {
  findAll(): Promise<StoreCatalogFacadeFindAllOutputDTO>;
  find(
    input: StoreCatalogFacadeFindInputDTO
  ): Promise<StoreCatalogFacadeFindOutputDTO>;
}
