import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { UseCaseInterface } from "../../../@shared/usecase/use-case.interface";
import { ClientAdmFacadeInterface } from "../../../client-adm/facade/client-adm.facade.interface";
import { InvoiceFacadeInterface } from "../../../invoice/facade/invoice.facade.interface";
import { PaymentFacadeInterface } from "../../../payment/facade/payment.facade.interface";
import { ProductAdmFacadeInterface } from "../../../product-adm/facade/product-adm.facade.interface";
import { StoreCatalogFacadeInterface } from "../../../store-catalog/facade/store-catalog.facade.interface";
import { Client } from "../../domain/entity/client.entity";
import { Order } from "../../domain/entity/order.entity";
import { Product } from "../../domain/entity/product.entity";
import { CheckoutGateway } from "../../gateway/checkout.gateway";
import { PlaceOrderInputDTO, PlaceOrderOutputDTO } from "./place-order.dto";

export class PlaceOrderUseCase implements UseCaseInterface {
  constructor(
    private readonly _clientFacade: ClientAdmFacadeInterface,
    private readonly _productFacade: ProductAdmFacadeInterface,
    private readonly _catalogFacade: StoreCatalogFacadeInterface,
    private readonly checkoutRepository: CheckoutGateway,
    private readonly _invoiceFacade: InvoiceFacadeInterface,
    private readonly _paymentFacade: PaymentFacadeInterface
  ) {}

  async execute(input: PlaceOrderInputDTO): Promise<PlaceOrderOutputDTO> {
    // busca cliente
    const client = await this._clientFacade.find({ id: input.clientId });
    if (!client) {
      throw new Error("Client not found");
    }

    // busca produtos e verifica se estão disponíveis
    await this.validateProducts(input.products);

    // recuperar produtos
    const products = await Promise.all(
      input.products.map(async (product) => {
        return await this.getProduct(product.productId);
      })
    );

    // criar obj do client
    const clientObj = new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      address: client.address,
    });

    // criar obj da order
    const orderObj = new Order({
      client: clientObj,
      products,
    });

    // processar pagamento
    

    // criar invoice

    return {
      id: "id",
      invoiceId: "invoiceId",
      status: "status",
      total: 0,
      products: [],
    };
  }

  private async validateProducts(
    products: PlaceOrderInputDTO["products"]
  ): Promise<void> {
    if (!products.length) {
      throw new Error("No products selected");
    }

    for (const product of products) {
      const { stock } = await this._productFacade.checkStock({
        productId: product.productId,
      });
      if (stock <= 0) {
        throw new Error(`Product ${product.productId} is out of stock`);
      }
    }
  }

  private async getProduct(productId: string): Promise<Product> {
    const product = await this._catalogFacade.find({ id: productId });

    if (!product) {
      throw new Error("Product not found");
    }

    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    });
  }
}
