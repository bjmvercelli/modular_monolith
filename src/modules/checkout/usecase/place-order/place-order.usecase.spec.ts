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
          Promise.resolve({ productId, stock: productId === "1" ? 0 : 1 });
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
    beforeAll(() => {
      jest.useFakeTimers("modern");
      jest.setSystemTime(mockDate);
    });

    afterAll(() => {
      jest.useRealTimers();
    });

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
  });
});
