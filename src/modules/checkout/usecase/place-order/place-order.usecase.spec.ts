import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { Product } from "../../domain/entity/product.entity";
import { PlaceOrderUseCase } from "./place-order.usecase";

const mockDate = new Date(2024, 1, 1);

describe("Place order use case tests", () => {
  describe("Validate Products Method", () => {
    //@ts-expect-error - missing params
    const placeOrderUseCase = new PlaceOrderUseCase();

    // it("Should throw an error if product is invalid", async () => {
    //   const mockClientFacade = {
    //     find: jest.fn().mockResolvedValue({ id: "valid_id" }),
    //   };

    //   const mockValidateProducts = jest
    //     .spyOn(
    //       placeOrderUseCase,
    //       //@ts-expect-error - spy on private method
    //       "validateProducts"
    //     )
    //     //@ts-expect-error - not return never
    //     .mockRejectedValue(new Error("No products selected"));

    //   //@ts-expect-error - force set clientFacade
    //   placeOrderUseCase["_clientFacade"] = mockClientFacade;

    //   const input = { clientId: "valid_id", products: [] as any };
    //   await expect(placeOrderUseCase.execute(input)).rejects.toThrowError(
    //     "No products selected"
    //   );
    //   expect(mockValidateProducts).toHaveBeenCalledTimes(1);
    // });

    it("Should throw an error if no products are selected", async () => {
      const input = {
        products: [] as any[],
      };

      await expect(
        placeOrderUseCase["validateProducts"](input as any)
      ).rejects.toThrowError("No products selected");
    });

    it("Should throw an error if product is out of stock", async () => {
      const mockProductFacade = {
        checkStock: jest.fn(({ productId }: { productId: string }) => {
          return Promise.resolve({
            productId,
            stock: productId === "1" ? 0 : 1,
          });
        }),
      };

      //@ts-expect-error - force set productFacade
      placeOrderUseCase["_productFacade"] = mockProductFacade;

      let input = [{ productId: "1" }];
      await expect(
        placeOrderUseCase["validateProducts"](input)
      ).rejects.toThrowError("Product 1 is out of stock");

      input = [{ productId: "2" }];
      await expect(
        placeOrderUseCase["validateProducts"](input)
      ).resolves.not.toThrow();
      expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(2);
    });
  });

  describe("getProducts Method", () => {
    // beforeAll(() => {
    //   jest.useFakeTimers("modern");
    //   jest.setSystemTime(mockDate);
    // });

    // afterAll(() => {
    //   jest.useRealTimers();
    // });

    //@ts-expect-error - missing params
    const placeOrderUseCase = new PlaceOrderUseCase();

    it("Should throw an error when product not found", async () => {
      const mockCatalogFacade = {
        find: jest.fn().mockResolvedValue(null),
      };
      //@ts-expect-error - force set catalogFacade
      placeOrderUseCase["_catalogFacade"] = mockCatalogFacade;

      await expect(placeOrderUseCase["getProduct"]("0")).rejects.toThrowError(
        "Product not found"
      );
    });

    it("Should return a product", async () => {
      const mockCatalogFacade = {
        find: jest.fn().mockResolvedValue({
          id: "1",
          name: "Product 1",
          description: "Description 1",
          salesPrice: 100,
        }),
      };
      //@ts-expect-error - force set catalogFacade
      placeOrderUseCase["_catalogFacade"] = mockCatalogFacade;

      const product = await placeOrderUseCase["getProduct"]("1");
      expect(product.id.value).toEqual("1");
      expect(product.name).toEqual("Product 1");
      expect(product.description).toEqual("Description 1");
      expect(product.salesPrice).toEqual(100);
      expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1);
    });
  });

  describe("Execute", () => {
    it("Should throw an error if client does not exist", async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(null),
      };
      //@ts-expect-error - missing params
      const placeOrderUseCase = new PlaceOrderUseCase();
      //@ts-expect-error - force set clientFacade
      placeOrderUseCase["_clientFacade"] = mockClientFacade;

      const input = { clientId: "invalid_id", products: [] as any };
      await expect(placeOrderUseCase.execute(input)).rejects.toThrowError(
        "Client not found"
      );
    });

    describe("Place an order", () => {
      const clientProps = {
        id: "1",
        name: "Client 1",
        document: "123456789",
        email: "john@doe.com",
        street: "Street 1",
        number: "123",
        complement: "",
        city: "City 1",
        state: "State 1",
        zipCode: "123456",
      };

      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(clientProps),
        add: jest.fn(),
      };

      const mockPaymentFacade = {
        processPayment: jest.fn(),
      };

      const mockCheckoutRepository = {
        addOrder: jest.fn(),
        findOrder: jest.fn(),
      };

      const mockInvoiceFacade = {
        generateInvoice: jest.fn().mockResolvedValue({ id: "1i" }),
        findInvoice: jest.fn(),
      };

      const placeOrderUseCase = new PlaceOrderUseCase(
        mockClientFacade,
        null,
        null,
        mockCheckoutRepository,
        mockInvoiceFacade,
        mockPaymentFacade
      );

      const products = {
        "1": new Product({
          id: new Id("1"),
          name: "Product 1",
          description: "Description 1",
          salesPrice: 100,
        }),
        "2": new Product({
          id: new Id("2"),
          name: "Product 2",
          description: "Description 2",
          salesPrice: 200,
        }),
      };

      const mockValidateProducts = jest
        .spyOn(
          placeOrderUseCase,
          //@ts-expect-error - spy on private method
          "validateProducts"
        )
        //@ts-expect-error - not return never
        .mockResolvedValue(null);

      const mockGetProduct = jest
        .spyOn(
          placeOrderUseCase,
          //@ts-expect-error - spy on private method
          "getProduct"
        )
        //@ts-expect-error - not return never
        .mockImplementation((productId: keyof typeof products) => {
          return products[productId];
        });

      it("Should not be approved", async () => {
        mockPaymentFacade.processPayment =
          mockPaymentFacade.processPayment.mockReturnValue({
            transactionId: "1t",
            orderId: "1o",
            amount: 100,
            status: "error",
            updatedAt: new Date(),
            createdAt: new Date(),
          });

        const input = {
          clientId: "1c",
          products: [{ productId: "1" }, { productId: "2" }],
        };

        let output = await placeOrderUseCase.execute(input);

        expect(output.invoiceId).toEqual(null);
        expect(output.total).toEqual(300)
        expect(output.products).toEqual([
          { productId: "1" },
          { productId: "2" },
        ]);
        expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
        expect(mockClientFacade.find).toHaveBeenCalledWith({ id: "1c" });
        expect(mockValidateProducts).toHaveBeenCalledTimes(1);
        expect(mockValidateProducts).toHaveBeenCalledWith(input.products);
        expect(mockGetProduct).toHaveBeenCalledTimes(2);
        expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.processPayment).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.processPayment).toHaveBeenCalledWith({
          orderId: output.id,
          amount: output.total
        });
        expect(mockInvoiceFacade.generateInvoice).toHaveBeenCalledTimes(0);
      });

      it("Should be approved", async () => {
        mockPaymentFacade.processPayment =
          mockPaymentFacade.processPayment.mockReturnValue({
            transactionId: "1t",
            orderId: "1o",
            amount: 100,
            status: "approved",
            updatedAt: new Date(),
            createdAt: new Date(),
          });

        const input = {
          clientId: "1c",
          products: [{ productId: "1" }, { productId: "2" }],
        };

        let output = await placeOrderUseCase.execute(input);

        expect(output.invoiceId).toEqual("1i");
        expect(output.total).toEqual(300)
        expect(output.products).toEqual([
          { productId: "1" },
          { productId: "2" },
        ]);
        expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
        expect(mockClientFacade.find).toHaveBeenCalledWith({ id: "1c" });
        expect(mockValidateProducts).toHaveBeenCalledTimes(1);
        expect(mockValidateProducts).toHaveBeenCalledWith(input.products);
        expect(mockGetProduct).toHaveBeenCalledTimes(2);
        expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.processPayment).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.processPayment).toHaveBeenCalledWith({
          orderId: output.id,
          amount: output.total
        });
        expect(mockInvoiceFacade.generateInvoice).toHaveBeenCalledTimes(1);
        expect(mockInvoiceFacade.generateInvoice).toHaveBeenCalledWith({
          name: clientProps.name,
          document: clientProps.document,
          city: clientProps.city,
          state: clientProps.state,
          street: clientProps.street,
          number: clientProps.number,
          zipCode: clientProps.zipCode,
          complement: clientProps.complement,
          items: [
            {
              id: products["1"].id.value,
              name: products["1"].name,
              price: products["1"].salesPrice,
            },
            {
              id: products["2"].id.value,
              name: products["2"].name,
              price: products["2"].salesPrice,
            },
          ],
        });
      });
    });
  });
});
