export interface StoreCatalogFacadeFindInputDTO {
  id: string;
}

export interface StoreCatalogFacadeFindOutputDTO {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}

export interface StoreCatalogFacadeFindAllOutputDTO {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}