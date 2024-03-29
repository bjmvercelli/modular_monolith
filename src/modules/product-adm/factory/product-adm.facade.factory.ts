import { ProductAdmFacade } from "../facade/product-adm.facade";
import { ProductRepository } from "../repository/product.repository";
import { AddProductUseCase } from "../usecase/add-product/add-product.usecase";
import { CheckStockUseCase } from "../usecase/check-stock/check-stock.usecase";

export class ProductFacadeFactory {
  static create(): ProductAdmFacade {
    const productRepository = new ProductRepository();
    const addProductUseCase = new AddProductUseCase(productRepository);
    const checkStockUseCase = new CheckStockUseCase(productRepository);

    return new ProductAdmFacade(
      addProductUseCase,
      checkStockUseCase
    );
  }
}
